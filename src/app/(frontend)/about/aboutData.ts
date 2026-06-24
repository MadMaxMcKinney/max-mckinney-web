// Shared content for the About page layout explorations.
// Images are statically imported from src/assets so Next can optimize them
// (size hashing, dimensions, blur, webp) at build time.

import type { StaticImageData } from "next/image";

import c10 from "@assets/img/about/c10.jpg";
import craft1 from "@assets/img/about/craft-1.jpg";
import craft2 from "@assets/img/about/craft-2.jpg";
import craft3 from "@assets/img/about/craft-3.jpg";
import lim1 from "@assets/img/about/lim-1.jpg";
import lim2 from "@assets/img/about/lim-2.jpg";
import lim4 from "@assets/img/about/lim-4.jpg";
import maxCars from "@assets/img/about/max-cars.png";
import place1 from "@assets/img/about/place-1.jpg";
import place2 from "@assets/img/about/place-2.jpg";
import place3 from "@assets/img/about/place-3.jpg";
import warehouseInside from "@assets/img/about/warehouse-inside.jpg";

export type Aspect = "portrait" | "landscape" | "square";

export interface Photo {
    src: StaticImageData;
    caption: string;
    aspect: Aspect;
}

export interface Category {
    id: string;
    title: string;
    blurb: string;
    photos: Photo[];
}

export const bio = {
    name: "Max McKinney",
    lead: "i build with empathy, and design to humanize technology.",
    body: "That said... outside of work I'm usually in the garage with a classic car, behind a camera, or building something small and strange on the web. This page is a little less polished than the rest of the site, just the things I point my attention at when interest or new hobbies strike.",
};

export const categories: Category[] = [
    {
        id: "garage",
        title: "the garage.",
        blurb: "Classic rock, half-finished projects, and the smell of gasoline.",
        photos: [
            { src: maxCars, caption: "Me (right) and my buddies.", aspect: "landscape" },
            { src: warehouseInside, caption: "Working on the lift.", aspect: "portrait" },
            { src: c10, caption: "Rebuilt a 1970 C10.", aspect: "landscape" },
        ],
    },
    {
        id: "places",
        title: "the places.",
        blurb: "The views along the way.",
        photos: [
            { src: place2, caption: "More mountains, ft. Jeep!", aspect: "landscape" },
            { src: place3, caption: "Route 66.", aspect: "portrait" },
            { src: place1, caption: "Colorado mountains.", aspect: "portrait" },
        ],
    },
    {
        id: "craft",
        title: "the craft.",
        blurb: "Designing and building anywhere and everywhere.",
        photos: [
            { src: craft1, caption: "Overkill smart home infra.", aspect: "square" },
            { src: craft3, caption: "Designing t-shirts for my cars.", aspect: "portrait" },
            { src: craft2, caption: "Speaking at Config '25.", aspect: "landscape" },
        ],
    },
    {
        id: "everyday",
        title: "the in-between.",
        blurb: "Favorite photography niche, liminal spaces.",
        photos: [
            { src: lim1, caption: "The office.", aspect: "portrait" },
            { src: lim2, caption: "The field.", aspect: "landscape" },
            { src: lim4, caption: "The hallway.", aspect: "portrait" },
        ],
    },
];

export const aspectClass: Record<Aspect, string> = {
    portrait: "aspect-3/4",
    landscape: "aspect-4/3",
    square: "aspect-square",
};
