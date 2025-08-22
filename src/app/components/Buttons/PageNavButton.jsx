import React from "react";
import { MHeading06 } from "@components/Typography";
import { PiArrowRight } from "react-icons/pi";

const PageNavButton = (props) => {
    let activeColorClass = props.isActivePage ? "text-white" : "text-gray-400";

    return (
        <MHeading06 className={`${activeColorClass} grid grid-flow-col gap-2 text-sm font-bold place-items-center transition-all group hover:opacity-70`}>
            {props.children} <PiArrowRight className="w-4 h-4 mr-2 transform translate-y-px group-hover:animate-pulse-right"></PiArrowRight>
        </MHeading06>
    );
};

export default PageNavButton;
