const { withFaust, getWpHostname } = require('@faustwp/core');

/**
 * @type {import('next').NextConfig}
 **/
module.exports = withFaust({
  reactStrictMode: true,
  sassOptions: {
    includePaths: ['node_modules'],
  },
  images: {
    domains: [getWpHostname(), 'wordpress-1203663-4858040.cloudwaysapps.com', 'casaselvaggio.com', 'www.casaselvaggio.com'],
  },
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.casaselvaggio.com',
          },
        ],
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/sitemap.xml',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/xml',
          },
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=86400, stale-while-revalidate',
          },
        ],
      },
      {
        source: '/sitemap-wordpress.xml',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/xml',
          },
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=86400, stale-while-revalidate',
          },
        ],
      },
      {
        source: '/sitemap-pages.xml',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/xml',
          },
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=86400, stale-while-revalidate',
          },
        ],
      },
      {
        source: '/sitemap-dynamic.xml',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/xml',
          },
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=3600, stale-while-revalidate',
          },
        ],
      },
      {
        source: '/sitemap-posts.xml',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/xml',
          },
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=3600, stale-while-revalidate',
          },
        ],
      },
    ];
  },
});
