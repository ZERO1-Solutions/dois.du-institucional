import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://doisdu.com.br';
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/portfolio', '/sobre', '/contato'],
        disallow: ['/crud-admin', '/api/']
      }
    ],
    sitemap: `${baseUrl}/sitemap.xml`
  };
}
