"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface MaxShapeProps {
    /** Width of the shape. Numbers are treated as px. */
    width?: number | string;
    /** Height of the shape. Numbers are treated as px. */
    height?: number | string;
    /** Border thickness in px. */
    borderWidth?: number;
    /** Border color (any CSS color). */
    borderColor?: string;
    /** Duration of the circle → square morph, in seconds. */
    speed?: number;
    /** When true, loops back and forth (square → circle → square …). */
    loop?: boolean;
    /** When true, reverses the morph: starts as a square and animates to a circle. */
    invert?: boolean;
    className?: string;
}

const toCssSize = (value: number | string) => (typeof value === "number" ? `${value}px` : value);

/**
 * A border-only shape that morphs from a circle into a square. With `loop` it
 * yoyos between the two forever. Everything visual is driven by props; the morph
 * itself is a single GSAP tween on `borderRadius`, so it stays cheap and smooth.
 */
export default function MaxShape({ width = 64, height = 64, borderWidth = 2, borderColor = "#ffffff", speed = 1, loop = true, invert = false, className = "" }: MaxShapeProps) {
    const ref = useRef<HTMLDivElement>(null);

    // Default morphs circle → square; `invert` swaps the endpoints.
    const startRadius = invert ? "0%" : "50%";
    const endRadius = invert ? "50%" : "0%";

    useGSAP(
        () => {
            if (!ref.current) return;
            gsap.fromTo(
                ref.current,
                { borderRadius: startRadius },
                {
                    borderRadius: endRadius,
                    duration: speed,
                    ease: "power2.inOut",
                    repeat: loop ? -1 : 0,
                    yoyo: loop,
                }
            );
        },
        { scope: ref, dependencies: [speed, loop, invert] }
    );

    return (
        <div
            ref={ref}
            className={className}
            style={{
                width: toCssSize(width),
                height: toCssSize(height),
                borderWidth,
                borderStyle: "solid",
                borderColor,
                backgroundColor: "transparent",
                borderRadius: startRadius,
            }}
        />
    );
}
