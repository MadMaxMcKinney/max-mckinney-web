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
        title: "the garage",
        blurb: "Classic metal, half-finished projects, and the smell of gasoline.",
        photos: [
            { src: "/personal/maxs-speed-studio/maxs-speed-studio-preview.jpg", caption: "Sunday in the bay", aspect: "landscape" },
            { src: "/personal/hellish-creative/hellish-creative-preview.jpg", caption: "Before the rebuild", aspect: "portrait" },
            { src: "/work/dell-clarity/clarity_2.jpg", caption: "Torque specs by memory", aspect: "landscape" },
            { src: "/work/dell-clarity/clarity_1.jpg", caption: "First start of the year", aspect: "square" },
        ],
    },
    {
        id: "places",
        title: "places",
        blurb: "Roads I took the long way around.",
        photos: [
            { src: "/work/dell-product/dell-welcome-header.jpg", caption: "Golden hour, nowhere in particular", aspect: "landscape" },
            { src: "/personal/max-mckinney-photo/max-mckinney-photo-hero-v3.png", caption: "Coastline detour", aspect: "landscape" },
            { src: "/work/dell-clarity/clarity-toolkit-large.jpg", caption: "City I keep returning to", aspect: "portrait" },
            { src: "/personal/cmdtower/cmdtower-preview.jpg", caption: "Window seat", aspect: "square" },
        ],
    },
    {
        id: "craft",
        title: "the craft",
        blurb: "Design, code, and the occasional happy accident.",
        photos: [
            { src: "/work/sureshot-branding/Sureshot-Website-Dribbble.png", caption: "Pixels at 2am", aspect: "landscape" },
            { src: "/work/figma-education-design/figma-education-design-background.png", caption: "Teaching the thing", aspect: "landscape" },
            { src: "/personal/cmdtower/cmdtower-preview.jpg", caption: "Tiny tool, big rabbit hole", aspect: "square" },
            { src: "/work/dell-clarity/clarity_1.jpg", caption: "Shipped on a Friday", aspect: "landscape" },
        ],
    },
    {
        id: "everyday",
        title: "in between",
        blurb: "The small stuff that doesn't fit anywhere else.",
        photos: [
            { src: "/personal/cmdtower/cmdtower-preview.jpg", caption: "Coffee number three", aspect: "square" },
            { src: "/personal/hellish-creative/hellish-creative-preview.jpg", caption: "Desk, current state", aspect: "landscape" },
            { src: "/personal/maxs-speed-studio/maxs-speed-studio-preview.jpg", caption: "Late light", aspect: "portrait" },
            { src: "/work/dell-product/dell-welcome-header.jpg", caption: "The drive home", aspect: "landscape" },
        ],
    },
];

export const aspectClass: Record<Aspect, string> = {
    portrait: "aspect-[3/4]",
    landscape: "aspect-[4/3]",
    square: "aspect-square",
};
