"use client";

import { useState } from "react";
import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";
import type { PlanKey } from "@/lib/stripe";
import { CheckoutButton } from "./CheckoutButton";

type Props = {
  locale: Locale;
  signedIn: boolean;
};

export function PricingPlans({ locale, signedIn }: Props) {
  const [interval, setInterval] = useState<"month" | "year">("month");
  const [libraryChoice, setLibraryChoice] = useState<"primary" | "secondary">(
    "primary"
  );

  const basicPlan: PlanKey =
    interval === "month" ? "basic_monthly" : "basic_yearly";
  const proPlan: PlanKey = interval === "month" ? "pro_monthly" : "pro_yearly";
  const basicPrice = interval === "month" ? 98 : 980;
  const proPrice = interval === "month" ? 148 : 1280;
  const per = interval === "month" ? t(locale, "perMonth") : t(locale, "perYear");

  return (
    <div className="pricing-block">
      <div className="interval-toggle" role="group" aria-label="Billing interval">
        <button
          type="button"
          className={interval === "month" ? "active" : ""}
          onClick={() => setInterval("month")}
        >
          {t(locale, "monthly")}
        </button>
        <button
          type="button"
          className={interval === "year" ? "active" : ""}
          onClick={() => setInterval("year")}
        >
          {t(locale, "yearly")}
          <span className="save-tag">{t(locale, "saveYearly")}</span>
        </button>
      </div>

      <div className="pricing-grid">
        <article className="price-card">
          <h2>{t(locale, "freePlan")}</h2>
          <p className="price">
            <span className="amount">0</span>
            <span className="currency">{t(locale, "hkd")}</span>
          </p>
          <p className="plan-desc">{t(locale, "freeDesc")}</p>
          <a href="/library" className="btn btn-ghost">
            {t(locale, "ctaBrowse")}
          </a>
        </article>

        <article className="price-card">
          <h2>{t(locale, "basicPlan")}</h2>
          <p className="price">
            <span className="amount">{basicPrice}</span>
            <span className="currency">
              {t(locale, "hkd")}
              {per}
            </span>
          </p>
          <p className="plan-desc">{t(locale, "basicDesc")}</p>
          <fieldset className="lib-choice">
            <legend>{t(locale, "chooseLibrary")}</legend>
            <label>
              <input
                type="radio"
                name="lib"
                checked={libraryChoice === "primary"}
                onChange={() => setLibraryChoice("primary")}
              />
              {t(locale, "primaryLib")}
            </label>
            <label>
              <input
                type="radio"
                name="lib"
                checked={libraryChoice === "secondary"}
                onChange={() => setLibraryChoice("secondary")}
              />
              {t(locale, "secondaryLib")}
            </label>
          </fieldset>
          <CheckoutButton
            locale={locale}
            plan={basicPlan}
            libraryChoice={libraryChoice}
            signedIn={signedIn}
            label={t(locale, "ctaSubscribe")}
          />
        </article>

        <article className="price-card featured">
          <h2>{t(locale, "proPlan")}</h2>
          <p className="price">
            <span className="amount">{proPrice}</span>
            <span className="currency">
              {t(locale, "hkd")}
              {per}
            </span>
          </p>
          <p className="plan-desc">{t(locale, "proDesc")}</p>
          <CheckoutButton
            locale={locale}
            plan={proPlan}
            signedIn={signedIn}
            label={t(locale, "ctaTrial")}
            className="btn btn-primary"
          />
        </article>
      </div>
    </div>
  );
}
