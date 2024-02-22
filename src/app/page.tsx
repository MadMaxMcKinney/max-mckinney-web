import { MHeadingHero, MBodyLead } from "@/components/Typography";
import ProfessionalProjectCard from "@/components/Cards/ProfessionalProjectCard";
import ShapeLogo from "@/components/Anim/ShapeLogo";
import { getAllWorkProjects } from "@/fetchers";

export default async function Home() {
    //const workProjects = await getAllWorkProjects();

    return (
        <>
            <div className="px-6">
                <div className="flex items-end relative pt-32 pb-8 md:pt-52 md:pb-16" id="Header">
                    <div className="contained-content z-10 flex flex-col gap-3 items-start">
                        <div className="mb-2 animate-shapes-in">
                            <ShapeLogo />
                        </div>
                        <MHeadingHero className="animate-fade-in">Designer.</MHeadingHero>
                        <MHeadingHero className="animate-fade-in-slow">Leader.</MHeadingHero>
                        <MHeadingHero className="animate-fade-in-very-slow">Nerd.</MHeadingHero>
                    </div>
                </div>

                <div className="contained-content mt-16 animate-fade-in-slow sm:mt-24" id="BioDescription">
                    <div className="text-zinc-400">
                        <MBodyLead className="mb-6">
                            I’m <span className="text-transparent bg-gradient-to-r from-orange-500 via-purple-500  to-red-500 bg-clip-text bg-[length:300%] animate-flow-background">Max McKinney</span>
                            . I’m currently a Designer at Figma. I love to tinker and build with all things web technology based, extend software, and build classic cars.
                        </MBodyLead>

                        <MBodyLead className="mb-6">
                            I specialize in product design architecture and thrive in undefined problem spaces. My personal background is in user experience, product development, design systems, and
                            design leadership.
                        </MBodyLead>
                    </div>
                </div>

                {/* Project Card Grid */}
                <div id="ProjectGrid" className="animate-fade-in-slow mt-24 grid grid-cols-1 gap-16 sm:mt-30 lg:gap-32">
                    {/* {workProjects && workProjects.map((project) => <ProfessionalProjectCard data={project} key={project.frontmatter.title}></ProfessionalProjectCard>)} */}
                </div>
            </div>
        </>
    );
}
