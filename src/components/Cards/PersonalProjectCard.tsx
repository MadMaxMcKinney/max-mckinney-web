import React, { CSSProperties } from "react";
import Link from "next/link";

interface PersonalProjectCardProps {
    accent: string;
    href: string;
    isFolder?: boolean;
    children: React.ReactNode;
}

export default function PersonalProjectCard(props: PersonalProjectCardProps) {
    const cardStyles = "";

    return (
        <div className="relative group">
            <Link
                style={{ "--accent": props.accent } as CSSProperties}
                className={`flex flex-col gap-6 p-6 relative rounded-3xl border border-white/15 bg-[#0c0c12] overflow-clip z-10 transition-all md:p-8 after:absolute after:inset-0 after:bg-[var(--accent)] after:opacity-0 after:transition-all hover:border-[var(--accent)] hover:after:opacity-15 active:scale-[0.97] active:border-[var(--accent)] focus-visible:border-[var(--accent)] focus-visible:outline-none ${
                    props.isFolder ? "bg-opacity-50 backdrop-blur-xl" : ""
                }`}
                href={props.href}
            >
                {props.children}
            </Link>
            {/** If this is a folder version of the card render the folder stacks below the card */}
            {props.isFolder && <FolderBackdropCard index={1}>{props.children}</FolderBackdropCard>}
            {props.isFolder && <FolderBackdropCard index={2}>{props.children}</FolderBackdropCard>}
        </div>
    );
}

function FolderBackdropCard(props: { children: React.ReactNode; index: number }) {
    const cardStyles: any = {
        1: "-z-10 scale-95 -translate-y-6 group-hover:-translate-y-8 delay-75",
        2: "-z-20 scale-90 -translate-y-12 group-hover:-translate-y-14 delay-100",
    };
    return <span className={`absolute inset-0 flex flex-col gap-6 p-6 rounded-3xl border border-white/15 bg-[#0c0c12] overflow-clip transition-all ${cardStyles[props.index]}`}>{props.children}</span>;
}
