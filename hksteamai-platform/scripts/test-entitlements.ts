import { effectiveEntitlement, canAccessModule } from "../src/lib/entitlements";

const future = new Date(Date.now() + 86400000);
const past = new Date(Date.now() - 86400000);

const cases: [string, string, string][] = [
  [
    "trialing",
    effectiveEntitlement({
      entitlement: "all",
      status: "trialing",
      trialEndsAt: future,
      currentPeriodEnd: null,
    }),
    "all",
  ],
  [
    "expired soft downgrade",
    effectiveEntitlement({
      entitlement: "all",
      status: "trialing",
      trialEndsAt: past,
      currentPeriodEnd: null,
    }),
    "free",
  ],
  [
    "active pro",
    effectiveEntitlement({
      entitlement: "all",
      status: "active",
      trialEndsAt: null,
      currentPeriodEnd: null,
    }),
    "all",
  ],
];

let failed = 0;
for (const [name, got, want] of cases) {
  const ok = got === want;
  console.log(`${ok ? "OK" : "FAIL"} ${name}: ${got} (want ${want})`);
  if (!ok) failed++;
}

const primaryOk = canAccessModule("primary", "Primary_School/Math/01/index.html").allowed;
const secondaryBlocked = !canAccessModule(
  "primary",
  "Secondary_School/Math/01/index.html"
).allowed;
console.log(`${primaryOk ? "OK" : "FAIL"} basic primary access`);
console.log(`${secondaryBlocked ? "OK" : "FAIL"} basic blocks secondary`);
if (!primaryOk || !secondaryBlocked) failed++;

process.exit(failed ? 1 : 0);
