import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MBody, MHeading02 } from "@components/Typography";
import Label from "@components/Label";
import { Tooltip } from "@components/Tooltip";
import { PiArrowRight } from "react-icons/pi";
import { MaxShape } from "@/app/components/MaxShape";

const ProfessionalProjectCard = ({ info, slug }) => {
    const meta = [info.projectRole, info.projectClient].filter(Boolean).join(" · ");

    return (
        <Link href={`/work/${slug}`} style={{ "--accent": info.accentColor }} className="group block">
            {/* Preview image */}
            <Tooltip
                as="div"
                content={
                    <>
                        <MaxShape width={16} height={16} borderWidth={2} borderColor={info.accentColor} speed={1.5} loop={false} invert />
                        <span className="font-semibold">{info.projectRole}</span>
                        {info.projectClient ? <span className="text-zinc-400">{info.projectClient}</span> : null}
                    </>
                }
            >
                <div className="relative aspect-16/10 w-full overflow-hidden rounded-lg bg-[#0c0c12]">
                    <Image
                        src={info.thumb}
                        alt={"Project image for portfolio item " + info.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 1024px"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                </div>
            </Tooltip>

            {/* Content */}
            <div className="mt-6 flex flex-col gap-3 md:mt-8">
                <Label>{meta}</Label>
                <MHeading02 className="text-white transition-colors group-hover:text-(--accent)">{info.title}</MHeading02>
                <MBody className="max-w-2xl text-zinc-400">{info.projectShortBrief}</MBody>
                <span className="mt-1 inline-flex items-center gap-1.5 text-base font-medium text-white">
                    View case study
                    <PiArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
            </div>
        </Link>
    );
};

export default ProfessionalProjectCard;
