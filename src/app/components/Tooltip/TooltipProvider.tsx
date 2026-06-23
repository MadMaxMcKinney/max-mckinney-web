"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { TooltipContext } from "./TooltipContext";
import TooltipSurface from "./TooltipSurface";
import type { TooltipContent, TooltipController, TooltipEdges, TooltipPadding } from "./types";

// Tooltip trails the cursor by this offset so it never sits under the pointer.
const OFFSET_X = 16;
const OFFSET_Y = 18;
// Velocity → tilt: how hard horizontal speed leans the pill, and the cap.
const TILT_FACTOR = 0.6;
const TILT_MAX = 12;
// Rotation eases back to neutral this long after the cursor stops moving.
const SETTLE_MS = 90;
// Keep the pill at least this far from any viewport edge.
const EDGE_MARGIN = 8;

/**
 * Place the pill at the cursor offset, but flip it to the opposite side when it
 * would overflow the right/bottom edge. `offsetWidth/offsetHeight` are layout
 * sizes (transform-agnostic), so scale/tilt don't skew the measurement.
 */
function resolvePosition(el: HTMLElement, clientX: number, clientY: number) {
    const width = el.offsetWidth;
    const height = el.offsetHeight;

    let x = clientX + OFFSET_X;
    if (x + width > window.innerWidth - EDGE_MARGIN) {
        x = Math.max(EDGE_MARGIN, clientX - OFFSET_X - width);
    }

    let y = clientY + OFFSET_Y;
    if (y + height > window.innerHeight - EDGE_MARGIN) {
        y = Math.max(EDGE_MARGIN, clientY - OFFSET_Y - height);
    }

    return { x, y };
}

/**
 * Owns the one global tooltip element. Triggers call `show`/`hide` via context;
 * everything else (positioning, follow, tilt, enter/exit) happens here against a
 * single DOM node driven by GSAP. No React state updates on pointermove — only
 * `content` is state, and it changes at most once per hover — so following the
 * cursor never triggers a re-render.
 */
export default function TooltipProvider({ children }: { children: React.ReactNode }) {
    const surfaceRef = useRef<HTMLDivElement>(null);
    const [content, setContent] = useState<TooltipContent>(null);
    const [edges, setEdges] = useState<TooltipEdges | undefined>(undefined);
    const [padding, setPadding] = useState<TooltipPadding | undefined>(undefined);

    // GSAP handles, created once; calling these tweens toward a target smoothly.
    const xTo = useRef<gsap.QuickToFunc | null>(null);
    const yTo = useRef<gsap.QuickToFunc | null>(null);
    const rotTo = useRef<gsap.QuickToFunc | null>(null);
    const timelineRef = useRef<gsap.core.Timeline | null>(null);

    const visibleRef = useRef(false);
    const reducedRef = useRef(false);
    const lastClientXRef = useRef(0);
    const settleTimerRef = useRef<number | null>(null);

    // Initialise the surface + quickTo movers once on mount.
    useGSAP(
        () => {
            const el = surfaceRef.current;
            if (!el) return;
            gsap.set(el, { x: 0, y: 0, scale: 0.8, rotation: 0, autoAlpha: 0, transformOrigin: "left top" });
            xTo.current = gsap.quickTo(el, "x", { duration: 0.28, ease: "power3" });
            yTo.current = gsap.quickTo(el, "y", { duration: 0.28, ease: "power3" });
            rotTo.current = gsap.quickTo(el, "rotation", { duration: 0.4, ease: "power2" });
        },
        { scope: surfaceRef }
    );

    // Track the user's reduced-motion preference (and live changes to it).
    useEffect(() => {
        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        reducedRef.current = mq.matches;
        const onChange = () => {
            reducedRef.current = mq.matches;
        };
        mq.addEventListener("change", onChange);
        return () => mq.removeEventListener("change", onChange);
    }, []);

    const handlePointerMove = useCallback((event: PointerEvent) => {
        const el = surfaceRef.current;
        if (!el) return;

        const { x, y } = resolvePosition(el, event.clientX, event.clientY);

        if (reducedRef.current) {
            gsap.set(el, { x, y });
            return;
        }

        xTo.current?.(x);
        yTo.current?.(y);

        // Lean toward horizontal movement, then settle back upright when idle.
        const dx = event.clientX - lastClientXRef.current;
        lastClientXRef.current = event.clientX;
        rotTo.current?.(gsap.utils.clamp(-TILT_MAX, TILT_MAX, dx * TILT_FACTOR));

        if (settleTimerRef.current) window.clearTimeout(settleTimerRef.current);
        settleTimerRef.current = window.setTimeout(() => rotTo.current?.(0), SETTLE_MS);
    }, []);

    const show = useCallback(
        (next: TooltipContent, clientX: number, clientY: number, nextEdges?: TooltipEdges, nextPadding?: TooltipPadding) => {
            setContent(next);
            setEdges(nextEdges);
            setPadding(nextPadding);

            const el = surfaceRef.current;
            if (!el) return;

            lastClientXRef.current = clientX;

            // Already open (cursor moved between two adjacent triggers): keep
            // following and just swap content — no re-pop.
            if (visibleRef.current) return;

            visibleRef.current = true;
            window.addEventListener("pointermove", handlePointerMove);

            const reduced = reducedRef.current;
            timelineRef.current?.kill();
            const seed = resolvePosition(el, clientX, clientY);
            gsap.set(el, { x: seed.x, y: seed.y, rotation: 0 });
            timelineRef.current = gsap.timeline().fromTo(
                el,
                { scale: 0.8, autoAlpha: 0 },
                { scale: 1, autoAlpha: 1, duration: reduced ? 0.15 : 0.45, ease: "back.out(2)" }
            );
        },
        [handlePointerMove]
    );

    const hide = useCallback(() => {
        if (!visibleRef.current) return;
        visibleRef.current = false;

        window.removeEventListener("pointermove", handlePointerMove);
        if (settleTimerRef.current) window.clearTimeout(settleTimerRef.current);

        const el = surfaceRef.current;
        if (!el) return;

        const reduced = reducedRef.current;
        timelineRef.current?.kill();
        timelineRef.current = gsap.timeline({ onComplete: () => setContent(null) }).to(el, {
            scale: 0.7,
            rotation: reduced ? 0 : "+=10",
            y: "+=6",
            autoAlpha: 0,
            duration: reduced ? 0.12 : 0.3,
            ease: "back.in(1.6)",
        });
    }, [handlePointerMove]);

    // Safety net: drop the listener/timer if the provider ever unmounts mid-hover.
    useEffect(
        () => () => {
            window.removeEventListener("pointermove", handlePointerMove);
            if (settleTimerRef.current) window.clearTimeout(settleTimerRef.current);
        },
        [handlePointerMove]
    );

    // Client-side navigation unmounts the trigger without firing pointerleave,
    // so the tooltip would otherwise stay floating. Hide on route change.
    const pathname = usePathname();
    useEffect(() => {
        hide();
    }, [pathname, hide]);

    const controller = useMemo<TooltipController>(() => ({ show, hide }), [show, hide]);

    return (
        <TooltipContext.Provider value={controller}>
            {children}
            <TooltipSurface ref={surfaceRef} content={content} edges={edges} padding={padding} />
        </TooltipContext.Provider>
    );
}
