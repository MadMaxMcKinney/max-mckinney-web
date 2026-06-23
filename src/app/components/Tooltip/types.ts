import type { ReactNode } from "react";

/** Anything renderable can be a tooltip's content — an icon, text, or both. */
export type TooltipContent = ReactNode;

/**
 * Corner rounding for the tooltip. Numbers are px; strings pass straight to
 * `border-radius` (e.g. "0.75rem"). Lower values suit longer, multi-word
 * content where a full pill would look stretched. Omit for the default pill.
 */
export type TooltipEdges = number | string;

/**
 * The control surface shared via context. Triggers never touch the DOM or
 * animation directly; they just push content and a starting position, or ask
 * the system to hide. A single global tooltip element does the rest.
 */
export interface TooltipController {
    /** Show (or swap to) `content`, seeding the tooltip at viewport coords. */
    show: (content: TooltipContent, clientX: number, clientY: number, edges?: TooltipEdges) => void;
    /** Playfully hide the active tooltip. */
    hide: () => void;
}
