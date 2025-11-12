"use client";

import { MHeading06 } from "@/app/components/Typography";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { useRef } from "react";
import { PiArrowLeft } from "react-icons/pi";

interface BreadcrumbReturnProps {
    href: string;
    location: string;
}

export default function BreadcrumbReturn({ href, location }: BreadcrumbReturnProps) {
    const arrowRef = useRef<HTMLSpanElement>(null);
    const containerRef = useRef<HTMLAnchorElement>(null);
    const { contextSafe } = useGSAP({ scope: containerRef });

    const enterAnimation = contextSafe(() => {
        if (arrowRef.current) {
            gsap.to(arrowRef.current, {
                x: 5,
                duration: 0.3,
                ease: "power2.out",
            });
        }
    });

    const exitAnimation = contextSafe(() => {
        if (arrowRef.current) {
            gsap.to(arrowRef.current, {
                x: 0,
                duration: 0.2,
                ease: "power2.out",
            });
        }
    });

    return (
        <Link href={href} className="mb-6" ref={containerRef} onMouseEnter={() => enterAnimation()} onMouseLeave={() => exitAnimation()}>
            <MHeading06 className={`flex items-center gap-1 text-sm font-medium leading-none text-zinc-400 transition-all hover:opacity-70`}>
                <span ref={arrowRef}>
                    <PiArrowLeft className="w-4 h-4 mr-1"></PiArrowLeft>
                </span>
                {location}
            </MHeading06>
        </Link>
    );
}
