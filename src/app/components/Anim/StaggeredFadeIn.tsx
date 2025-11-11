"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface StaggeredFadeInProps {
    children: React.ReactNode;
    stagger?: number;
    delay?: number;
    duration?: number;
    distance?: number;
    className?: string;
    id?: string;
    as?: any;
}

export default function StaggeredFadeIn({ children, stagger = 0.2, delay = 0, duration = 1, distance = 20, className = "", id, as = "div" }: StaggeredFadeInProps) {
    const ref = useRef<any>(null);

    useGSAP(() => {
        if (ref.current) {
            const childElements = ref.current.children;

            gsap.fromTo(
                childElements,
                {
                    autoAlpha: 0,
                    y: distance,
                },
                {
                    autoAlpha: 1,
                    y: 0,
                    duration,
                    delay,
                    stagger,
                    ease: "power2.out",
                }
            );
        }
    }, [stagger, delay, duration, distance]);

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
