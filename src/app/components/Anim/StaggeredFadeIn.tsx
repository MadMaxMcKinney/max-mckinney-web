"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

type Direction = "up" | "down" | "left" | "right" | "none";

interface StaggeredFadeInProps {
    children: React.ReactNode;
    stagger?: number;
    delay?: number;
    duration?: number;
    distance?: number;
    dir?: Direction;
    className?: string;
    id?: string;
    as?: any;
}

export default function StaggeredFadeIn({
    children,
    stagger = 0.2,
    delay = 0,
    duration = 1,
    distance = 20,
    dir = "up",
    className = "",
    id,
    as = "div"
}: StaggeredFadeInProps) {
    const ref = useRef<any>(null);

    useGSAP(() => {
        if (ref.current) {
            const childElements = ref.current.children;

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
                    // No movement, just fade
                    break;
            }

            gsap.fromTo(childElements, fromVars, toVars);
        }
    }, [stagger, delay, duration, distance, dir]);

    const Component = as;

    // Clone children with visibility hidden to prevent FOUC
    const hiddenChildren = React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, {
                style: { ...((child.props as any).style || {}), visibility: "hidden" },
            } as any);
        }
        return child;
    });

    return (
        <Component ref={ref} className={className} id={id}>
            {hiddenChildren}
        </Component>
    );
}
