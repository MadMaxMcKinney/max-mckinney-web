import React from "react";
import { MBody } from "@components/Typography";
import { PiCode } from "react-icons/pi";

const PersonalProjectLinkSourceButton = (props) => {
    return (
        <a
            href={props.href}
            accent={props.accent}
            style={{ "--accentColor": props.accent }}
            className="flex w-fit gap-1 bg-white text-black items-center justify-center rounded-xl px-4 py-2 border border-solid border-transparent transition-all hover:border-white hover:text-white hover:bg-[var(--accentColor)] hover:rounded-2xl"
        >
            <PiCode className="w-5 h-5"></PiCode>
            <MBody>View source</MBody>
        </a>
    );
};

export default PersonalProjectLinkSourceButton;
