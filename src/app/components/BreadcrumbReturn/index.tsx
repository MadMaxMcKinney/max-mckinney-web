import { MHeading06 } from "@/app/components/Typography";
import Link from "next/link";
import { PiArrowLeft } from "react-icons/pi";

interface BreadcrumbReturnProps {
    href: string;
    location: string;
}

export default function BreadcrumbReturn({ href, location }: BreadcrumbReturnProps) {
    return (
        <Link href={href} className="mb-6">
            <MHeading06 className={`grid grid-flow-col gap-1 text-sm font-medium leading-none text-zinc-400 place-items-center transition-all group hover:opacity-70`}>
                <PiArrowLeft className="w-4 h-4 mr-1 transform translate-y-px group-hover:animate-pulse-right"></PiArrowLeft> {location}
            </MHeading06>
        </Link>
    );
}
