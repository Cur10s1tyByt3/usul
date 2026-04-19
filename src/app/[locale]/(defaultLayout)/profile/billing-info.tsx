"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DownloadIcon, ExternalLinkIcon, InfoIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useState } from "react";
import { navigation } from "@/lib/urls";

type InvoiceStatus = "draft" | "paid" | "void";

type Invoice = {
  date: string;
  status: InvoiceStatus;
  subscription: string;
  usage: string;
  total: string;
};

const invoices: Invoice[] = [
  {
    date: "2026-Apr-14",
    status: "draft",
    subscription: "$29.00",
    usage: "$119.55",
    total: "$148.55",
  },
  {
    date: "2026-Mar-17",
    status: "paid",
    subscription: "$198.40",
    usage: "$0.00",
    total: "$198.40",
  },
  {
    date: "2026-Mar-17",
    status: "void",
    subscription: "$0.00",
    usage: "$0.00",
    total: "$0.00",
  },
];

const statusBadgeClassName: Record<InvoiceStatus, string> = {
  draft: "bg-secondary text-secondary-foreground",
  paid: "bg-green-700 text-white",
  void: "bg-muted text-muted-foreground",
};

export default function BillingInfo() {
  const t = useTranslations("profile.billing");
  const commonT = useTranslations("common");
  const [isPayAsYouGoEnabled, setIsPayAsYouGoEnabled] = useState(true);

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-semibold">{t("title")}</h2>

      <div className="mt-4 rounded-lg border p-4">
        <p className="text-sm text-muted-foreground">{t("consumed-units-label")}</p>
        <div className="mt-1 flex flex-wrap items-end gap-2">
          <p className="text-4xl font-semibold tracking-tight">{t("consumed-units-value")}</p>
          <p className="pb-1 text-sm text-muted-foreground">
            / {t("total-token-quota-value")} {t("total-token-quota-label")}
          </p>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between rounded-lg border p-4">
        <div className="space-y-0.5">
          <Label htmlFor="pay-as-you-go-toggle">{t("pay-as-you-go-label")}</Label>
          <p className="text-sm text-muted-foreground">
            {isPayAsYouGoEnabled
              ? t("pay-as-you-go-enabled")
              : t("pay-as-you-go-disabled")}
          </p>
        </div>
        <Switch
          id="pay-as-you-go-toggle"
          checked={isPayAsYouGoEnabled}
          onCheckedChange={setIsPayAsYouGoEnabled}
          aria-label={t("pay-as-you-go-label")}
        />
      </div>

      <div className="mt-6 space-y-1 text-sm">
        <p>
          <span className="text-muted-foreground">{t("current-plan-label")} </span>
          <span>{t("current-plan-value")}</span>
        </p>
        <p>
          <span className="text-muted-foreground">{t("billing-period-label")} </span>
          <span>{t("billing-period-value")}</span>
        </p>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <Button type="button" variant="outline">
          {t("change-plan")}
        </Button>
        <Button type="button" variant="outline">
          {t("update-billing-details")}
        </Button>
        <Button type="button" variant="destructive">
          {t("cancel-subscription")}
        </Button>
        <Link href={navigation.plans()}>
          <Button type="button" variant="outline">
            {t("compare-plans")}
          </Button>
        </Link>
      </div>

      <div className="mt-10 overflow-hidden rounded-lg border">
        <div className="border-b p-4">
          <h3 className="font-semibold">{t("invoice-history-title")}</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left text-muted-foreground">
                <th className="px-4 py-3 font-medium">{t("table.date")}</th>
                <th className="px-4 py-3 font-medium">{t("table.status")}</th>
                <th className="px-4 py-3 font-medium">{t("table.subscription")}</th>
                <th className="px-4 py-3 font-medium">
                  <span className="inline-flex items-center gap-1">
                    {t("table.usage")}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          type="button"
                          className="inline-flex items-center text-muted-foreground hover:text-foreground"
                        >
                          <InfoIcon className="size-3.5" />
                          <span className="sr-only">{t("table.usage-note")}</span>
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>{t("table.usage-note")}</TooltipContent>
                    </Tooltip>
                  </span>
                </th>
                <th className="px-4 py-3 font-medium">{t("table.total")}</th>
                <th className="px-4 py-3 font-medium">{t("table.actions")}</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice, index) => (
                <tr key={`${invoice.date}-${index}`} className="border-b last:border-b-0">
                  <td className="px-4 py-3">{invoice.date}</td>
                  <td className="px-4 py-3">
                    <Badge
                      shape="pill"
                      className={statusBadgeClassName[invoice.status]}
                    >
                      {t(`status.${invoice.status}`)}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">{invoice.subscription}</td>
                  <td className="px-4 py-3">{invoice.usage}</td>
                  <td className="px-4 py-3">{invoice.total}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <span className="inline-flex items-center gap-1">
                        <ExternalLinkIcon className="size-3.5" />
                        {commonT("view")}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <DownloadIcon className="size-3.5" />
                        {commonT("pdf")}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
