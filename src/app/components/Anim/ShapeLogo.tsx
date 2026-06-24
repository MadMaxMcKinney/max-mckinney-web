"use client";

import React, { useEffect, useMemo, useRef } from "react";
import Lottie, { type LottieRefCurrentProps } from "lottie-react";
import rawAnimationData from "@assets/lottie/max-shape.json";

export default function ShapeLogo() {
    const lottieRef = useRef<LottieRefCurrentProps>(null);

    // lottie-web mutates the animation data, but the JSON import is non-extensible,
    // so hand it a mutable deep clone.
    const animationData = useMemo(() => structuredClone(rawAnimationData), []);

    // Hold on the first frame, then play after a short beat (matches the
    // previous delayed-autoplay behavior).
    useEffect(() => {
        const timer = setTimeout(() => lottieRef.current?.play(), 400);
        return () => clearTimeout(timer);
    }, []);

    return (
        <Lottie
            lottieRef={lottieRef}
            animationData={animationData}
            loop={false}
            autoplay={false}
            rendererSettings={{ preserveAspectRatio: "xMidYMid slice" }}
            style={{ width: "150px", height: "45px", cursor: "default" }}
        />
    );
}
