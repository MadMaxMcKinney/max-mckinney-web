import React from "react";
import { SocialButton } from "../Buttons/SocialButton";
import { PiGithubLogo, PiYoutubeLogo, PiLinkedinLogo, PiAperture } from "react-icons/pi";

const Footer = () => {
    return (
        <div className="flex flex-col justify-between mt-20 mb-16 px-6 animate-fade-in-slow mx-auto w-full sm:mb-10 sm:mt-40 sm:flex-row md:mt-32 xl:max-w-7xl">
            {/* Social */}
            <div className="grid grid-flow-col gap-6 items-center list-none mb-8 animate-fade-in-slow sm:mb-0 sm:justify-start">
                <SocialButton href="https://photos.maxmckinney.com/" target="_blank" rel="noopener noreferrer">
                    <PiAperture />
                </SocialButton>
                <SocialButton href="https://github.com/MadMaxMcKinney" target="_blank" rel="noopener noreferrer">
                    <PiGithubLogo />
                </SocialButton>
                <SocialButton href="http://youtube.com/maxmckinney" target="_blank" rel="noopener noreferrer">
                    <PiYoutubeLogo />
                </SocialButton>
                <SocialButton href="https://www.linkedin.com/in/mckinneymax" target="_blank" rel="noopener noreferrer">
                    <PiLinkedinLogo />
                </SocialButton>
            </div>

            {/* Email */}
            <a className="text-xl text-center font-bold md:text-left transition-all filter hover:opacity-70" href="mailto:hello@maxmckinney.com">
                hello@maxmckinney.com
            </a>
        </div>
    );
};

export default Footer;
