"use client";
import React from "react";
import "./index.scss";
import { useTranslation } from "@/app/i18n/client";
import { usePathname, useRouter } from "next/navigation";
import Logo from "../../../components/Icons/Logo";
import MobileLogo from "../../../components/Icons/MobileLogo";
import HepbitLabel from "@/components/Icons/Hepbit";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { CoolButton } from "@/components";
import HamburgerIcon from "@/components/Icons/HamburgerIcon";

const PublicHeader = () => {
  const path = usePathname();
  const lang = path.substring(1).split("/")[0];
  const router = useRouter();
  const { t } = useTranslation(lang);

  return (
    <>
      <div className="container-lg">
        <div className="header-left">
          <div className="header-logo">
            <Logo /> <HepbitLabel />
          </div>
          <div className="header-divider"></div>
          <div className="header-nav">
            <div className="header-menu-item"> {t("publicHeaderExchange")}</div>
            <div className="header-menu-item-buy">
              {t("publicHeaderBuyCrypto")}
            </div>
            <div className="header-menu-item"> {t("publicHeaderMarket")}</div>
            <div className="header-menu-item"> {t("publicHeaderDiscover")}</div>
          </div>
        </div>
        <div className="header-right">
          <div className="header-language">
            <LanguageSwitcher />
          </div>
          <div className="header-language">
            <ThemeSwitcher />
          </div>
          <div className="header-buttons">
            <CoolButton
              type="Main&Small"
              onClick={() => router.push("/auth/register")}
              label={t("publicHeaderSignUp")}
            />
            <CoolButton
              type="Small"
              onClick={() => router.push("/auth/login")}
              label={t("publicHeaderLogin")}
            />
          </div>
        </div>
      </div>
      <div className="mobile">
        <div className="mobile-hepbit">
          <MobileLogo />
        </div>
        <div>
          <HamburgerIcon />
        </div>
      </div>
    </>
  );
};

export default PublicHeader;
