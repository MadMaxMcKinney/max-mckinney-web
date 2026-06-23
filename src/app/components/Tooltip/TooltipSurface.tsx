"use client";

import { forwardRef } from "react";
import type { TooltipContent } from "./types";

interface TooltipSurfaceProps {
    content: TooltipContent;
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
const TooltipSurface = forwardRef<HTMLDivElement, TooltipSurfaceProps>(function TooltipSurface({ content }, ref) {
    return (
        <div
            ref={ref}
            role="tooltip"
            aria-hidden="true"
            className="pointer-events-none fixed left-0 top-0 z-[9999] flex max-w-xs items-center gap-2 rounded-full border border-white/10 bg-[#0c0c12]/95 px-3.5 py-2 text-sm font-medium text-zinc-100 shadow-xl shadow-black/40 backdrop-blur-sm"
            style={{ willChange: "transform", visibility: "hidden", opacity: 0 }}
        >
            {content}
        </div>
    );
});

export default TooltipSurface;
