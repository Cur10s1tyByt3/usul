"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useSession } from "@/lib/auth";
import { navigation } from "@/lib/urls";
import { useTranslations } from "next-intl";
import Link from "next/link";

import ApiInfo from "./api-info";
import BillingInfo from "./billing-info";

type PlanTier = "free" | "starter" | "professional" | "enterprise";

const normalizePlanTier = (value: unknown): PlanTier | null => {
  if (typeof value !== "string") {
    return null;
  }

  const normalized = value.trim().toLowerCase();
  if (normalized.includes("enterprise")) {
    return "enterprise";
  }
  if (normalized.includes("professional") || normalized.includes("pro")) {
    return "professional";
  }
  if (normalized.includes("starter")) {
    return "starter";
  }
  if (normalized.includes("free")) {
    return "free";
  }

  return null;
};

const getPlanFromUser = (user: unknown): PlanTier => {
  if (typeof user !== "object" || user === null) {
    return "free";
  }

  const profile = user as Record<string, unknown>;
  const candidates = [
    profile.plan,
    profile.planName,
    profile.subscriptionPlan,
    profile.tier,
    profile.subscriptionTier,
  ];

  for (const candidate of candidates) {
    const parsed = normalizePlanTier(candidate);
    if (parsed) {
      return parsed;
    }
  }

  return "professional";
};

const getPayAsYouGoPriceKey = (plan: PlanTier) => {
  if (plan === "enterprise") {
    return "pay-as-you-go-price.enterprise";
  }
  if (plan === "professional") {
    return "pay-as-you-go-price.professional";
  }
  if (plan === "starter") {
    return "pay-as-you-go-price.starter";
  }

  return "pay-as-you-go-price.free";
};

function ApiSection({ plan }: { plan: PlanTier }) {
  const t = useTranslations("profile.api-section");
  const billingT = useTranslations("profile.billing");
  const canUsePayAsYouGo = plan === "professional" || plan === "enterprise";
  const [isPayAsYouGoEnabled, setIsPayAsYouGoEnabled] = useState(
    canUsePayAsYouGo,
  );

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-semibold">{t("title")}</h2>

      {canUsePayAsYouGo && (
        <ApiInfo />
      )}

      <div className="mt-4 rounded-lg border p-4">
        <p className="text-sm text-muted-foreground">
          {billingT("consumed-units-label")}
        </p>
        <div className="mt-1 flex flex-wrap items-end gap-2">
          <p className="text-4xl font-semibold tracking-tight">
            {billingT("consumed-units-value")}
          </p>
          <p className="pb-1 text-sm text-muted-foreground">
            / {billingT("total-token-quota-value")}{" "}
            {billingT("total-token-quota-label")}
          </p>
        </div>
      </div>

      {canUsePayAsYouGo && (
        <div className="mt-6 flex items-center justify-between rounded-lg border p-4">
          <div className="space-y-0.5">
            <Label htmlFor="pay-as-you-go-toggle">{billingT("pay-as-you-go-label")}</Label>
            <p className="text-sm text-muted-foreground">
              {t(getPayAsYouGoPriceKey(plan))}
            </p>
          </div>
          <Switch
            id="pay-as-you-go-toggle"
            checked={isPayAsYouGoEnabled}
            onCheckedChange={setIsPayAsYouGoEnabled}
            aria-label={billingT("pay-as-you-go-label")}
          />
        </div>
      )}
    </section>
  );
}

export default function PlanGatedSections() {
  const t = useTranslations("profile");
  const commonT = useTranslations("common");
  const { data, isPending } = useSession();

  if (isPending || !data) {
    return null;
  }

  const plan = getPlanFromUser(data.user);
  const isFree = plan === "free";
  const shouldShowBilling =
    plan === "starter" || plan === "professional" || plan === "enterprise";
  const planLabel = commonT(`plans.${plan}.name`);

  if (isFree) {
    return (
      <section className="mt-10">
        <Button asChild>
          <Link href={navigation.plans()}>{t("subscribe-button")}</Link>
        </Button>
      </section>
    );
  }

  return (
    <>
      <ApiSection plan={plan} />
      {shouldShowBilling && <BillingInfo currentPlanLabel={planLabel} />}
    </>
  );
}
