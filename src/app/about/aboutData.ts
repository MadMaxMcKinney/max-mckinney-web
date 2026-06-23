// Shared content for the About page layout explorations.
// NOTE: images are placeholders pulled from existing project assets so the
// layouts render with real visuals. Swap `src` values for real photos later.

export type Aspect = "portrait" | "landscape" | "square";

export interface Photo {
    src: string;
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
    lead: "I build with empathy, and design to humanize technology.",
    body: "That said... outside of work I'm usually in the garage with a classic car, behind a camera, or building something small and strange on the web. This page is a little less polished than the rest of the site, just the things I point my attention at when interest or new hobbies strike.",
};

export const categories: Category[] = [
    {
        id: "garage",
        title: "the garage.",
        blurb: "Classic rock, half-finished projects, and the smell of gasoline.",
        photos: [
            { src: "/about/max-cars.png", caption: "Me (right) and my buddies", aspect: "landscape" },
            { src: "/about/warehouse-inside.jpg", caption: "Working on the lift", aspect: "portrait" },
            { src: "/about/c10.jpg", caption: "Rebuilt a 1970 C10", aspect: "landscape" },
        ],
    },
    {
        id: "places",
        title: "the places.",
        blurb: "The views along the way.",
        photos: [
            { src: "/about/place-2.jpg", caption: "More mountains, ft. Jeep!", aspect: "landscape" },

            { src: "/about/place-3.jpg", caption: "Route 66", aspect: "portrait" },
            { src: "/about/place-1.jpg", caption: "Colorado mountains", aspect: "portrait" },
        ],
    },
    {
        id: "craft",
        title: "the craft.",
        blurb: "Designing and building anywhere and everywhere.",
        photos: [
            { src: "/about/craft-1.jpg", caption: "Overkill smart home infra", aspect: "square" },
            { src: "/about/craft-3.jpg", caption: "Designing t-shirts for my cars", aspect: "portrait" },
            { src: "/about/craft-2.jpg", caption: "Speaking at Config '25", aspect: "landscape" },
        ],
    },
    {
        id: "everyday",
        title: "the in-between.",
        blurb: "Favorite photography niche, liminal spaces.",
        photos: [
            { src: "/about/lim-1.jpg", caption: "The meeting.", aspect: "portrait" },
            { src: "/about/lim-2.jpg", caption: "The loss.", aspect: "landscape" },
            { src: "/about/lim-4.jpg", caption: "The recovery.", aspect: "portrait" },
        ],
    },
];

export const aspectClass: Record<Aspect, string> = {
    portrait: "aspect-[3/4]",
    landscape: "aspect-[4/3]",
    square: "aspect-square",
};
