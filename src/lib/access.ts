import type { Access } from "payload";

/**
 * Read access for draft-enabled collections: anyone can read published docs,
 * but only authenticated (admin) users can read drafts. Pairs with fetchers
 * that pass `overrideAccess: false` for public requests.
 */
export const publishedOrAuthenticated: Access = ({ req: { user } }) => {
    if (user) return true;
    return { _status: { equals: "published" } };
};
