import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma";
import { Pool } from "pg";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
  pgPool?: Pool;
};

function createClient(): PrismaClient {
  const url = process.env.DATABASE_URL;
  if (!url || url.startsWith("file:")) {
    throw new Error(
      "DATABASE_URL must be a Postgres connection string (Neon/Supabase/Vercel). SQLite file: URLs are not supported in production.",
    );
  }

  const pool =
    globalForPrisma.pgPool ??
    new Pool({
      connectionString: url,
      max: 5,
      idleTimeoutMillis: 10_000,
      connectionTimeoutMillis: 10_000,
    });

  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.pgPool = pool;
  }

  const adapter = new PrismaPg(pool);
  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });
}

/** Lazy so `next build` can compile routes that import this module before runtime. */
export const prisma: PrismaClient = new Proxy({} as PrismaClient, {
  get(_target, prop, receiver) {
    const client = globalForPrisma.prisma ?? createClient();
    if (process.env.NODE_ENV !== "production") {
      globalForPrisma.prisma = client;
    }
    const value = Reflect.get(client, prop, receiver);
    return typeof value === "function" ? value.bind(client) : value;
  },
});
