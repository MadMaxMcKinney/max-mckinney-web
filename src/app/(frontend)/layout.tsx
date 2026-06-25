import type { Metadata } from "next";
import "../globals.css";
import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";
import { TooltipProvider } from "@/app/components/Tooltip";
import { getSiteSettings, mediaURL } from "@/app/fetchers";
import RefreshRouteOnSave from "@/app/components/RefreshRouteOnSave";
import { Analytics } from "@vercel/analytics/react";

// ISR: regenerate frontend pages in the background at most once per hour, so
// Payload edits (content, footer, global metadata) appear without a redeploy.
// Inherited by all frontend routes; the [slug] pages keep generateStaticParams
// to prebuild known projects, while dynamicParams renders new ones on demand.
export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
    const settings = await getSiteSettings();
    const title = settings?.title || "Max McKinney";
    const description =
        settings?.description ||
        "I’m Max McKinney, a designer and engineer building for empathy and humanizing technology. I specialize in web experiences and thrive in undefined problem spaces.";
    const siteUrl = settings?.siteUrl || "https://maxmckinney.com";
    const ogImage = mediaURL(settings?.ogImage);
    return {
        title: {
            template: `%s | ${title}`,
            default: title,
        },
        description,
        metadataBase: new URL(siteUrl),
        ...(ogImage ? { openGraph: { images: [ogImage] } } : {}),
    };
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <RefreshRouteOnSave />
                <TooltipProvider>
                    <Nav />
                    {children}
                    <Footer />
                </TooltipProvider>
                <Analytics />
            </body>
        </html>
    );
}
