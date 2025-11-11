"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SplitText from "gsap/dist/SplitText";

type Direction = "up" | "down" | "left" | "right" | "none";

interface TextStaggerProps {
    children: string;
    stagger?: number;
    delay?: number;
    duration?: number;
    distance?: number;
    dir?: Direction;
    className?: string;
    id?: string;
    as?: any;
}

export default function TextStagger({ children, stagger = 0.03, delay = 0, duration = 0.6, distance = 20, dir = "up", className = "", id, as = "div" }: TextStaggerProps) {
    const ref = useRef<any>(null);

    useGSAP(() => {
        if (ref.current) {
            // Use SplitText to split by characters
            const split = new SplitText(ref.current, {
                type: "chars",
                charsClass: "char",
            });

            const fromVars: gsap.TweenVars = {
                autoAlpha: 0,
            };

            const toVars: gsap.TweenVars = {
                autoAlpha: 1,
                duration,
                delay,
                stagger,
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
                    break;
            }

            gsap.fromTo(split.chars, fromVars, toVars);
            console.log(ref);
            gsap.to(ref, { autoAlpha: 1, duration: 1 });

            // Cleanup function to revert the split when component unmounts
            return () => {
                split.revert();
            };
        }
    }, [stagger, delay, duration, distance, dir, children]);

    const Component = as;

    return (
        <Component ref={ref} className={className} id={id} style={{ visibility: "hidden" }}>
            {children}
        </Component>
    );
}
