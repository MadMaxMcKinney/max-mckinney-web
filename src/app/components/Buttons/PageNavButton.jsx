import React from "react";
import { MHeading06 } from "@components/Typography";
import { PiArrowRight } from "react-icons/pi";

const PageNavButton = (props) => {
    let activeColorClass = props.isActivePage ? "text-white" : "text-zinc-400";

    return <MHeading06 className={`${activeColorClass} grid uppercase grid-flow-col gap-2 text-sm font-thin place-items-center transition-all group hover:opacity-70`}>{props.children}</MHeading06>;
};

export default PageNavButton;
