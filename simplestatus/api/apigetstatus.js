import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();

export default async function handler(req, res) {
  try {
    const status = (await redis.get('status')) || 'frei';
    res.status(200).json({ status });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}