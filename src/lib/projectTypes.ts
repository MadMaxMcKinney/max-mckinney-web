/** Fixed set of personal-project type tags (drives filtering/labels). */
export const PROJECT_TYPES = ["web", "app", "ai", "iOS", "brand", "education", "raycast", "tool", "cli"] as const;

export type ProjectType = (typeof PROJECT_TYPES)[number];
