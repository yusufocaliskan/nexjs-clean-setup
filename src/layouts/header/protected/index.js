"use client";
import React from "react";
import "./index.scss";
import { useTranslation } from "@/app/i18n/client";
import { useRouter } from "next/navigation";
import Logo from "../../../components/Icons/Logo";
import MobileLogo from "../../../components/Icons/MobileLogo";
import HepbitLabel from "@/components/Icons/Hepbit";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { CoolButton } from "@/components";
import HamburgerIcon from "@/components/Icons/HamburgerIcon";
import UserIcon from "@/components/Icons/UserIcon";
import LightningIcon from "@/components/Icons/LightningIcon";
import NotificationBellIcon from "@/components/Icons/NotificationBellIcon";

const ProtectedHeader = () => {
  const router = useRouter();
  const { t } = useTranslation();

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
            <LightningIcon />
          </div>
          <div className="header-language">
            <NotificationBellIcon />
          </div>
          <div className="header-buttons">
            <CoolButton
              type="Small"
              onClick={() => router.push("/auth/login")}
              label={t("protectedHeaderWallet")}
            />
          </div>
          <div className="header-language">
            <ThemeSwitcher />
          </div>
          <div className="header-language">
            <UserIcon />
          </div>
        </div>
      </div>
      <div className="mobile">
        <div className="mobile-hepbit">
          <MobileLogo />
        </div>
        <div className="mobile-menu">
          <NotificationBellIcon />
          <UserIcon />
          <HamburgerIcon />
        </div>
      </div>
    </>
  );
};

export default ProtectedHeader;
