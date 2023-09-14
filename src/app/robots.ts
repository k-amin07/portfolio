import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/','/server_forms/'],
    },
    sitemap: `${process.env.SITE_URL}/sitemap.xml`,
  }
}