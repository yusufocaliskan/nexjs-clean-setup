import { WelcomeScreen } from "@/screens";

//server side rendring transltion
import { useTranslation } from "@/app/i18n";

//Client side
//use this when needed. (using async is not neccessary)
//import { useTranslation } from "@/app/i18n/client";

import "./globals.css";

const Home = async ({ params: { lng } }) => {
  const { t } = await useTranslation(lng);
  return <WelcomeScreen t={t} />;
};
export default Home;
