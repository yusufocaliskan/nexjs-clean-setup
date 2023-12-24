import { WelcomeScreen } from "@/screens";
import { useTranslation } from "@/app/i18n";
import "./globals.css";
const Home = async ({ params: { lng } }) => {
  console.log("Here", lng);
  const { t } = await useTranslation(lng);
  return <>{t("welcome_slogan")}</>;
};
export default Home;
