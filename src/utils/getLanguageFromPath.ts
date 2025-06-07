import type { Language } from "@/types";

/**
 * Gets the locale ("en" or "es") from the path or the Astro object.
 * If the path starts with "/es", returns "es". Otherwise, returns "en".
 * @param pathname string | AstroGlobal - pathname of the URL or the Astro object
 * @returns Language "en" or "es"
 */
export function getLanguageFromPath(pathname: string): Language {
  return pathname.startsWith("/es") ? "es" : "en";
}

