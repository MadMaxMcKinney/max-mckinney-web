import React from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@assets/img/max_word_mark.png";
import PageNavButton from "@/components/Buttons/PageNavButton";

const Header = (props: { location: string }) => {
    return (
        <header className="h-16 grid place-items-center w-full mt-4 px-6 z-10 top-0 absolute animate-fade-in-fast">
            <div className="flex justify-between mx-auto w-full xl:max-w-7xl">
                {/* Site Logo Container */}
                <div className="flex flex-row items-center justify-start">
                    <Link className="transition-opacity hover:opacity-80" href="/">
                        <Image className="h-auto w-12" src={logo} placeholder="blur" alt="Max McKinney Logo" />
                    </Link>
                </div>

                <ul className="grid grid-flow-col gap-2 justify-end items-center list-none md:gap-4">
                    {/* Page Tabs */}
                    <li id="professionalProjects">
                        <Link href={"/"}>
                            <PageNavButton isActivePage={props.location === "/" ? true : false}>
                                <p>Work</p>
                            </PageNavButton>
                        </Link>
                    </li>
                    <li id="personalProjects">
                        <Link href="/personal">
                            <PageNavButton isActivePage={RegExp("/personal.?").test(props.location) ? true : false}>
                                <p>Personal</p>
                            </PageNavButton>
                        </Link>
                    </li>
                </ul>
            </div>
        </header>
    );
};

export default Header;
