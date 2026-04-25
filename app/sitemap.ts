import type { MetadataRoute } from 'next'

export const dynamic = 'force-static';

// ✅ Fixed: use env var so production URL is configurable without code changes
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://test-app.vercel.app'

const locales = ['en', 'fr', 'nl']

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = locales.map((locale) => ({
    url: `${baseUrl}/${locale}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    ...routes,
  ]
}
