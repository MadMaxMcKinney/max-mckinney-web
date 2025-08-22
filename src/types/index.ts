export interface WorkProject {
    title: string;
    projectClient: string;
    projectDate: string;
    projectRole: string;
    projectBrief: string;
    projectShortBrief: string;
    categories: string[];
    themeColor: string;
    accentColor: string;
    image: string;
    thumb: string;
    sortDate: string;
}

export interface PersonalProject {
    title: string;
    description: string;
    accent: string;
    accentForeground?: string;
    locationText: string;
    icon: string;
    seoImage: string;
    sortDate: string;
    projectTypes: string[];
    folder?: string;
    folderFor?: string;
    projectLink: string;
    sourceLink?: string;
}
