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
                    opacity: 0,
                    y: distance,
                },
                {
                    opacity: 1,
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

    return (
        <Component ref={ref} className={className} id={id}>
            {children}
        </Component>
    );
}
