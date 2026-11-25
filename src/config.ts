// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = "Edgar Delgado Vega | Creative Math Systems Developer";
export const SITE_DESCRIPTION =
  "I develop creative systems that merge mathematics, computation, and music through structural analogies. All for real-time algorithmic composition, my current projects include modular forms (SageMath/LMFDB-inspired) and multidimensional figurate number libraries with over 26,000 downloads, as well as ts-tonnetz. I have published a Scopus-indexed article in Mathematical Music Theory, serve as a peer reviewer for The European Physical Journal Special Topics, contribute to international open-source projects, and teach postgraduate courses.";

export const SITE_URL = "https://edelveart.github.io/";
export const GENERATE_SLUG_FROM_TITLE = true;
export const TRANSITION_API = true;

export const SOCIAL_MEDIA = {
  LinkedIn: "https://www.linkedin.com/in/edgararmandodelgadovega/?locale=en_US",
  GitHub: "https://github.com/edelveart",
  YouTube: "https://www.youtube.com/@edelve_math_code",
  RSS: "/rss.xml",
  // Instagram: "https://www.instagram.com/edgardelgadovega/",
};

export const metadataLinks = Object.entries(SOCIAL_MEDIA).map(([label, href]) => ({
  label,
  href,
}));
