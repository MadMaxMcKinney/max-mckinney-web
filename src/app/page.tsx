import { MHeadingHero, MBodyLead } from "@/app/components/Typography";
import ProfessionalProjectCard from "@components/Cards/ProfessionalProjectCard";
import { ShapeLogo, StaggeredFadeIn, FadeIn } from "@/app/components/Anim";
import { getAllWorkProjects } from "@/app/fetchers";

export default async function Home() {
    const workProjects = await getAllWorkProjects();

    return (
        <>
            <div className="px-6">
                <div className="flex items-end relative pt-32 pb-8 md:pt-52 md:pb-16" id="Header">
                    <div className="contained-content z-10 flex flex-col gap-3 items-start">
                        <div className="mb-2 animate-shapes-in">
                            <ShapeLogo />
                        </div>
                        <StaggeredFadeIn stagger={0.3} delay={0.5}>
                            <MHeadingHero>Designer.</MHeadingHero>
                            <MHeadingHero>Leader.</MHeadingHero>
                            <MHeadingHero>Nerd.</MHeadingHero>
                        </StaggeredFadeIn>
                    </div>
                </div>

                <FadeIn delay={1} duration={1.5} className="contained-content mt-16 sm:mt-24" id="BioDescription">
                    <div className="text-zinc-400">
                        <MBodyLead className="mb-6">
                            I'm <span className="text-transparent bg-gradient-to-r from-orange-500 via-purple-500  to-red-500 bg-clip-text bg-[length:300%] animate-flow-background">Max McKinney</span>
                            . I'm currently a Designer at Figma. I love to tinker and build with all things web technology based, extend software, and build classic cars.
                        </MBodyLead>

                        <MBodyLead className="mb-6">
                            I specialize in product design architecture and thrive in undefined problem spaces. My personal background is in user experience, product development, design systems, and
                            design leadership.
                        </MBodyLead>
                    </div>
                </FadeIn>

                {/* Project Card Grid */}
                <FadeIn delay={1.5} duration={1.5} id="ProjectGrid" className="mt-24 grid grid-cols-1 gap-16 sm:mt-30 lg:gap-32">
                    {workProjects && workProjects.map((project) => <ProfessionalProjectCard info={project.frontmatter} slug={project.slug} key={project.frontmatter.title}></ProfessionalProjectCard>)}
                </FadeIn>
            </div>
        </>
    );
}
