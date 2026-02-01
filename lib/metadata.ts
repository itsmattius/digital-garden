import { AuthorType, SiteMetaData } from "@/types";

import { socialProfiles } from "./social-data";

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL as string;

export const defaultAuthor: AuthorType = {
  name: "Mehdi Abedi",
  handle: "@itsmattius",
  socialProfiles,
  email: "abedi1667@gmail.com",
  website: BASE_URL,
  jobTitle: "Senior - Frontend / Full-Stack Engineer",
  company: "Freelancer",
  availableForWork: true,
  location: {
    city: "Yerevan, Armenia",
    media: "/yerevan.webp",
  },
};

const defaultTitle = `${defaultAuthor.name}'s Blog`;
const defaultDescription = `I'm ${defaultAuthor.name}. Always learning, experimenting, and building real software.`;

const siteMetadata: SiteMetaData = {
  title: {
    template: `%s | ${defaultTitle}`,
    default: defaultTitle,
  },
  description: defaultDescription,
  siteRepo: "https://github.com/itsmattius/digital-garden",
  newsletterProvider: "mailerlite",
  newsletterUrl: "",
  analyticsProvider: "umami",
  defaultTheme: "system",
  activeAnnouncement: false,
  announcement: {
    buttonText: "Support on DevHunt →",
    link: "https://devhunt.org/tool/modern-developer-blog-template-digital-garden-starter",
  },
  postsPerPage: 10,
  postsOnHomePage: 8,
  projectsOnHomePage: 4,
};

export default siteMetadata;
