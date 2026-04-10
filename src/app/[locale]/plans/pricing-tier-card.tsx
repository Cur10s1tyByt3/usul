import { Button } from "@/components/ui/button";
import { Link } from "@/navigation";
import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";

export type PlanFeatureItem = {
  text: string;
  included: boolean;
  /** Optional detail line (e.g. pay-as-you-go rate) shown under the feature title. */
  note?: string;
};

export type PricingTierCardProps = {
  title: string;
  price: string;
  pricePeriod: string;
  /** Shown directly under the price (e.g. monthly token allowance). */
  tokensLine: string;
  summary: string;
  featuresSectionTitle: string;
  featureItems: PlanFeatureItem[];
  cta: string;
  ctaHref: string;
  /** Filled primary CTA (e.g. recommended tier). */
  emphasizeCta?: boolean;
  /** “Recommended” corner badge. */
  popular?: boolean;
  recommendedLabel: string;
};

export function PricingTierCard({
  title,
  price,
  pricePeriod,
  tokensLine,
  summary,
  featuresSectionTitle,
  featureItems,
  cta,
  ctaHref,
  emphasizeCta = false,
  popular = false,
  recommendedLabel,
}: PricingTierCardProps) {
  return (
    <article
      className={cn(
        "border-border/70 bg-card text-card-foreground relative flex h-full flex-col rounded-2xl border p-6 shadow-sm sm:p-8",
        popular &&
          "ring-primary/25 ring-2 ring-offset-2 ring-offset-background",
      )}
    >
      {popular ? (
        <span className="bg-primary text-primary-foreground absolute -top-2.5 right-5 rounded-full px-3 py-1 text-xs font-semibold tracking-wide">
          {recommendedLabel}
        </span>
      ) : null}

      <h3 className="text-sm font-bold tracking-tight">{title}</h3>

      <div className="mt-3 flex flex-wrap items-baseline gap-x-2 gap-y-1">
        <span className="text-foreground text-4xl font-bold tracking-tight">
          {price}
        </span>
        <span className="text-muted-foreground text-sm font-medium">
          {pricePeriod}
        </span>
      </div>

      <p className="text-primary mt-2 text-sm font-semibold tracking-tight">
        {tokensLine}
      </p>

      <Button
        asChild
        className={cn(
          "mt-6 h-11 w-full rounded-full text-sm font-semibold",
          emphasizeCta
            ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-none"
            : "bg-muted text-foreground hover:bg-muted/80 border-border/60 border shadow-none",
        )}
        size="lg"
      >
        <Link href={ctaHref}>{cta}</Link>
      </Button>

      <hr className="border-border/80 my-8" />

      <p className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
        {featuresSectionTitle}
      </p>
      <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
        {summary}
      </p>

      <ul className="mt-6 flex flex-1 flex-col gap-4">
        {featureItems.map((item, index) => (
          <li key={`${index}-${item.text}`} className="flex gap-3">
            <span
              className={cn(
                "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full",
                item.included
                  ? "bg-primary text-primary-foreground"
                  : "border-muted-foreground/35 border-2 bg-transparent",
              )}
              aria-hidden
            >
              {item.included ? (
                <CheckIcon className="size-3 stroke-[3]" strokeLinecap="round" strokeLinejoin="round" />
              ) : null}
            </span>
            <div className="min-w-0 flex-1">
              <span
                className={cn(
                  "text-sm leading-snug",
                  item.included ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {item.text}
              </span>
              {item.note?.trim() ? (
                <p className="text-muted-foreground mt-1 text-xs leading-snug">
                  {item.note}
                </p>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </article>
  );
}
