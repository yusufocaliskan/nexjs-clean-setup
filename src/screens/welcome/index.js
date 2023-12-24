import { useTranslation } from "@/app/i18n";

const Welcome = async ({ lng }) => {
  console.log(lng);
  const { t } = await useTranslation(lng);
  return <>{t("welcome_slogan")}</>;
};

export default Welcome;
