import { ContentNavItem, NavItem } from "@/types";

const content: ContentNavItem[] = [
  {
    title: "Blog",
    href: "/posts",
    description: "Blogposts. Mostly about web development. Or chicken fingers",
  },
];

const cv: ContentNavItem[] = [
  {
    title: "My CV as a Frontend Developer",
    blank: true,
    href: "/resume-frontend-cv.pdf",
    description: "React.js, Next.js, Tailwind, TypeScript, JavaScript, Node.js, and more.",
    download: true,
  },
  {
    title: "My CV as a Backend Developer",
    blank: true,
    href: "/resume-backend-cv.pdf",
    description: "PHP, Laravel, Python, FastAPI, Node.js, PostgreSQL, Redis, and more.",
    download: true,
  },
];

export const navigationLinks: NavItem[] = [
  {
    title: "CV",
    content: cv,
  },
  {
    title: "Content",
    content,
  },
  {
    title: "Projects",
    href: "/projects",
  },
  {
    title: "Now",
    href: "/now",
  },
];
