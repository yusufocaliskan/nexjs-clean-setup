"use client";

import "../auth.scss";
import { useState } from "react";
import { useTranslation } from "@/app/i18n/client";
import { usePathname, useSearchParams } from "next/navigation";
import {
  LockLine,
  CoolButton,
  PhoneInput,
  Title,
  PasswordInputs,
  TextBox,
  FormTriggerButton,
} from "@/components";
import Form from "@/components/form";
import Link from "next/link";
import SmallLogo from "@/components/Logo/smallLogo";
import { useFormik } from "formik";
import { loginFormValidations } from "@/validations/auth";
import { useRef } from "react";
import LeftSide from "../leftSide";

const Login = () => {
  const [button, setButton] = useState("Email");
  const reCapthchaRef = useRef();
  const loginForm = useFormik({
    initialValues: {
      password: "",
      email: "",
    },
    validationSchema: loginFormValidations,
    onSubmit: () => handleOnSubmitLoginForm(),
  });

  const handleOnSubmitLoginForm = (vals) => {
    const isRecaptchaValid = reCapthchaRef.current.getValue();
    console.log("All errors gone and form submitted");
  };

  const path = usePathname();
  const lang = path.substring(1).split("/")[0];
  const { t } = useTranslation(lang);

  return (
    <div className="login-page-container">
      <LeftSide />
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
          <Title text={t("loginPageSignInToHepbit")} />
          <div className="visit-url">
            <p className="visit-text">{t("loginPageCorrectUrl")}</p>
            <p className="visit-url-login">
              <LockLine />
              <span className="visit-https"> {t("loginPageHttps")}</span>
              {t("loginPageLoginUrl")}
            </p>
          </div>
          <div className="divider" />
          <Form onSubmit={loginForm.handleSubmit} formInstance={loginForm}>
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
                    <TextBox
                      formInstance={loginForm}
                      label={t("loginPageEmail")}
                      type="email"
                      name={t("loginPageEmail")}
                      placeholder={t("loginPageEmailPlaceHolder")}
                      value={loginForm.values.email}
                      setValue={(value) =>
                        loginForm.setFieldValue("email", value)
                      }
                    />
                  </div>
                  <div className="password">
                    <div className="password-area">
                      <PasswordInputs formInstance={loginForm} />
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
                  <FormTriggerButton label={t("loginPageLogin")} />
                </div>
              )}
              {button === "Mobile" && (
                <div className="form-inputs">
                  <div className="email">
                    <p className="email-label">{t("loginPageMobile")}</p>
                    <PhoneInput onChange={(e) => console.log(e)} />
                  </div>
                  <div className="password">
                    <div className="password-area">
                      <PasswordInputs formInstance={loginForm} />
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
                  <FormTriggerButton label={t("loginPageLogin")} />
                </div>
              )}
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
