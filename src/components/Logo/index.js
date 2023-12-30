import Image from "next/image";
import LeftBG from "../../../public/assets/images/auth/left-background.png";
import LogoBg from "../../../public/assets/images/logo.png";
import { useTranslation } from "@/app/i18n/client";
import { usePathname, useSearchParams } from "next/navigation";
import "./index.scss";

const Logo = () => {
  const path = usePathname();
  const lang = path.substring(1).split("/")[0];
  const { t } = useTranslation(lang);

  return (
    <div className="logo-div">
      <Image className="left-bg" src={LeftBG} alt={t("loginPageLeftLogoAlt")} />{" "}
      <div className="logo-bg-div">
        <div className="logo">
          <Image
            className="logo-bg"
            src={LogoBg}
            alt={t("loginPageLeftLogoAlt")}
          />
        </div>
      </div>
    </div>
  );
};
export default Logo;
