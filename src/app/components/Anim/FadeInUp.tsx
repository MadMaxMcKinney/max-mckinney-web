"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface FadeInUpProps {
    children: React.ReactNode;
    delay?: number;
    duration?: number;
    distance?: number;
    className?: string;
    id?: string;
    as?: any;
}

export default function FadeInUp({ children, delay = 0, duration = 1, distance = 20, className = "", id, as = "div" }: FadeInUpProps) {
    const ref = useRef<any>(null);

    useGSAP(() => {
        if (ref.current) {
            gsap.fromTo(
                ref.current,
                {
                    opacity: 0,
                    y: distance,
                },
                {
                    opacity: 1,
                    y: 0,
                    duration,
                    delay,
                    ease: "power2.out",
                }
            );
        }
    }, [delay, duration, distance]);

    const Component = as;

    return (
        <Component ref={ref} className={className} id={id}>
            {children}
        </Component>
    );
}
