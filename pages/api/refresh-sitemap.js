// /pages/api/refresh-sitemap.js
export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Aquí puedes invalidar el caché o disparar la actualización del sitemap
    res.status(200).json({ message: 'Sitemap refreshed' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
