"use client";

import { useLivePreview } from "@payloadcms/live-preview-react";
import type { PersonalProject } from "@payload-types";
import { MHeading01, MBodyXL } from "@/app/components/Typography";
import PersonalProjectLinkButton from "@components/Buttons/PersonalProjectLinkButton";
import PersonalProjectLinkSourceButton from "@components/Buttons/PersonalProjectLinkSourceButton";
import { FadeIn } from "@/app/components/Anim";
import Label from "@/app/components/Label";
import RichText from "@/app/components/RichText";

/**
 * Renders a personal project and, when shown inside the Payload admin Live
 * Preview iframe, updates in real time as the editor types — `useLivePreview`
 * merges the draft form state (and repopulates relationships via the REST API)
 * over `initialData` without waiting for a save or a route refresh. For normal
 * visitors no preview messages arrive, so it just renders `initialData`.
 */
export default function PersonalProjectView({ initialData, serverURL }: { initialData: PersonalProject; serverURL: string }) {
    const { data } = useLivePreview<PersonalProject>({ initialData, serverURL, depth: 2 });

    return (
        <div className="page-grid">
            <FadeIn dir="up" delay={0.1} duration={1} as="div" className="mt-32 sm:mt-56">
                <Label className="mb-3">{data.projectTypes.join(" · ")}</Label>
            </FadeIn>

            <FadeIn dir="up" delay={0.2} duration={1} as="div">
                <MHeading01 className="mb-6 text-white">{data.title}</MHeading01>
            </FadeIn>

            <FadeIn dir="up" delay={0.4} duration={1} as="div">
                <MBodyXL className="text-zinc-400 mb-8 max-w-3xl">{data.description}</MBodyXL>
            </FadeIn>

            <FadeIn dir="up" delay={0.6} duration={1} className="flex flex-wrap items-center gap-x-6 gap-y-3">
                {data.projectLink && <PersonalProjectLinkButton href={data.projectLink} accent={data.accent} />}
                {data.sourceLink && <PersonalProjectLinkSourceButton href={data.sourceLink} accent={data.accent} />}
            </FadeIn>

            <FadeIn dir="up" delay={1} duration={1.5} className="prose prose-lg prose-p:font-medium max-w-none text-zinc-300 mt-16 [&_img]:rounded-xs [&_p]:opacity-85">
                <RichText data={data.body} />
            </FadeIn>
        </div>
    );
}
