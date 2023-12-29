"use client";
import React from "react";
import "./index.scss";
import Image from "next/image";
import LeftBG from "../../../../public/assets/images/auth/left-background.png";
import { useState } from "react";
import { useTranslation } from "@/app/i18n/client";
import { usePathname, useRouter } from "next/navigation";
import { CoolButton, MailBox, TextBox, Title } from "@/components";
import LogoBg from "@/components/Logo";
import SmallLogo from "@/components/Logo/smallLogo";

const ForgotPassword = () => {
  const [stepper, setStepper] = useState(1);
  const [verificationCode, setVerificationCode] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const inputRefs = Array.from({ length: 6 }, () => React.createRef());

  const handleInputChange = (index, value) => {
    const newVerificationCode = [...verificationCode];
    newVerificationCode[index] = value;
    setVerificationCode(newVerificationCode);

    if (value !== "" && index < 5) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && index > 0 && verificationCode[index] === "") {
      inputRefs[index - 1].current?.focus();
    }
  };

  const path = usePathname();
  const lang = path.substring(1).split("/")[0];
  const { t } = useTranslation(lang);
  const router = useRouter();

  const handleStepper = () => {
    if (stepper < 3) {
      setStepper(stepper + 1);
    } else {
      router.push("/auth/login");
    }
  };


  return (
    <div className="forgot-page-container">
      <div className="forgot-page-left-background">
        <LogoBg />
      </div>
      <div className="forgot-page-right">
        <div className="forgot-page-right-top">
          <SmallLogo />
          <p
            style={{ display: "flex", gap: "10px" }}
            className="forgot-page-right-top-text"
          >
            {t("dontHaveAnAccount")}
            <span className="sign-up-for-free">{t("signUpForFree")}</span>
          </p>
        </div>
        <div className="forgot-page-right-content">
          {stepper === 1 && (
            <>
              <Title text={t("forgotPasswordPageForgotPassword")} />
              <div className="visit-url">
                <p className="visit-text">
                  {t("forgotPasswordPageSecurityPurpose")}
                </p>
                <div className="divider" />
                <TextBox
                  label={t("forgotPasswordPageEnterEmail")}
                  type="email"
                  name="email"
                  placeholder={t("justEmail")}
                  icon={<MailBox />}
                  setValue={""}
                />
              </div>
            </>
          )}
          {stepper === 2 && (
            <>
              <Title text={t("forgotPasswordPageSecurityVerification")} />
              <div className="visit-url">
                <p className="visit-text">{t("forgotPasswordPageToSecure")}</p>
                <p className="visit-text-six-digit">
                  {t("forgotPasswordPageSixDigit")}
                  <span className="visit-text-six-digit-mail"> deneme</span>
                </p>
                <div className="verification-div">
                  {verificationCode.map((value, index) => (
                    <input
                      className="verification-inputs"
                      key={index}
                      ref={inputRefs[index]}
                      type="text"
                      maxLength="1"
                      value={value}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                    />
                  ))}
                </div>
              </div>
            </>
          )}
          {stepper === 3 && (
            <>
              <Title text={t("forgotPasswordPageNewPassword")} />
              <TextBox
                label={t("forgotPasswordPageEnterEmail")}
                type="email"
                name="email"
                placeholder={t("justEmail")}
              />
              <TextBox
                label={t("forgotPasswordPageNewPassword")}
                type="password"
                name="new-password"
                placeholder={t("justPassword")}
                isSecure
              />
              <TextBox
                label={t("forgotPasswordPageConfirmPassword")}
                type="password"
                name="confirm-password"
                placeholder={t("justPassword")}
                isSecure
              />
            </>
          )}
          <div className="forgot-password-buttons">
            {stepper === 2 && (
              <div className="forgot-password-buttons">
                <CoolButton
                  type="Small"
                  label={t("forgotPasswordPageResendCode")}
                  onClick={handleStepper}
                />
                <CoolButton
                  type="Main"
                  label={t("forgotPasswordPageContinue")}
                  onClick={handleStepper}
                  fullSize
                />
              </div>
            )}
            {stepper !== 2 && (
              <CoolButton
                type="Main"
                label={t("forgotPasswordPageContinue")}
                onClick={handleStepper}
                fullSize={true}
              />
            )}
          </div>
          {stepper === 1 ? (
            <div className="forgot-password-buttons-bottom">
              <p
                className="forgot-password-never-mind"
                onClick={() => router.push("/auth/login")}
              >
                {t("forgotPasswordPageNeverMind")}
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
