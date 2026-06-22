import React from "react";
import { PiArrowUpRight } from "react-icons/pi";

const PersonalProjectLinkSourceButton = (props) => {
    return (
        <a
            href={props.href}
            style={{ "--accentColor": props.accent }}
            className="group inline-flex w-fit items-center gap-1.5 text-base font-medium text-zinc-400 transition-colors hover:text-[var(--accentColor)]"
        >
            View source
            <PiArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
    );
};

export default PersonalProjectLinkSourceButton;
