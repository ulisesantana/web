export const SITE = {
  website: "https://ulisesantana.dev/", // replace this with your deployed domain
  author: "Ulises Santana",
  profile: "https://ulisesantana.dev/",
  desc: "Full Stack Developer with JavaScript as mother tongue and web as my home nation. Based in the Canary Islands 🏝️.",
  title: "Ulises Santana",
  ogImage: "favicon.png", // default image for meta tags
  lightAndDarkMode: true,
  postPerIndex: 4,
  postPerPage: 10,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showArchives: false,
  showBackButton: true, // show back button in post detail
  dynamicOgImage: true,
  lang: "en", // html lang code. Set this empty and default will be "en"
  timezone: "Europe/London", // Default global timezone (IANA format) https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
} as const;
