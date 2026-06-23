import { Metadata } from "next";
import Image from "next/image";
import { bio, categories, aspectClass, type Photo } from "./aboutData";
import { MHeading01 } from "@/app/components/Typography";
import Label from "@/app/components/Label";
import { FadeIn } from "@/app/components/Anim";

export const metadata: Metadata = {
    title: "About",
    description: "A little about Max McKinney from the garage, the builds, the craft, and the in-between.",
};

function PhotoTile({ photo, priority = false }: { photo: Photo; priority?: boolean }) {
    return (
        // Each tile shares the row width equally; height follows the photo's own
        // aspect ratio, so heights vary across the row.
        <figure className="group min-w-0 flex-1">
            <div className={`relative w-full overflow-hidden rounded-lg bg-[#0c0c12] ${aspectClass[photo.aspect]}`}>
                <Image
                    src={photo.src}
                    alt={photo.caption}
                    fill
                    sizes="(max-width: 640px) 30vw, 15vw"
                    priority={priority}
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
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
                <div className="relative h-40 w-40 mb-8">
                    <Image src={"/about/max-neon-portrait.jpg"} alt={"Photo of Max McKinney, behind a neon sign, looking at the camera"} fill priority className="object-cover w-60 rounded-full" />
                    <span className="absolute bottom-0 right-0 text-5xl">👋</span>
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

                        {/* Up to 3 images in a row, fit to the section width; heights vary by aspect. */}
                        <div className="flex items-start gap-4">
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
