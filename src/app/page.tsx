import { MBodyLead } from "@/app/components/Typography";
import ProfessionalProjectCard from "@components/Cards/ProfessionalProjectCard";
import { ShapeLogo, TextStagger, FadeIn } from "@/app/components/Anim";
import { getAllWorkProjects } from "@/app/fetchers";
import { Tooltip } from "@/app/components/Tooltip";
import Image from "next/image";

export default async function Home() {
    const workProjects = await getAllWorkProjects();
    const leftColumn = workProjects.filter((_, i) => i % 2 === 0);
    const rightColumn = workProjects.filter((_, i) => i % 2 === 1);

    function careerHighlightTooltip() {
        return (
            <div className="flex flex-col pb-1 gap-2 text-sm text-center text-zinc-400">
                <Image src="/work/figma-1.jpg" alt="Max McKinney speaking at Config 2025" width={400} height={300} className="rounded-md border border-white/5" />
                <p>Speaking at Figma's Config 2025.</p>
            </div>
        );
    }

    return (
        <>
            <div className="px-6">
                <div className="flex items-end relative pt-32 pb-8 md:pt-36 md:pb-16" id="Header">
                    <div className="contained-content z-10 flex flex-col gap-3 items-start">
                        <div className="mb-2 animate-shapes-in">
                            <Tooltip edges={8} content={<>Well, aren't you curious? My work has always spanned disciplines, these shapes abstractly represent that.</>}>
                                <ShapeLogo />
                            </Tooltip>
                        </div>
                        <TextStagger as="h1" className="font-medium text-6xl text-white sm:text-7xl md:text-9xl" stagger={0.03} delay={0.5} duration={0.6} dir="up" distance={30}>
                            designer.
                        </TextStagger>
                        <TextStagger as="h1" className="font-medium pt-4 text-6xl text-white sm:text-7xl md:text-9xl" stagger={0.03} delay={0.8} duration={0.6} dir="up" distance={30}>
                            builder.
                        </TextStagger>
                        <TextStagger as="h1" className="font-medium text-6xl text-white sm:text-7xl md:text-9xl" stagger={0.03} delay={1.1} duration={0.6} dir="up" distance={30}>
                            leader.
                        </TextStagger>
                    </div>
                </div>

                <FadeIn delay={1.5} duration={1.5} className="contained-content mt-12" id="BioDescription">
                    <div className="text-zinc-400">
                        <MBodyLead className="mb-6">
                            I'm <span className="text-white">Max McKinney</span>. A designer, engineer, and big 'ol nerd. I love to tinker and build with all things web technology based, extend
                            software, and build classic cars. I'm currently a{" "}
                            <Tooltip padding={4} edges={8} content={careerHighlightTooltip()} className="text-white underline decoration-dotted font-medium">
                                principal designer at Figma
                            </Tooltip>
                            .
                        </MBodyLead>

                        <MBodyLead className="mb-6">
                            I specialize in product design architecture and thrive in undefined problem spaces. My personal background is in user experience, product development, design systems, and
                            design leadership.
                        </MBodyLead>
                    </div>
                </FadeIn>

                {/* Project Card Grid — two staggered columns */}
                <FadeIn delay={2} duration={1.5} id="ProjectGrid" className="mx-auto mt-24 grid max-w-(--content-max-width) grid-cols-1 gap-x-12 sm:mt-32 md:grid-cols-2">
                    <div className="flex flex-col gap-20 lg:gap-28">
                        {leftColumn.map((project) => (
                            <ProfessionalProjectCard info={project.frontmatter} slug={project.slug} key={project.frontmatter.title}></ProfessionalProjectCard>
                        ))}
                    </div>
                    <div className="flex flex-col gap-20 md:mt-24 lg:mt-32 lg:gap-28">
                        {rightColumn.map((project) => (
                            <ProfessionalProjectCard info={project.frontmatter} slug={project.slug} key={project.frontmatter.title}></ProfessionalProjectCard>
                        ))}
                    </div>
                </FadeIn>
            </div>
        </>
    );
}
