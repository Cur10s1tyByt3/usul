import type { Locale } from "next-intl";
import Container from "@/components/ui/container";
import { getMetadata } from "@/lib/seo";
import { navigation } from "@/lib/urls";
import { getTranslations } from "next-intl/server";

import EditUser from "./edit-user";
import ApiInfo from "./api-info";
import BillingInfo from "./billing-info";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) => {
  const { locale } = await params;
  const t = await getTranslations("meta");

  return getMetadata({
    locale,
    pagePath: navigation.profile(),
    title: t("profile-page.title"),
    description: t("profile-page.description"),
  });
};

export default function ProfilePage() {
  return (
    <Container className="max-w-4xl pt-8 lg:pt-12 2xl:max-w-4xl">
      <EditUser />
      <div className="mt-10">
        <ApiInfo />
      </div>
      <BillingInfo />
    </Container>
  );
}
