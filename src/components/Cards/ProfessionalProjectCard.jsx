import React from "react";
import Image from "next/image";
import Pill from "@components/Pill";
import ReadMoreButton from "@components/Buttons/ReadMoreButton";
import { MBody, MHeading02 } from "@components/Typography";

const ProfessionalProjectCard = async ({ info, slug }) => {
    return (
        <div>
            {/* Preview Image */}
            <div className="rounded-lg relative max-w-7xl h-96 border border-white/20 overflow-hidden mx-auto md:h-[650px]">
                <Image className="object-cover h-full" src={info.thumb} alt={"Project image for portfolio item " + info.title} fill />
            </div>

            {/* Card Content */}
            <div className="contained-content mt-6 md:mt-12 flex flex-col gap-6 items-start">
                {/* Pills */}
                <div className="inline-grid grid-flow-col gap-3">
                    <Pill type="primary" text={info.projectRole} />
                </div>

                {/* Words */}
                <div className="flex flex-col gap-4">
                    <MHeading02>{info.title}</MHeading02>
                    <MBody className="text-zinc-400 flex-1">{info.projectShortBrief}</MBody>
                </div>

                <div id="ProjectActions">
                    <ReadMoreButton accent={info.accentColor} href={`/work/${slug}`}>
                        View case study
                    </ReadMoreButton>
                </div>
            </div>
        </div>
    );
};

export default ProfessionalProjectCard;
