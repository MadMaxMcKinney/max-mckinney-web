import React from "react";
import { MHeading06 } from "@components/Typography";
import { PiArrowRight } from "react-icons/pi";

const PageNavButton = (props) => {
    let activeColorClass = props.isActivePage ? "text-white" : "text-zinc-400";

    return <p className={`${activeColorClass} grid grid-flow-col text-sm gap-2 font-light uppercase place-items-center transition-all group hover:opacity-70`}>{props.children}</p>;
};

export default PageNavButton;
