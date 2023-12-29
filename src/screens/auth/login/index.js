"use client";
import "../auth.scss";
import Image from "next/image";
import LeftBG from "../../../../public/assets/images/auth/left-background.png";
import { useState } from "react";
import { useTranslation } from "@/app/i18n/client";
import { usePathname, useSearchParams } from "next/navigation";
import {
  LockLine,
  EyeLine,
  EyeSlash,
  CoolButton,
  PhoneInput,
  Logo,
} from "@/components";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import LogoBg from "@/components/Logo";
import Link from "next/link";
import SmallLogo from "@/components/Logo/smallLogo";

const Login = () => {
  const [button, setButton] = useState("Email");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const path = usePathname();
  const lang = path.substring(1).split("/")[0];
  const { t } = useTranslation(lang);

  return (
    <div className="login-page-container">
      <div className="login-page-left-background">
        <LogoBg />
      </div>
      <div className="login-page-right">
        <div className="login-page-right-top">
          <SmallLogo />
          <p
            style={{ display: "flex", gap: "10px" }}
            className="login-page-right-top-text"
          >
            {t("dontHaveAnAccount")}
            <span className="sign-up-for-free">{t("signUpForFree")}</span>
          </p>
        </div>
        <div className="login-page-right-content">
          <p className="sign-in-to-hepbit">{t("loginPageSignInToHepbit")} </p>
          <div className="visit-url">
            <p className="visit-text">{t("loginPageCorrectUrl")}</p>
            <p className="visit-url-login">
              <LockLine />
              <span className="visit-https"> {t("loginPageHttps")}</span>
              {t("loginPageLoginUrl")}
            </p>
          </div>
          <div className="divider" />
          <div className="login-form">
            <div className="form-buttons">
              <CoolButton
                selected={button === "Email"}
                onClick={() => setButton("Email")}
                label={t("loginPageEmail")}
                type="Selected"
              />
              <CoolButton
                onClick={() => setButton("Mobile")}
                selected={button === "Mobile"}
                label={t("loginPageMobile")}
                type="Selected"
              />
            </div>
            {button === "Email" && (
              <div className="form-inputs">
                <div className="email">
                  <p className="email-label">{t("loginPageEmail")}</p>
                  <input
                    type="email"
                    placeholder={t("loginPageEmailPlaceHolder")}
                    className="email-input"
                  />
                </div>
                <div className="password">
                  <p className="password-label">{t("loginPagePassword")}</p>
                  <div className="password-area">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder={t("loginPagePasswordPlaceHolder")}
                      className="password-input"
                    />
                    <button
                      className="password-toggle-page"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <EyeSlash /> : <EyeLine />}
                    </button>
                  </div>
                </div>
                <div className="scan-and-forgot">
                  <p className="scan-login">{t("loginPageScanToLogin")} </p>
                  <p className="forgot-password">
                    <Link href="/auth/forgot-password">
                      {t("loginPageForgotPassword")}
                    </Link>
                  </p>
                </div>
                <div className="login-btn-area">
                  <CoolButton
                    className="login-btn"
                    type="Main"
                    label={t("loginPageLogin")}
                  />
                </div>
              </div>
            )}
            {button === "Mobile" && (
              <div className="form-inputs">
                <div className="email">
                  <p className="email-label">{t("loginPageMobile")}</p>

                  <PhoneInput onChange={(e) => console.log(e)} />
                </div>
                <div className="password">
                  <p className="password-label">{t("loginPagePassword")}</p>
                  <div className="password-area">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder={t("loginPagePasswordPlaceHolder")}
                      className="password-input"
                    />
                    <button
                      className="password-toggle-page"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <EyeSlash /> : <EyeLine />}
                    </button>
                  </div>
                </div>
                <div className="scan-and-forgot">
                  <p className="scan-login">{t("loginPageScanToLogin")} </p>
                  <p className="forgot-password">
                    <Link href="/auth/forgot-password">
                      {t("loginPageForgotPassword")}
                    </Link>
                  </p>
                </div>
                <div className="login-btn-area">
                  <CoolButton
                    className="login-btn"
                    type="Main"
                    label={t("loginPageLogin")}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
