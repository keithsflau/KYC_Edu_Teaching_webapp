/**
 * In-memory sliding-window rate limiter (MVP).
 * For multi-instance / Workers production, replace with Durable Object or KV.
 */

type Bucket = { timestamps: number[] };

const buckets = new Map<string, Bucket>();

export type RateLimitResult = {
  ok: boolean;
  remaining: number;
  resetMs: number;
};

export function rateLimit(
  key: string,
  limit: number,
  windowMs: number
): RateLimitResult {
  const now = Date.now();
  let bucket = buckets.get(key);
  if (!bucket) {
    bucket = { timestamps: [] };
    buckets.set(key, bucket);
  }
  bucket.timestamps = bucket.timestamps.filter((t) => now - t < windowMs);
  if (bucket.timestamps.length >= limit) {
    const oldest = bucket.timestamps[0] ?? now;
    return {
      ok: false,
      remaining: 0,
      resetMs: Math.max(0, windowMs - (now - oldest)),
    };
  }
  bucket.timestamps.push(now);
  return {
    ok: true,
    remaining: Math.max(0, limit - bucket.timestamps.length),
    resetMs: windowMs,
  };
}

/** Module HTML fetches: 60 / minute per identity */
export function limitModuleFetch(identity: string): RateLimitResult {
  return rateLimit(`mod:${identity}`, 60, 60_000);
}

/** Signed-URL minting: 20 / minute per user */
export function limitSignedMint(identity: string): RateLimitResult {
  return rateLimit(`sig:${identity}`, 20, 60_000);
}
