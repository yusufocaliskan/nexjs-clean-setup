"use client";
import React from "react";
import "./index.scss";
import { useState } from "react";
import { useTranslation } from "@/app/i18n/client";
import { usePathname, useRouter } from "next/navigation";
import {
  CoolButton,
  MailBox,
  TextBox,
  Title,
  FormTriggerButton,
} from "@/components";
import LogoBg from "@/components/Logo";
import SmallLogo from "@/components/Logo/smallLogo";
import VerificationCode from "@/components/form/VerificationCodeInput";
import { useFormik } from "formik";
import {
  forgotPasswordFirstStepFormValidations,
  forgotPasswordLastStepFormValidations,
  forgotPasswordSecondStepFormValidations,
  loginFormValidations,
} from "@/validations/auth";
import { useRef } from "react";
import Form from "@/components/form";
import { hiddenEmail } from "@/utils/helpers";

const ForgotPassword = () => {
  const [stepper, setStepper] = useState(1);

  const firsStep = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: forgotPasswordFirstStepFormValidations,
    onSubmit: () => handleOnSubmitFirstForm(),
  });

  const secondStep = useFormik({
    initialValues: {
      verificationCode: ["", "", "", "", "", ""],
    },
    validationSchema: forgotPasswordSecondStepFormValidations,
    onSubmit: () => handleOnSubmitSecondForm(),
  });

  const thirdStep = useFormik({
    initialValues: {
      password: "",
      passwordAgain: "",
      email: "",
    },
    validationSchema: forgotPasswordLastStepFormValidations,
    onSubmit: () => handleOnSubmitThirdForm(),
  });

  const handleOnSubmitFirstForm = () => {
    if (stepper < 3) {
      setStepper(stepper + 1);
    } else {
      router.push("/auth/login");
    }
  };

  const handleOnSubmitSecondForm = () => {
    if (stepper < 3) {
      setStepper(stepper + 1);
    } else {
      router.push("/auth/login");
    }
  };

  const handleOnSubmitThirdForm = () => {
    if (stepper < 3) {
      setStepper(stepper + 1);
    } else {
      router.push("/auth/login");
    }
  };

  const path = usePathname();
  const lang = path.substring(1).split("/")[0];
  const { t } = useTranslation(lang);
  const router = useRouter();

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
            <Form onSubmit={firsStep.handleSubmit} formInstance={firsStep}>
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
                  formInstance={firsStep}
                  value={firsStep.values.email}
                  setValue={(value) => firsStep.setFieldValue("email", value)}
                />
              </div>
              <FormTriggerButton label={t("forgotPasswordPageContinue")} />
              <div className="forgot-password-buttons-bottom">
                <p
                  className="forgot-password-never-mind"
                  onClick={() => router.push("/auth/login")}
                >
                  {t("forgotPasswordPageNeverMind")}
                </p>
              </div>
            </Form>
          )}
          {stepper === 2 && (
            <Form onSubmit={secondStep.handleSubmit} formInstance={secondStep}>
              <Title text={t("forgotPasswordPageSecurityVerification")} />
              <div className="visit-url">
                <p className="visit-text">{t("forgotPasswordPageToSecure")}</p>
                <p className="visit-text-six-digit">
                  {t("forgotPasswordPageSixDigit")}
                  <span className="visit-text-six-digit-mail">
                    {" "}
                    {hiddenEmail(firsStep.values.email)}
                  </span>
                </p>
                <div className="verification-div">
                  <VerificationCode
                    formInstance={secondStep}
                    verificationCode={secondStep.values.verificationCode}
                    setVerificationCode={(value) =>
                      secondStep.setFieldValue("verificationCode", value)
                    }
                  />
                </div>
              </div>
              <div className="forgot-password-buttons">
                <CoolButton
                  type="Small"
                  label={t("forgotPasswordPageResendCode")}
                />
                <FormTriggerButton label={t("forgotPasswordPageContinue")} />
              </div>
            </Form>
          )}
          {stepper === 3 && (
            <Form onSubmit={thirdStep.handleSubmit} formInstance={thirdStep}>
              {" "}
              <Title text={t("forgotPasswordPageNewPassword")} />
              <TextBox
                label={t("forgotPasswordPageEnterEmail")}
                type="email"
                name="email"
                placeholder={t("justEmail")}
                formInstance={thirdStep}
                value={thirdStep.values.email}
                setValue={(value) => thirdStep.setFieldValue("email", value)}
              />
              <TextBox
                label={t("forgotPasswordPageNewPassword")}
                type="password"
                name="new-password"
                placeholder={t("justPassword")}
                isSecure
                formInstance={thirdStep}
                value={thirdStep.values.password}
                setValue={(value) => thirdStep.setFieldValue("password", value)}
              />
              <TextBox
                label={t("forgotPasswordPageConfirmPassword")}
                type="password"
                name="confirm-password"
                placeholder={t("justPassword")}
                isSecure
                formInstance={thirdStep}
                value={thirdStep.values.passwordAgain}
                setValue={(value) =>
                  thirdStep.setFieldValue("passwordAgain", value)
                }
              />
              <FormTriggerButton label={t("forgotPasswordPageContinue")} />
            </Form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
