import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://lucianofficial.vercel.app";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/services/confirmation"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
