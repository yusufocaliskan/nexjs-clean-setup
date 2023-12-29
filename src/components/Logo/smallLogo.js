import Logo from "../../components/Icons/Logo";
import { useTranslation } from "@/app/i18n/client";
import { usePathname, useSearchParams } from "next/navigation";
import "./index.scss";

const SmallLogo = () => {
    const path = usePathname();
    const lang = path.substring(1).split("/")[0];
    const { t } = useTranslation(lang);
  
  return (
    <div className="small-logo-div">
      <Logo /> <p className="hepbit">{t("loginPageHepBit")}</p>
    </div>
  );
};

export default SmallLogo;
