import Image from "next/image";
import LeftBG from "../../../public/assets/images/auth/left-background.png";
import LogoBg from "../../../public/assets/images/logo.png";
import { useTranslation } from "@/app/i18n/client";
import "./index.scss";
import { motion } from "framer-motion";
const Logo = () => {
  const { t } = useTranslation();

  return (
    <div className="logo-div">
      <motion.div
        initial={{ opacity: 0.5, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <Image
          className="left-bg"
          src={LeftBG}
          alt={t("loginPageLeftLogoAlt")}
        />
      </motion.div>
      <div className="logo-bg-div">
        <motion.div initial={{ y: -20 }} animate={{ y: 0 }} className="logo">
          <Image
            className="logo-bg"
            src={LogoBg}
            alt={t("loginPageLeftLogoAlt")}
          />
        </motion.div>
      </div>
    </div>
  );
};
export default Logo;
