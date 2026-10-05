import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { status } = req.body || {};
  if (!status || (status !== 'frei' && status !== 'besetzt')) {
    return res.status(400).json({ error: 'Ungültiger Status' });
  }

  try {
    await redis.set('status', status);
    res.status(200).json({ success: true, status });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}