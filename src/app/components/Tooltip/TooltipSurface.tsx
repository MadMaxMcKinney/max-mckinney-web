"use client";

import { forwardRef } from "react";
import type { TooltipContent, TooltipEdges, TooltipLength, TooltipPadding } from "./types";

interface TooltipSurfaceProps {
    content: TooltipContent;
    edges?: TooltipEdges;
    padding?: TooltipPadding;
}

// A very large radius reads as a pill — the default look.
const PILL_RADIUS = "9999px";
// Defaults matching the original px-3.5 / py-2.
const DEFAULT_PADDING_X = "0.875rem";
const DEFAULT_PADDING_Y = "0.5rem";

const toLength = (value: TooltipLength | undefined) => (value === undefined ? undefined : typeof value === "number" ? `${value}px` : value);

const toRadius = (edges: TooltipEdges | undefined) => (edges === undefined ? PILL_RADIUS : typeof edges === "number" ? `${edges}px` : edges);

function resolvePadding(padding: TooltipPadding | undefined) {
    if (padding === undefined) {
        return { paddingTop: DEFAULT_PADDING_Y, paddingRight: DEFAULT_PADDING_X, paddingBottom: DEFAULT_PADDING_Y, paddingLeft: DEFAULT_PADDING_X };
    }
    if (typeof padding === "number" || typeof padding === "string") {
        const all = toLength(padding);
        return { paddingTop: all, paddingRight: all, paddingBottom: all, paddingLeft: all };
    }
    const x = toLength(padding.x);
    const y = toLength(padding.y);
    return {
        paddingTop: toLength(padding.top) ?? y ?? DEFAULT_PADDING_Y,
        paddingRight: toLength(padding.right) ?? x ?? DEFAULT_PADDING_X,
        paddingBottom: toLength(padding.bottom) ?? y ?? DEFAULT_PADDING_Y,
        paddingLeft: toLength(padding.left) ?? x ?? DEFAULT_PADDING_X,
    };
}

/**
 * The single floating element that every trigger shares. It renders nothing
 * interactive (`pointer-events-none`) and is positioned/animated entirely by
 * the provider via GSAP transforms, so this component stays purely visual.
 *
 * `top/left: 0` + transform-driven movement keeps the origin predictable for
 * the follow + tilt animation. Starts hidden (autoAlpha 0 set by GSAP) to avoid
 * a flash on mount.
 */
const TooltipSurface = forwardRef<HTMLDivElement, TooltipSurfaceProps>(function TooltipSurface({ content, edges, padding }, ref) {
    return (
        <div
            ref={ref}
            role="tooltip"
            aria-hidden="true"
            className="pointer-events-none fixed left-0 top-0 z-[9999] flex max-w-xs items-center gap-2 border border-white/10 bg-[#0c0c12]/95 text-sm font-medium text-zinc-100 shadow-xl shadow-black/40 backdrop-blur-sm"
            style={{ borderRadius: toRadius(edges), ...resolvePadding(padding), willChange: "transform", visibility: "hidden", opacity: 0 }}
        >
            {content}
        </div>
    );
});

export default TooltipSurface;
