import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://maystine.vercel.app', lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: 'https://maystine.vercel.app/addons', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: 'https://maystine.vercel.app/parcours', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: 'https://maystine.vercel.app/coaching', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ]
}
