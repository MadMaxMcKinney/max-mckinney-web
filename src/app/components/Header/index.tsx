import React from "react";
import { FadeIn } from "@/app/components/Anim";

const HeaderTitle = ({ children }: any) => {
    return (
        <FadeIn as="h1" duration={1} className="font-bold text-4xl mb-24 sm:text-5xl md:text-7xl md:leading-massive">
            {children}
        </FadeIn>
    );
};

export default HeaderTitle;
