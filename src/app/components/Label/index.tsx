import React from "react";

interface LabelProps {
    children: React.ReactNode;
    className?: string;
    as?: React.ElementType;
}

/**
 * Small uppercase, letter-spaced label used for eyebrows and metadata
 * across the personal and work pages. Keeps that styling centralized.
 */
export default function Label({ children, className = "", as: Component = "p" }: LabelProps) {
    return <Component className={`text-xs uppercase tracking-wider text-zinc-500 ${className}`}>{children}</Component>;
}
