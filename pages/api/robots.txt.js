// /pages/api/robots.txt.js
export default function handler(req, res) {
  const baseUrl = process.env.NODE_ENV === 'production'
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000';

  res.setHeader('Content-Type', 'text/plain');
  res.write(`User-agent: *
Allow: /

Sitemap: ${baseUrl}/api/sitemap.xml`);
  res.end();
}
