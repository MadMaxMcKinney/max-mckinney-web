import { MBodyLead } from "@/app/components/Typography";
import ProfessionalProjectCard from "@components/Cards/ProfessionalProjectCard";
import { ShapeLogo, TextStagger, FadeIn } from "@/app/components/Anim";
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
                        <TextStagger
                            as="h1"
                            className="font-bold text-6xl text-white sm:text-7xl md:text-8xl"
                            stagger={0.03}
                            delay={0.5}
                            duration={0.6}
                            dir="up"
                            distance={30}
                        >
                            Designer.
                        </TextStagger>
                        <TextStagger
                            as="h1"
                            className="font-bold text-6xl text-white sm:text-7xl md:text-8xl"
                            stagger={0.03}
                            delay={0.8}
                            duration={0.6}
                            dir="up"
                            distance={30}
                        >
                            Leader.
                        </TextStagger>
                        <TextStagger
                            as="h1"
                            className="font-bold text-6xl text-white sm:text-7xl md:text-8xl"
                            stagger={0.03}
                            delay={1.1}
                            duration={0.6}
                            dir="up"
                            distance={30}
                        >
                            Nerd.
                        </TextStagger>
                    </div>
                </div>

                <FadeIn delay={1.5} duration={1.5} className="contained-content mt-16 sm:mt-24" id="BioDescription">
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
                <FadeIn delay={2} duration={1.5} id="ProjectGrid" className="mt-24 grid grid-cols-1 gap-16 sm:mt-30 lg:gap-32">
                    {workProjects && workProjects.map((project) => <ProfessionalProjectCard info={project.frontmatter} slug={project.slug} key={project.frontmatter.title}></ProfessionalProjectCard>)}
                </FadeIn>
            </div>
        </>
    );
}
