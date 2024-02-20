import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
    title: "Max McKinney",
    description: "I’m Max McKinney, a design leader building for empathy and humanizing technology. I specialize in web experiences and thrive in undefined problem spaces.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <Nav location="/" />
                {children}
                <Footer />
            </body>
        </html>
    );
}
