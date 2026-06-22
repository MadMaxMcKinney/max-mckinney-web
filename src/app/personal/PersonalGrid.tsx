"use client";

import { CSSProperties, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/app/components/Anim";
import Label from "@/app/components/Label";

export interface PersonalGridProject {
    slug: string;
    title: string;
    icon: string;
    media: string | null;
    poster: string | null;
    aspect: "16/9" | "9/16";
    accent: string;
    projectTypes: string[];
    href: string;
    // Collection grouping (currently unused — collections are flattened inline).
    isFolder?: boolean;
    childCount?: number;
}

const VIDEO_RE = /\.(mp4|webm|mov|m4v|ogg)$/i;

function aspectClass(a: "16/9" | "9/16") {
    return a === "9/16" ? "aspect-[9/16]" : "aspect-video";
}

/** Responsive column count for the masonry. */
function useColumnCount() {
    const [n, setN] = useState(3);
    useEffect(() => {
        const calc = () => setN(window.innerWidth >= 1024 ? 2 : window.innerWidth >= 640 ? 2 : 1);
        calc();
        window.addEventListener("resize", calc);
        return () => window.removeEventListener("resize", calc);
    }, []);
    return n;
}

function TileMedia({ project, className = "" }: { project: PersonalGridProject; className?: string }) {
    if (!project.media) {
        return (
            <div className="absolute inset-0 flex items-center justify-center" style={{ background: `radial-gradient(circle at 50% 35%, ${project.accent}33, #0c0c12 70%)` }}>
                <Image src={project.icon} alt="" aria-hidden width={120} height={120} className="h-20 w-20 rounded-3xl" />
            </div>
        );
    }
    if (VIDEO_RE.test(project.media)) {
        return (
            <video className={`absolute inset-0 h-full w-full object-cover ${className}`} autoPlay muted loop playsInline preload="metadata" poster={project.poster ?? undefined}>
                <source src={project.media} />
            </video>
        );
    }
    return <Image src={project.media} alt="" aria-hidden fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className={`object-cover ${className}`} />;
}

function Tile({ project }: { project: PersonalGridProject }) {
    const meta = project.isFolder ? `Collection · ${project.childCount} ${project.childCount === 1 ? "project" : "projects"}` : project.projectTypes.join(" · ");
    return (
        <Link href={project.href} style={{ "--accent": project.accent } as CSSProperties} className="group block">
            <div className={`relative overflow-hidden rounded-lg bg-[#0c0c12] ${aspectClass(project.aspect)}`}>
                <TileMedia project={project} className="transition-transform duration-700 ease-out group-hover:scale-[1.03]" />
                {project.isFolder && <span className="absolute left-3 top-3 rounded-full bg-black/60 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur">Collection</span>}
            </div>
            <h3 className="mt-3 font-serif text-base font-medium text-white transition-colors group-hover:text-[var(--accent)]">{project.title}</h3>
            <Label className="mt-1">{meta}</Label>
        </Link>
    );
}

export default function PersonalGrid({ projects, className = "" }: { projects: PersonalGridProject[]; className?: string }) {
    const n = useColumnCount();
    const columns: { project: PersonalGridProject; index: number }[][] = Array.from({ length: n }, () => []);
    projects.forEach((project, index) => columns[index % n].push({ project, index })); // round-robin → left→right, top→bottom

    return (
        <div className={`flex gap-5 sm:gap-6 ${className}`}>
            {columns.map((col, ci) => (
                <div key={ci} className="flex flex-1 flex-col gap-8">
                    {col.map(({ project, index }) => (
                        <FadeIn key={project.slug} dir="up" delay={0.6 + index * 0.06} duration={0.8} as="div">
                            <Tile project={project} />
                        </FadeIn>
                    ))}
                </div>
            ))}
        </div>
    );
}
