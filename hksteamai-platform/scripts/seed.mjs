/**
 * Seed admin + optional demo parent. Run: npm run db:seed
 * Requires DATABASE_URL (Postgres). Load via .env or:
 *   $env:DATABASE_URL=...; npm run db:seed
 */
import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { PrismaClient } from "../src/generated/prisma/index.js";

const url = process.env.DATABASE_URL;
if (!url || url.startsWith("file:")) {
  console.error(
    "DATABASE_URL must be a Postgres connection string (Neon/Supabase/Vercel).",
  );
  process.exit(1);
}

const pool = new Pool({ connectionString: url, max: 3 });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const adminEmail = (process.env.ADMIN_EMAIL || "admin@hksteamai.com").toLowerCase();
  const adminPass = process.env.ADMIN_PASSWORD || "change-me-in-production";
  if (
    !adminEmail.includes("@") ||
    adminEmail.includes("[sensitive]") ||
    adminPass.toLowerCase() === "[sensitive]"
  ) {
    console.error(
      "ADMIN_EMAIL/ADMIN_PASSWORD look invalid (env pull may have redacted them). Set real values before seeding.",
    );
    process.exit(1);
  }
  const hash = await bcrypt.hash(adminPass, 10);
  const parsedTrial = Number(process.env.TRIAL_DAYS || 7);
  const trialDays = Number.isFinite(parsedTrial) && parsedTrial > 0 ? parsedTrial : 7;

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: { passwordHash: hash, role: "admin" },
    create: {
      email: adminEmail,
      passwordHash: hash,
      name: "Admin",
      role: "admin",
      locale: "zh-HK",
    },
  });

  await prisma.subscription.upsert({
    where: { userId: admin.id },
    update: { entitlement: "all", status: "active", plan: "pro_yearly" },
    create: {
      userId: admin.id,
      entitlement: "all",
      status: "active",
      plan: "pro_yearly",
    },
  });

  const demoEmail = "parent@example.com";
  const demoHash = await bcrypt.hash("demo1234", 10);
  const parent = await prisma.user.upsert({
    where: { email: demoEmail },
    update: {},
    create: {
      email: demoEmail,
      passwordHash: demoHash,
      name: "Demo Parent",
      role: "parent",
      locale: "en",
    },
  });

  const trialEnds = new Date(Date.now() + trialDays * 24 * 60 * 60 * 1000);
  await prisma.subscription.upsert({
    where: { userId: parent.id },
    update: {
      entitlement: "all",
      status: "trialing",
      trialEndsAt: trialEnds,
      plan: null,
    },
    create: {
      userId: parent.id,
      entitlement: "all",
      status: "trialing",
      trialEndsAt: trialEnds,
    },
  });

  await prisma.childProfile.deleteMany({ where: { userId: parent.id } });
  await prisma.childProfile.create({
    data: { userId: parent.id, name: "Alex", gradeHint: "Grade 4 / P4" },
  });

  await prisma.featureFlag.upsert({
    where: { key: "free_catalog_override" },
    update: {},
    create: { key: "free_catalog_override", value: "[]" },
  });

  console.log("Seeded admin:", adminEmail);
  console.log("Seeded demo parent: parent@example.com / demo1234 (Pro trial)");
}

main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });
