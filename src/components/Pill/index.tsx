import React from "react";

interface PillProps {
    text: string;
    type: "primary" | "themed";
    theme?: string;
}

export default function Pill(props: PillProps) {
    const styleClasses: any = {
        primary: {
            backgroundColor: "#FF616126",
            color: "#c31919",
        },
        themed: {
            backgroundColor: props.theme + "26",
            color: props.theme,
        },
    };

    return (
        <div className={`flex justify-center items-center py-1 px-2 rounded-md`} style={styleClasses[props.type]}>
            <p className="uppercase text-sm font-medium tracking-wide font-display">{props.text}</p>
        </div>
    );
}
