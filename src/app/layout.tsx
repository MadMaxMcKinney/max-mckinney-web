import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import siteConfig from "@/siteConfig";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
    title: {
        template: `%s | ${siteConfig.title}`,
        default: siteConfig.title,
    },
    description: siteConfig.description,
    metadataBase: new URL("https://maxmckinney.com"),
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <Nav />
                {children}
                <Footer />
                <Analytics />
            </body>
        </html>
    );
}
