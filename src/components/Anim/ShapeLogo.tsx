"use client";

import React, { useEffect, useState } from "react";
import Lottie from "react-lottie";
import * as animationData from "@assets/lottie/max-shape.json";

export default function ShapeLogo() {
    const [isPlayingShapes, setIsPlayingShapes] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setIsPlayingShapes(true);
        }, 400);
    }, []);

    return (
        <Lottie
            options={{ loop: false, autoplay: isPlayingShapes, rendererSettings: { preserveAspectRatio: "xMidYMid slice" }, animationData: animationData.default }}
            style={{ width: "150px", height: "45px", cursor: "default" }}
        />
    );
}
