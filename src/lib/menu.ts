import Home from "@icons/Home.astro";
import Branch from "@icons/Branch.astro";
import Curriculum from "@icons/Curriculum.astro";
import Writing from "@icons/Writing.astro";
import Blog from "@icons/Blog.astro";
import FigLogo from "@icons/FigLogo.astro";

// ENGLISH
export const routeEnglish = {
  home: "/",
  about: "/about/",
  projects: "/projects/",
  resources: "/resources/",
  blog: "/blog/",
  figuratenum: "/figuratenum/",
} as const;

export const menuEnglish = [
  {
    text: "Home",
    href: routeEnglish.home,
    icon: Home,
    activeType: "exact",
  },
  {
    text: "About me",
    href: routeEnglish.about,
    icon: Curriculum,
    activeType: "exact",
  },
  {
    text: "Software",
    href: routeEnglish.projects,
    icon: Branch,
    activeType: "exact",
  },
  {
    text: "Resources",
    href: routeEnglish.resources,
    icon: Writing,
    activeType: "exact",
  },
  {
    text: "Notes",
    href: routeEnglish.blog,
    icon: Blog,
    activeType: "section",
  },
  {
    text: "FigurateNum",
    href: routeEnglish.figuratenum,
    icon: FigLogo,
    activeType: "section",
  },
] as const;

// SPANISH
export const routeSpanish = {
  home: "/es/",
  projects: "/es/projects/",
  about: "/es/about/",
  resources: "/es/resources/",
  blog: "/blog/",
} as const;

export const menuSpanish = [
  {
    text: "Inicio",
    href: routeSpanish.home,
    icon: Home,
    activeType: "exact",
  },
  {
    text: "Acerca de mí",
    href: routeSpanish.about,
    icon: Curriculum,
    activeType: "exact",
  },
  {
    text: "Bibliotecas",
    href: routeSpanish.projects,
    icon: Branch,
    activeType: "exact",
  },
  {
    text: "Recursos",
    href: routeSpanish.resources,
    icon: Writing,
    activeType: "exact",
  },
  {
    text: "Notas",
    href: routeSpanish.blog,
    icon: Blog,
    activeType: "section",
  },
] as const;
