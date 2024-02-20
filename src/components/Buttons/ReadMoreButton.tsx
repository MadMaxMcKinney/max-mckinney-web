import React from "react";
import { MHeading05 } from "@components/Typography";
import { PiArrowRight } from "react-icons/pi";
import Link from "next/link";

interface ReadMoreButtonProps {
    href: string;
    accent: string;
    children: React.ReactNode;
}

const ReadMoreButton = (props: ReadMoreButtonProps) => {
    return (
        <Link
            href={props.href}
            style={{ "--accentColor": props.accent } as React.CSSProperties}
            className={`flex w-fit gap-2 group bg-[#0C0C12] items-center justify-center rounded-md px-4 py-2 border border-solid border-white/20 transition transform shadow-red-500/10 shadow-xl hover:bg-[var(--accentColor)] hover:border-white active:scale-95`}
        >
            <MHeading05>{props.children}</MHeading05>
            <PiArrowRight className="w-4 h-4 group-hover:animate-pulse-right"></PiArrowRight>
        </Link>
    );
};

export default ReadMoreButton;
