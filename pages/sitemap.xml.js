import { getSitemapProps } from '@faustwp/core';

export default function Sitemap() {}

export function getServerSideProps(ctx) {
  return getSitemapProps(ctx, {
    frontendUrl: 'https://www.casaselvaggio.com',
		sitemapPathsToIgnore: ['/wp-sitemap-users-*', '/author-sitemap.xml'],
  });
}