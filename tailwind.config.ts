import type { Config } from "tailwindcss";

const config: Config = {
    content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
    theme: {
        extend: {
            maxWidth: {
                "8xl": "1560px",
            },
            animation: {
                "pulse-right": "pulsing-right 0.3s alternate infinite",
                "flow-background": "flow 5.5s ease-in-out infinite",
                "shapes-in": "shapes-in 1s ease-in-out",
                "fade-in-very-slow": "fade-in 4s",
                "fade-in-slow": "fade-in 3s",
                "fade-in": "fade-in 2s",
                "fade-in-fast": "fade-in 1s",
                "fade-in-up": "fade-in-up 1s",
                "color-change": "color-change 6s infinite",
            },
            keyframes: {
                "pulsing-right": {
                    from: { transform: "translateX(0)" },
                    to: { transform: "translateX(4px)" },
                },
                "fade-in": {
                    "0%": {
                        opacity: "0",
                        transform: "translateY(-20px)",
                    },
                    "100%": {
                        opacity: "1",
                        transform: "translateY(0px)",
                    },
                },
                "shapes-in": {
                    "0%": {
                        opacity: "0",
                        transform: "translateY(-20px)",
                    },
                    "25%": {
                        opacity: "1",
                    },
                    "100%": {
                        transform: "translateY(0px)",
                    },
                },
                "slide-in": {
                    "0%": {
                        transform: "translateY(-20px)",
                    },
                    "100%": {
                        transform: "translateY(0px)",
                    },
                },
                "fade-in-up": {
                    "0%": {
                        opacity: "0",
                        transform: "translateY(20px)",
                    },
                    "100%": {
                        opacity: "1",
                        transform: "translateY(0px)",
                    },
                },
                flow: {
                    "0%": {
                        "background-position": "0 50%",
                    },
                    "50%": {
                        "background-position": "100% 50%",
                    },
                    "100%": {
                        "background-position": "0 50%",
                    },
                },
                "color-change": {
                    "0%": {
                        color: "#19D18C",
                    },
                    "33%": {
                        color: "#F25E31",
                    },
                    "66%": {
                        color: "#28C0FD",
                    },
                    "100%": {
                        color: "#A866FD",
                    },
                },
            },
            typography: {
                DEFAULT: {
                    css: {
                        color: "#ffffff",

                        h1: {
                            color: "#fff",
                        },
                        h2: {
                            color: "#fff",
                        },
                        h3: {
                            color: "#fff",
                        },
                        h4: {
                            color: "#fff",
                        },
                    },
                },
            },
        },
    },
    plugins: [require("@tailwindcss/typography")],
};
export default config;
