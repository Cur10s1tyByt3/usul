import Container from "@/components/ui/container";
import { getMetadata } from "@/lib/seo";
import { navigation } from "@/lib/urls";
import { cn } from "@/lib/utils";
import type { Locale } from "next-intl";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import type { PlanFeatureItem } from "./pricing-tier-card";
import { PricingTierCard } from "./pricing-tier-card";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations("meta");

    return getMetadata({
        locale,
        pagePath: navigation.plans(),
        title: t("plans-page.title"),
        description: t("plans-page.description"),
    });
}

export default async function PlansPage({
    params,
}: {
    params: Promise<{ locale: Locale }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);

    const t = await getTranslations({ locale, namespace: "common" });
    const authHref = navigation.login();

    const featuresSectionTitle = t("plans.featuresSectionTitle");
    const recommendedLabel = t("plans.recommended");

    const tiers = [
        {
            title: t("plans.free.name"),
            price: t("plans.free.price"),
            pricePeriod: t("plans.period.perMonth"),
            tokensLine: t("plans.free.tokensLine"),
            summary: t("plans.free.summary"),
            featureItems: t.raw("plans.free.featureItems") as PlanFeatureItem[],
            cta: t("plans.free.cta"),
            ctaHref: authHref,
            emphasizeCta: false,
            popular: false,
        },
        {
            title: t("plans.starter.name"),
            price: t("plans.starter.price"),
            pricePeriod: t("plans.period.perMonth"),
            tokensLine: t("plans.starter.tokensLine"),
            summary: t("plans.starter.summary"),
            featureItems: t.raw("plans.starter.featureItems") as PlanFeatureItem[],
            cta: t("plans.starter.cta"),
            ctaHref: authHref,
            emphasizeCta: false,
            popular: false,
        },
        {
            title: t("plans.professional.name"),
            price: t("plans.professional.price"),
            pricePeriod: t("plans.period.perMonth"),
            tokensLine: t("plans.professional.tokensLine"),
            summary: t("plans.professional.summary"),
            featureItems: t.raw(
                "plans.professional.featureItems",
            ) as PlanFeatureItem[],
            cta: t("plans.professional.cta"),
            ctaHref: authHref,
            emphasizeCta: true,
            popular: true,
        },
        {
            title: t("plans.enterprise.name"),
            price: t("plans.enterprise.price"),
            pricePeriod: t("plans.period.perMonth"),
            tokensLine: t("plans.enterprise.tokensLine"),
            summary: t("plans.enterprise.summary"),
            featureItems: t.raw("plans.enterprise.featureItems") as PlanFeatureItem[],
            cta: t("plans.enterprise.cta"),
            ctaHref: authHref,
            emphasizeCta: false,
            popular: false,
        },
    ];

    return (
        <Container className="py-26 md:pt-36">
            <header className="mx-auto mb-14 max-w-2xl text-center">
                <h1 className="text-foreground text-4xl font-bold tracking-tight sm:text-5xl">
                    {t("plans.title")}
                </h1>
                <p className="text-muted-foreground mt-4 text-lg text-pretty">
                    {t("plans.subtitle")}
                </p>
            </header>

            <div
                className={cn(
                    "mx-auto grid max-w-6xl gap-6",
                    "sm:grid-cols-2 xl:grid-cols-4",
                )}
            >
                {tiers.map((tier) => (
                    <PricingTierCard
                        key={tier.title}
                        {...tier}
                        featuresSectionTitle={featuresSectionTitle}
                        recommendedLabel={recommendedLabel}
                    />
                ))}
            </div>
        </Container>
    );
}
