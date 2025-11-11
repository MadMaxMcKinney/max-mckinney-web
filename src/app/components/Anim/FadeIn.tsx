"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface FadeInProps {
    children: React.ReactNode;
    delay?: number;
    duration?: number;
    className?: string;
    id?: string;
    as?: any;
}

export default function FadeIn({ children, delay = 0, duration = 1, className = "", id, as = "div" }: FadeInProps) {
    const ref = useRef<any>(null);

    useGSAP(() => {
        if (ref.current) {
            gsap.fromTo(
                ref.current,
                {
                    autoAlpha: 0,
                },
                {
                    autoAlpha: 1,
                    duration,
                    delay,
                    ease: "power2.out",
                }
            );
        }
    }, [delay, duration]);

    const Component = as;

    return (
        <Component ref={ref} className={className} id={id} style={{ visibility: "hidden" }}>
            {children}
        </Component>
    );
}
