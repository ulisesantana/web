import type { CollectionEntry } from "astro:content";
import { SITE } from "@/config";

export const postFilter = ({ data }: CollectionEntry<"blog">) => {
  const isPublishTimePassed =
    Date.now() >
    new Date(data.pubDatetime).getTime() - SITE.scheduledPostMargin;
  if (import.meta.env.DEV) return true;
  return !data.draft && isPublishTimePassed;
};

export default postFilter;
