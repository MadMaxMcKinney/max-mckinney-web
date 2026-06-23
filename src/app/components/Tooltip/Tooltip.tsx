"use client";

import React, { useCallback } from "react";
import { useTooltipController } from "./TooltipContext";
import type { TooltipContent, TooltipEdges } from "./types";

interface TooltipProps {
    /** What the floating tooltip shows — text, an icon, or both. */
    content: TooltipContent;
    children: React.ReactNode;
    /** Corner rounding (px number or CSS string). Lower for longer content. */
    edges?: TooltipEdges;
    /** Element to render as the hover target. Defaults to an inline span. */
    as?: React.ElementType;
    className?: string;
}

/**
 * Primary API. Wrap anything to give it a cursor-following tooltip:
 *
 *   <Tooltip content={<><Icon /> Built with GSAP</>}>
 *       <button>Hover me</button>
 *   </Tooltip>
 *
 * Uses `onPointerEnter`/`onPointerLeave` (which don't bubble from children), so
 * nested content won't spuriously re-trigger. Rendering our own wrapper element
 * sidesteps the ref/cloneElement fragility of injecting handlers into `children`.
 */
export default function Tooltip({ content, children, edges, as: Component = "span", className }: TooltipProps) {
    const { show, hide } = useTooltipController();

    const onPointerEnter = useCallback(
        (event: React.PointerEvent) => show(content, event.clientX, event.clientY, edges),
        [show, content, edges]
    );

    return (
        <Component className={className} onPointerEnter={onPointerEnter} onPointerLeave={hide}>
            {children}
        </Component>
    );
}
