import { TextBox, Title } from "@/components";
import React, { useState } from "react";
import "./index.scss";
import RightArrowIcon from "@/components/Icons/RightArrowIcon";
import Logo from "../../../components/Icons/Logo";
import SubmitInput from "@/components/input/submitInput";
import FBIcon from "@/components/Icons/FBIcon";
import TwitterIcon from "@/components/Icons/TwitterIcon";
import IGIcon from "@/components/Icons/IGIcon";
import MobileLogo from "@/components/Icons/MobileLogo";
import ArrowIcon from "@/components/Icons/ArrowIcon";
import { useTranslation } from "@/app/i18n/client";

const Footer = () => {
  const [isClickedArrow, setIsClickedArrow] = useState(true);
  const { t } = useTranslation();

  return (
    <div className="footer-container">
      <div className="footer-divider" />
      <div className="middle-bar">
        <div className="middle-frame-1">
          <div className="middle-logo">
            <Logo />
          </div>
          <div className="middle-logo-mobile">
            <MobileLogo />
          </div>
          <div className="middle-nav-mobile">
            <p className="footer-title-mobile">
              {t("footerNavTitle")}
              <span
                onClick={() => setIsClickedArrow(!isClickedArrow)}
                style={{ transform: !isClickedArrow && "rotate(180deg)" }}
              >
                <ArrowIcon />
              </span>
            </p>
            {!isClickedArrow && (
              <div className="middle-nav-mobile-content">
                <p> {t("footerExchange")}</p>
                <p> {t("footerBuyCrypto")}</p>
                <p> {t("footerMarket")}</p>
                <p> {t("footerLearn")}</p>
                <p> {t("footerContact")}</p>
              </div>
            )}
          </div>
          <div className="middle-nav">
            <p> {t("footerExchange")}</p>
            <p> {t("footerBuyCrypto")}</p>
            <p> {t("footerMarket")}</p>
            <p> {t("footerLearn")}</p>
            <p> {t("footerContact")}</p>
          </div>
        </div>
        <div className="footer-rectangle" />
        <div className="middle-frame-2">
          <p className="footer-title">{t("footerContactTitle")}</p>
          <div className="contact-content">{t("footerContactAddress")}</div>
        </div>
        <div className="footer-rectangle" />
        <div className="middle-frame-3">
          <p className="footer-title">{t("footerNewsletterTitle")}</p>
          <div className="newsletter-content">
            <p>{t("footerNewsletterContent")}</p>
            <SubmitInput
              placeholder={t("footerEmailPlaceholder")}
              icon={<RightArrowIcon />}
            />
          </div>
        </div>
      </div>
      <div className="footer-divider-mobile" />
      <div className="bottom-bar">
        <div className="bottom-content">
          <div className="bottom-text">{t("footerCopyright")} </div>
          <div className="bottom-icons">
            <FBIcon />
            <TwitterIcon />
            <IGIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
