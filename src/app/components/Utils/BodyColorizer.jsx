"use client";

import React from "react";
import { useEffect } from "react";

const BodyColorizer = ({ hex }) => {
    <style jsx global>
        {`
            body {
                background: ${hex};
            }
        `}
    </style>;
    return null;
};

export default BodyColorizer;
