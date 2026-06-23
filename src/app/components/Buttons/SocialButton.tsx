import React from "react";

interface SocialButtonProps {
    href: string;
    rel: string;
    children: React.ReactNode;
    target?: string;
}

export const SocialButton = (props: SocialButtonProps) => {
    return (
        <a href={props.href} target={props.target ? props.target : "_blank"} rel={props.rel} className={`text-sm font-light uppercase text-zinc-400 no-underline transition-all hover:text-white`}>
            {props.children}
        </a>
    );
};
