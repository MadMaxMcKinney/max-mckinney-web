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
                        <TextStagger as="h1" className="font-bold text-6xl text-white sm:text-7xl md:text-9xl" stagger={0.03} delay={0.5} duration={0.6} dir="up" distance={30}>
                            Designer.
                        </TextStagger>
                        <TextStagger as="h1" className="font-bold pt-4 text-6xl text-white sm:text-7xl md:text-9xl" stagger={0.03} delay={0.8} duration={0.6} dir="up" distance={30}>
                            Builder.
                        </TextStagger>
                        <TextStagger as="h1" className="font-bold text-6xl text-white sm:text-7xl md:text-9xl" stagger={0.03} delay={1.1} duration={0.6} dir="up" distance={30}>
                            Leader.
                        </TextStagger>
                    </div>
                </div>

                <FadeIn delay={1.5} duration={1.5} className="contained-content mt-12 sm:mt-16" id="BioDescription">
                    <div className="text-zinc-400">
                        <MBodyLead className="mb-6">
                            I'm <span className="text-white">Max McKinney</span>. A designer, engineer, and big 'ol nerd. I'm currently a <span className="italic font-medium">Designer at Figma</span>.
                            I love to tinker and build with all things web technology based, extend software, and build classic cars.
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
