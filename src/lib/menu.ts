import Home from "@icons/Home.astro";
import Branch from "@icons/Branch.astro";
import Curriculum from "@icons/Curriculum.astro";
import Writing from "@icons/Writing.astro";
import Blog from "@icons/Blog.astro";
import FigLogo from "@icons/FigLogo.astro";

import { routes } from "@ts-config-path/lib/routes";

export const menuEnglish = [
  {
    text: "Home",
    href: routes.home,
    icon: Home,
    exact: true,
  },
  {
    text: "About me",
    href: routes.about,
    icon: Curriculum,
    exact: true,
  },
  {
    text: "Software",
    href: routes.projects,
    icon: Branch,
    exact: true,
  },
  {
    text: "Resources",
    href: routes.resources,
    icon: Writing,
    exact: true,
  },
  {
    text: "Notes",
    href: routes.blog,
    icon: Blog,
    section: true,
  },
  {
    text: "FigurateNum",
    href: routes.figuratenum,
    icon: FigLogo,
    section: true,
  },
];

export const menuSpanish = {
  homeMenu: {
    text: "Inicio",
    href: "/es/",
  },
  projectsMenu: {
    text: "Bibliotecas",
    href: "/es/projects/",
  },
  cvMenu: {
    text: "Acerca de mí",
    href: "/es/about/",
  },
  resourcesMenu: {
    text: "Recursos",
    href: "/es/resources/",
  },
  notesMenu: {
    text: "Notas",
    href: "/blog/",
  },
};
