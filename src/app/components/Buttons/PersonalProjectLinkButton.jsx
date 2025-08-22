import React from "react";
import { MBody } from "../Typography";
import { PiRocketLaunch } from "react-icons/pi";

const PersonalProjectLinkButton = (props) => {
    return (
        <a
            href={props.href}
            accent={props.accent}
            style={{
                "--accentColor": props.accent,
                "--accentForeground": props.accentForeground || "#ffffff",
            }}
            className={`flex w-fit gap-2 items-center justify-center rounded-full px-4 py-2 bg-[var(--accentColor)] text-[var(--accentForeground)] border border-solid border-transparent transition transform hover:border-white active:scale-95`}
        >
            <PiRocketLaunch className="w-5 h-5"></PiRocketLaunch>
            <MBody>View project</MBody>
        </a>
    );
};

export default PersonalProjectLinkButton;
