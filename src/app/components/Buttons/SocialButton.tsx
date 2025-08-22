import React from "react";

interface SocialButtonProps {
    href: string;
    rel: string;
    children: React.ReactNode;
    target?: string;
}

export const SocialButton = (props: SocialButtonProps) => {
    return (
        <a href={props.href} target={props.target ? props.target : "_blank"} rel={props.rel} className={`grid place-items-center transition-all text-xl no-underline text-zinc-300 hover:opacity-70`}>
            {props.children}
        </a>
    );
};
