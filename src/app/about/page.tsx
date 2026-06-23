import { Metadata } from "next";
import Image from "next/image";
import { bio, categories, aspectClass, type Photo } from "./aboutData";
import { MHeading01 } from "@/app/components/Typography";
import Label from "@/app/components/Label";
import { FadeIn } from "@/app/components/Anim";
import { Tooltip } from "@/app/components/Tooltip";
import maxNeonPortrait from "@assets/img/about/max-neon-portrait.jpg";

export const metadata: Metadata = {
    title: "About",
    description: "A little about Max McKinney from the garage, the builds, the craft, and the in-between.",
};

function PhotoTile({ photo, priority = false }: { photo: Photo; priority?: boolean }) {
    return (
        // On mobile each tile takes a fixed share of the viewport so the row
        // overflows and scroll-snaps, leaving the next image peeking. From `sm`
        // up the tiles share the row width equally. Height follows the photo's
        // own aspect ratio, so heights vary across the row.
        <figure className="group min-w-0 w-[78%] shrink-0 snap-start sm:w-auto sm:flex-1">
            <div className={`relative w-full overflow-hidden rounded-lg bg-[#0c0c12] ${aspectClass[photo.aspect]}`}>
                <Image src={photo.src} alt={photo.caption} fill priority={priority} className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]" />
            </div>
            <figcaption className="mt-3 font-serif text-sm italic text-zinc-400">{photo.caption}</figcaption>
        </figure>
    );
}

export default function AboutPage() {
    return (
        <div className="page-grid page-grid-xl">
            {/* Bio */}
            <FadeIn dir="up" duration={1} as="div" className="mt-28 max-w-3xl sm:mt-40">
                <div className="relative h-32 w-32 mb-8 lg:h-40 lg:w-40">
                    <Image src={maxNeonPortrait} alt={"Photo of Max McKinney, behind a neon sign, looking at the camera"} fill priority className="object-cover w-60 rounded-full" />
                    <Tooltip content={<>👋 Thanks for stopping by!</>} className="absolute bottom-0 right-0">
                        <span className="animate-hand-wave inline-block text-4xl lg:text-5xl">👋</span>
                    </Tooltip>
                </div>
                <Label className="mb-5">Hi, I'm Max McKinney.</Label>
                <MHeading01 className="mb-6 text-white">{bio.lead}</MHeading01>
                <p className="text-lg text-zinc-400 sm:text-xl">{bio.body}</p>
            </FadeIn>

            {/* Category sections — 2x2 grid on desktop, stacked on mobile */}
            <div className="mt-20 grid grid-cols-1 gap-16 sm:mt-32 lg:grid-cols-2 lg:gap-x-10 lg:gap-y-20">
                {categories.map((cat, ci) => (
                    <FadeIn key={cat.id} dir="up" duration={0.9} as="section">
                        <h2 className="mb-3 font-serif text-2xl font-medium text-white sm:text-3xl">{cat.title}</h2>
                        <p className="mb-7 max-w-xl text-base text-zinc-400 sm:text-lg">{cat.blurb}</p>

                        {/* Up to 3 images. On mobile they overflow into a horizontal
                            scroll-snap rail (full-bleed via -mx-6, with px-6 of inset so
                            images peek and can still scroll fully off-screen); from `sm`
                            up they fit the section width. Heights vary by aspect. */}
                        <div className="-mx-6 flex items-start gap-4 snap-x snap-mandatory scroll-pl-6 overflow-x-auto px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:snap-none sm:overflow-visible sm:px-0">
                            {cat.photos.slice(0, 3).map((photo, pi) => (
                                <PhotoTile key={photo.src + photo.caption} photo={photo} priority={ci === 0 && pi === 0} />
                            ))}
                        </div>
                    </FadeIn>
                ))}
            </div>
        </div>
    );
}
