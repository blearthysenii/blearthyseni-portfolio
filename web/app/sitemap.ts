import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://blearthyseni.com";
  const now = new Date();

  return [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },

    // English
    {
      url: `${baseUrl}/en`,
      lastModified: now,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/en/about`,
      lastModified: now,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/en/projects`,
      lastModified: now,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/en/experience`,
      lastModified: now,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/en/contact`,
      lastModified: now,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/en/resume`,
      lastModified: now,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/en/skills`,
      lastModified: now,
      priority: 0.8,
    },

    // Albanian
    {
      url: `${baseUrl}/al`,
      lastModified: now,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/al/rreth-meje`,
      lastModified: now,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/al/projektet`,
      lastModified: now,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/al/eksperienca`,
      lastModified: now,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/al/kontakti`,
      lastModified: now,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/al/cv`,
      lastModified: now,
      priority: 0.8,
    },
  ];
}
