import type { MetadataRoute } from 'next'

export const dynamic = 'force-static';

// ✅ Fixed: use env var so production URL is configurable without code changes
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://test-app.vercel.app'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
