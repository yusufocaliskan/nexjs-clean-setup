import { useTranslation } from "@/app/i18n/client";

const Welcome = ({ t }) => {
  return <>{t("welcome_slogan")}</>;
};

export default Welcome;
