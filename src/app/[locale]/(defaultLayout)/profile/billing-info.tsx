"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DownloadIcon, ExternalLinkIcon, InfoIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
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

type BillingInfoProps = {
  currentPlanLabel?: string;
};

export default function BillingInfo({ currentPlanLabel }: BillingInfoProps) {
  const t = useTranslations("profile.billing");
  const commonT = useTranslations("common");

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-semibold">{t("section-title")}</h2>

      <div className="mt-6 space-y-1 text-sm">
        <p>
          <span className="text-muted-foreground">{t("current-plan-label")} </span>
          <span>{currentPlanLabel ?? t("current-plan-value")}</span>
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
