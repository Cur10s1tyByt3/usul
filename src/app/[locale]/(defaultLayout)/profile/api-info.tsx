"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { API_DOCS_URL } from "@/lib/constants";
import {
  CopyIcon,
  EyeIcon,
  EyeOffIcon,
  ExternalLinkIcon,
  RefreshCwIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

const generateApiKey = () => {
  return `usul_${crypto.randomUUID().replaceAll("-", "")}`;
};

export default function ApiInfo() {
  const t = useTranslations("profile.api-key");
  const commonT = useTranslations("common");
  const [isVisible, setIsVisible] = useState(false);
  const [apiKey, setApiKey] = useState(generateApiKey);
  const [isRegenerateDialogOpen, setIsRegenerateDialogOpen] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(apiKey);
      toast.success(t("copy-success"));
    } catch {
      toast.error(t("copy-error"));
    }
  };

  const handleRegenerate = () => {
    setApiKey(generateApiKey());
    toast.success(t("regenerate-success"));
  };

  return (
    <div className="mt-10 flex max-w-xl flex-col gap-2">
      <Label htmlFor="api-key">{t("label")}</Label>
      <div className="relative">
        <Input
          id="api-key"
          type={isVisible ? "text" : "password"}
          value={apiKey}
          disabled
          className="pr-28"
        />

        <div className="absolute top-1/2 right-1 flex -translate-y-1/2 items-center">
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="size-7"
            onClick={() => setIsVisible((previous) => !previous)}
            tooltip={
              isVisible
                ? t("hide")
                : t("show")
            }
          >
            {isVisible ? (
              <EyeOffIcon className="size-4" />
            ) : (
              <EyeIcon className="size-4" />
            )}
          </Button>

          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="size-7"
            onClick={handleCopy}
            tooltip={t("copy")}
          >
            <CopyIcon className="size-4" />
          </Button>

          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="size-7"
            onClick={() => setIsRegenerateDialogOpen(true)}
            tooltip={t("regenerate")}
          >
            <RefreshCwIcon className="size-4" />
          </Button>
        </div>
      </div>

      <div className="mt-2">
        <Button type="button" variant="outline" className="gap-2" asChild>
          <a href={API_DOCS_URL} target="_blank" rel="noreferrer">
            {t("docs")}
            <ExternalLinkIcon className="size-4" />
          </a>
        </Button>
      </div>

      <Dialog
        open={isRegenerateDialogOpen}
        onOpenChange={setIsRegenerateDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t.raw("regenerate-confirm-title")}</DialogTitle>
            <DialogDescription>
              {t.raw("regenerate-confirm-description")}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsRegenerateDialogOpen(false)}
            >
              {commonT("cancel")}
            </Button>
            <Button
              type="button"
              onClick={() => {
                handleRegenerate();
                setIsRegenerateDialogOpen(false);
              }}
            >
              {t.raw("regenerate-confirm-button")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
