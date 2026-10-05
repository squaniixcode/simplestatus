export default async function handler(req, res) {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    return res.status(500).json({ error: 'Datenbank-Zugangsdaten fehlen in Vercel.' });
  }

  try {
    const response = await fetch(`${url}/get/status`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await response.json();
    const status = data.result || 'frei';
    
    res.status(200).json({ status });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}