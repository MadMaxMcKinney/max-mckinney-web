import type { Metadata } from "next";
import "../globals.css";
import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";
import { TooltipProvider } from "@/app/components/Tooltip";
import { getSiteSettings, mediaURL } from "@/app/fetchers";
import { Analytics } from "@vercel/analytics/react";

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
