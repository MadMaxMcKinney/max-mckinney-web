import React from "react";
import { SocialButton } from "../Buttons/SocialButton";
import { FadeIn } from "@/app/components/Anim";

const Footer = () => {
    return (
        <footer className="px-6 py-6 mt-20 border-t border-white/10 sm:mb-10 sm:mt-40 md:mt-40">
            <FadeIn delay={0.3} duration={1.5} className="flex flex-col justify-between mx-auto w-full sm:flex-row max-w-(--content-max-width)">
                {/* Social */}
                <FadeIn delay={0.6} duration={1} className="grid grid-flow-col gap-6 items-center list-none mb-8 sm:mb-0 sm:justify-start">
                    <SocialButton href="https://github.com/MadMaxMcKinney" target="_blank" rel="noopener noreferrer">
                        github
                    </SocialButton>
                    <SocialButton href="https://www.linkedin.com/in/mckinneymax" target="_blank" rel="noopener noreferrer">
                        linkedin
                    </SocialButton>
                    <SocialButton href="https://photos.maxmckinney.com/" target="_blank" rel="noopener noreferrer">
                        photos
                    </SocialButton>
                    <SocialButton href="http://youtube.com/maxmckinney" target="_blank" rel="noopener noreferrer">
                        youtube
                    </SocialButton>
                </FadeIn>

                {/* Email */}
                <a className="text-xl text-center font-bold md:text-left transition-all filter hover:opacity-70" href="mailto:hello@maxmckinney.com">
                    hello@maxmckinney.com
                </a>
            </FadeIn>
        </footer>
    );
};

export default Footer;
