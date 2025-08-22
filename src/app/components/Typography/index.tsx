import React from "react";

interface TypographyProps {
    children: React.ReactNode;
    className?: string;
}

// Headings \\
export const MHeadingHero = ({ children, className }: TypographyProps) => {
    return <h1 className={`font-bold text-6xl text-white sm:text-7xl md:text-8xl ${className}`}>{children}</h1>;
};

export const MHeading01 = ({ children, className }: TypographyProps) => {
    return <h1 className={`font-bold text-4xl sm:text-5xl ${className}`}>{children}</h1>;
};

export const MHeading02 = ({ children, className }: TypographyProps) => {
    return <h2 className={`font-bold text-3xl ${className}`}>{children}</h2>;
};

export const MHeading03 = ({ children, className }: TypographyProps) => {
    return <h3 className={`font-bold text-2xl ${className}`}>{children}</h3>;
};

export const MHeading04 = ({ children, className }: TypographyProps) => {
    return <h4 className={`font-bold text-xl ${className}`}>{children}</h4>;
};

export const MHeading05 = ({ children, className }: TypographyProps) => {
    return <h5 className={`font-bold text-base ${className}`}>{children}</h5>;
};

export const MHeading06 = ({ children, className }: TypographyProps) => {
    return <h5 className={`font-bold text-sm ${className}`}>{children}</h5>;
};
//////

// Body \\
export const MBodyLead = ({ children, className }: TypographyProps) => {
    return <p className={`font-semibold text-2xl sm:text-3xl sm:leading-10 ${className}`}>{children}</p>;
};

export const MBodyXL = ({ children, className }: TypographyProps) => {
    return <p className={`font-semibold text-xl sm:text-2xl ${className}`}>{children}</p>;
};

export const MBody = ({ children, className }: TypographyProps) => {
    return <p className={`font-medium text-lg ${className}`}>{children}</p>;
};

export const MBodyLight = ({ children, className }: TypographyProps) => {
    return <p className={`font-normal text-lg ${className}`}>{children}</p>;
};

export const MBodySmall = ({ children, className }: TypographyProps) => {
    return <p className={`font-normal text-sm leading-5 ${className}`}>{children}</p>;
};
//////
