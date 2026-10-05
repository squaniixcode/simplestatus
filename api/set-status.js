export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { status } = req.body || {};
  if (!status || (status !== 'frei' && status !== 'besetzt')) {
    return res.status(400).json({ error: 'Ungültiger Status' });
  }

  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    return res.status(500).json({ error: 'Datenbank-Zugangsdaten fehlen.' });
  }

  try {
    await fetch(`${url}/set/status/${status}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    res.status(200).json({ success: true, status });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
