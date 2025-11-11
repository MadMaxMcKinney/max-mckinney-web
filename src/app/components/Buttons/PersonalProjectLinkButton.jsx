import React from "react";
import { MBody } from "../Typography";
import { PiRocketLaunch, PiShare } from "react-icons/pi";

const PersonalProjectLinkButton = (props) => {
    return (
        <a
            href={props.href}
            accent={props.accent}
            style={{
                "--accentColor": props.accent,
                "--accentForeground": props.accentForeground || "#ffffff",
            }}
            className={`flex w-fit gap-1 items-center justify-center rounded-xl px-4 py-2 bg-[var(--accentColor)] text-[var(--accentForeground)] border border-solid border-transparent transition-all hover:border-white hover:rounded-2xl`}
        >
            <PiShare className="w-5 h-5"></PiShare>
            <MBody>View project</MBody>
        </a>
    );
};

export default PersonalProjectLinkButton;
