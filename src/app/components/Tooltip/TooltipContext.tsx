"use client";

import { createContext, useContext } from "react";
import type { TooltipController } from "./types";

/**
 * Null until a TooltipProvider is mounted above in the tree. Consumers go
 * through `useTooltipController`, which fails loudly if the provider is missing.
 */
export const TooltipContext = createContext<TooltipController | null>(null);

export function useTooltipController(): TooltipController {
    const controller = useContext(TooltipContext);
    if (!controller) {
        throw new Error("Tooltip components must be rendered inside a <TooltipProvider>.");
    }
    return controller;
}
