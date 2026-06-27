import React from "react";
import { MaxShapeIcon } from "./MaxShapeIcon";

/**
 * Admin Logo — the same "M." brand mark as the Icon, sized up for the nav and
 * login screen. Kept as its own component so the Payload config can point the
 * Logo and Icon graphics at different sizes.
 */

type Props = {
    /** Rendered size in px (square). */
    height?: number;
    className?: string;
    title?: string;
};

export function MaxShapeMark({ height = 32, className, title }: Props) {
    return <MaxShapeIcon size={height} className={className} title={title} />;
}

export default MaxShapeMark;
