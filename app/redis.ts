import { Redis } from "@upstash/redis";

if (!process.env.KV_KV_REST_API_URL || !process.env.KV_KV_REST_API_TOKEN) {
  throw new Error("As variáveis UPSTASH_REDIS_REST_URL e UPSTASH_REDIS_REST_TOKEN não estão definidas.");
}

export const redis = new Redis({
  url: process.env.KV_KV_REST_API_URL!,
  token: process.env.KV_KV_REST_API_TOKEN!,
});