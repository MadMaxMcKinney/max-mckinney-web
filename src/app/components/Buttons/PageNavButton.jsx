import React from "react";
import { MHeading06 } from "@components/Typography";
import { PiArrowRight } from "react-icons/pi";

const PageNavButton = (props) => {
    let activeColorClass = props.isActivePage ? "text-white" : "text-zinc-400";

    return <p className={`${activeColorClass} font-serif grid grid-flow-col text-base gap-2 font-medium place-items-center transition-all group hover:opacity-70`}>{props.children}</p>;
};

export default PageNavButton;
