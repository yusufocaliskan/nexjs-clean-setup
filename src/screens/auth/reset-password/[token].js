"use client";
import React from "react";
import "./index.scss";
import { useTranslation } from "@/app/i18n/client";
import { useRouter } from "next/navigation";
import { TextBox, Title, FormTriggerButton, Form } from "@/components";
import LogoBg from "@/components/Logo";
import SmallLogo from "@/components/Logo/smallLogo";
import { useFormik } from "formik";
import {
  forgotPasswordLastStepFormValidations,
  resetPasswordFormValidations,
} from "@/validations/auth";
import { forgotPassword } from "@/services/auth";
import { useState, useEffect } from "react";
import queryResult from "@/services/queryResult";
import routes from "@/routes";
import toast from "react-hot-toast";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ThemeSwitcher from "@/components/ThemeSwitcher";


const ForgotPassword = () => {
  const [createPassword, createPasswordResponse] =
    forgotPassword.useCreatePasswordMutation();

  const [resetToken, setResetToken] = useState(null);
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token");
  const { t } = useTranslation();
  const router = useRouter();

  useEffect(() => {
    setResetToken(token);
  }, [token]);

  const resetPasswordForm = useFormik({
    initialValues: {
      Password: "",
      ConfirmPassword: "",
      Email: "",
    },
    validationSchema: resetPasswordFormValidations,
    onSubmit: () => handleResetPasswordFormSubmit(),
  });

  const handleResetPasswordFormSubmit = async () => {
    const data = { ...resetPasswordForm.values, Token: resetToken };

    try {
      const resp = await createPassword(data);

      //There is an error
      if (queryResult.isError(resp) || queryResult.isWarning(resp)) {
        if (queryResult.isWarning(resp)) {
        }
        return toast.error(resp.error?.data?.Message);
      }

      //On success
      if (queryResult.isSuccess(resp)) {
        toast.success(t("resetPasswordPageSuccessMessage"));

        resetPasswordForm.resetForm();

        return setTimeout(() => {
          router.push(routes.login);
        }, 3000);
      }
    } catch (error) {
      return toast.error(t("unknownRequestErrorMessage"));
    }
  };

  return (
    <div className="reset-page-container">
      <div className="reset-page-left-background">
        <LogoBg />
      </div>
      <div className="reset-page-right">
        <div className="reset-page-right-top">
          <SmallLogo />
          <p
            style={{ display: "flex", gap: "10px" }}
            className="reset-page-right-top-text"
          >
            <ThemeSwitcher />
            <LanguageSwitcher />
            {t("dontHaveAnAccount")}
            <span className="sign-up-for-free">{t("signUpForFree")}</span>
          </p>
        </div>
        <div className="reset-page-right-content">
          <Form
            onSubmit={resetPasswordForm.handleSubmit}
            formInstance={resetPasswordForm}
          >
            <Title text={t("forgotPasswordPageNewPassword")} />
            <TextBox
              label={t("forgotPasswordPageEnterEmail")}
              type="email"
              name="email"
              placeholder={t("justEmail")}
              formInstance={resetPasswordForm}
              value={resetPasswordForm.values.Email}
              setValue={(value) =>
                resetPasswordForm.setFieldValue("Email", value)
              }
            />
            <TextBox
              label={t("forgotPasswordPageNewPassword")}
              type="password"
              name="new-password"
              placeholder={t("justPassword")}
              isSecure
              formInstance={resetPasswordForm}
              value={resetPasswordForm.values.Password}
              setValue={(value) =>
                resetPasswordForm.setFieldValue("Password", value)
              }
            />
            <TextBox
              label={t("forgotPasswordPageConfirmPassword")}
              type="password"
              name="confirm-password"
              placeholder={t("justPassword")}
              isSecure
              formInstance={resetPasswordForm}
              value={resetPasswordForm.values.ConfirmPassword}
              setValue={(value) =>
                resetPasswordForm.setFieldValue("ConfirmPassword", value)
              }
            />
            <FormTriggerButton label={t("forgotPasswordPageContinue")} />
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
