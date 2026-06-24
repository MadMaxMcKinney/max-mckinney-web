import type { GlobalConfig } from "payload";

export const SiteSettings: GlobalConfig = {
    slug: "site-settings",
    label: "Site Settings",
    admin: {
        group: "Settings",
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            type: "tabs",
            tabs: [
                {
                    label: "General",
                    fields: [
                        { name: "title", type: "text", required: true, admin: { description: "Site title (used in metadata templates)." } },
                        { name: "description", type: "textarea", required: true, admin: { description: "Default meta description." } },
                        { name: "siteUrl", type: "text", required: true, admin: { description: "Canonical site URL, e.g. https://maxmckinney.com" } },
                    ],
                },
                {
                    label: "Social",
                    fields: [
                        {
                            name: "social",
                            type: "array",
                            label: "Social links",
                            fields: [
                                { name: "label", type: "text", required: true },
                                { name: "url", type: "text", required: true },
                            ],
                        },
                    ],
                },
            ],
        },
    ],
};
