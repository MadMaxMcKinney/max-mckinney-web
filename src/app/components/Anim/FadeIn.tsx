"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

type Direction = "up" | "down" | "left" | "right" | "none";

interface FadeInProps {
    children: React.ReactNode;
    delay?: number;
    duration?: number;
    distance?: number;
    dir?: Direction;
    className?: string;
    id?: string;
    as?: any;
}

export default function FadeIn({
    children,
    delay = 0,
    duration = 1,
    distance = 20,
    dir = "none",
    className = "",
    id,
    as = "div"
}: FadeInProps) {
    const ref = useRef<any>(null);

    useGSAP(() => {
        if (ref.current) {
            const fromVars: gsap.TweenVars = {
                autoAlpha: 0,
            };

            const toVars: gsap.TweenVars = {
                autoAlpha: 1,
                duration,
                delay,
                ease: "power2.out",
            };

            // Add directional movement based on dir prop
            switch (dir) {
                case "up":
                    fromVars.y = distance;
                    toVars.y = 0;
                    break;
                case "down":
                    fromVars.y = -distance;
                    toVars.y = 0;
                    break;
                case "left":
                    fromVars.x = distance;
                    toVars.x = 0;
                    break;
                case "right":
                    fromVars.x = -distance;
                    toVars.x = 0;
                    break;
                case "none":
                default:
                    // No movement, just fade
                    break;
            }

            gsap.fromTo(ref.current, fromVars, toVars);
        }
    }, [delay, duration, distance, dir]);

    const Component = as;

    return (
        <Component ref={ref} className={className} id={id} style={{ visibility: "hidden" }}>
            {children}
        </Component>
    );
}
