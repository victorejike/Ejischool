import type { Metadata } from "next";

const siteUrl = "https://ejischool.com";

export function pageMetadata(title: string, description: string, path = "/"): Metadata {
  const url = `${siteUrl}${path}`;

  return {
    title,
    description,
    alternates: {
      canonical: url
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "EJISCHOOL",
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title,
      description
    }
  };
}
