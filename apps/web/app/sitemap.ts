import type { MetadataRoute } from "next";
import { tutorials } from "@/data/tutorials";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://ejischool.com";
  const routes = ["", "/references", "/exercises", "/certificates", "/playground", "/dashboard", "/pricing", "/blog", "/community", "/login"];

  return [
    ...routes.map((route) => ({
      url: `${base}${route}`,
      lastModified: new Date()
    })),
    ...tutorials.map((tutorial) => ({
      url: `${base}/tutorials/${tutorial.slug}`,
      lastModified: new Date()
    }))
  ];
}
