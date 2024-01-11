"use client";

import "./index.scss";
import { useEffect, useState } from "react";
import { useTranslation } from "@/app/i18n/client";

import {
  LockLine,
  Title,
  PasswordInputs,
  TextBox,
  Form,
  LoggedInProfileCard,
  Modal,
  VerificationCode,
} from "@/components";

import Link from "next/link";
import SmallLogo from "@/components/Logo/smallLogo";
import { useFormik } from "formik";
import { loginFormValidations } from "@/validations/auth";
import LeftSide from "../leftSide";
import { signIn, signOut, useSession } from "next-auth/react";
import toast from "react-hot-toast";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { useRouter } from "next/navigation";
import routes from "@/routes";
import { setToken } from "@/store/user";
import { useDispatch } from "react-redux";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { authApi } from "@/services/auth";
import useCustomSession from "@/hooks/useCustomSession";

const Login = () => {
  const [button, setButton] = useState("Email");
  const [isLoading, setIsLoading] = useState(false);

  //Store
  const dispatch = useDispatch();

  const { session, isAuthorized } = useCustomSession();
  const [getUserInformations, userInformationResponse] =
    authApi.useGetUserInformationsMutation();

  const router = useRouter();
  const { t } = useTranslation();

  //SEssions

  const loginForm = useFormik({
    initialValues: {
      Password: "",
      Email: "",
      reCaptcha: "",
      Token: ["", "", "", "", "", ""],
    },
    validationSchema: loginFormValidations,
    onSubmit: () => handleOnSubmitLoginForm(),
  });

  const data = loginForm.values;
  useEffect(() => {
    console.log("Custom Session : ", session);
  }, [session]);
  //store the user token that comes from server
  useEffect(() => {
    const startTheSessionListener = () => {
      //is user need to confirm her/his e-mail?
      //redirect to email confirmation page
      if (session?.data?.notConfirmedEmail) {
        //return router.push(routes.emailVerification)
      }

      if (session?.data?.googleAuthenticatorEnabled) {
      }

      //Is signIn success
      // - The user's email must be verified and
      // - google authenticator must be disabled
      if (
        isAuthorized &&
        !session?.data?.notConfirmedEmail &&
        !session?.data?.googleAuthenticatorEnabled
      ) {
        const tokens = session?.data?.accessToken;
        if (tokens) {
          dispatch(setToken(tokens));
          //Get user informations.

          getUserInformations();
          //router.push(routes.welcome);
        }
      }
    };
    startTheSessionListener();
  }, [session, dispatch, isAuthorized, router]);

  const handleOnSubmitLoginForm = async (vals) => {
    setIsLoading(true);
    const resp = await signIn("credentials", {
      ...data,
      redirect: false,
      callbackUrl: routes.welcome,
    });

    if (!resp.ok) {
      toast.error("Wrong informations");
    }
    if (resp.ok) {
      //loginForm.resetForm();
      //router.push(routes.welcome);
    }

    setIsLoading(false);
  };

  return (
    <div className="login-page-container">
      <Modal w="430px">
        <div className="twofa-form-wrapper">
          <Form
            onSubmit={loginForm.handleSubmit}
            formInstance={loginForm}
            isLoading={isLoading}
            submitButtonText={t("loginPageLogin")}
          >
            <Title text={t("verification")} />
            <div className="form-inputs">
              <div className="email">
                <div className="verification-div">
                  <VerificationCode
                    formInstance={loginForm}
                    verificationCode={loginForm.values.Token}
                    name="Token"
                    setVerificationCode={(value) =>
                      loginForm.setFieldValue("Token", value)
                    }
                  />
                </div>
              </div>
            </div>
          </Form>
        </div>
      </Modal>
      <LeftSide />
      <div className="login-page-right">
        <div className="login-page-right-top">
          <SmallLogo />
          <p
            style={{ display: "flex", gap: "10px" }}
            className="login-page-right-top-text"
          >
            <ThemeSwitcher />
            <LanguageSwitcher />
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
              accounts.hepbit.com/login
            </p>
          </div>
          <div className="divider" />
          <div className="login-form">
            {/* {!isAuthorized && (
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
            )} */}
            <LoggedInProfileCard session={session} />
            {!isAuthorized && button === "Email" && (
              <Form
                onSubmit={loginForm.handleSubmit}
                formInstance={loginForm}
                isLoading={isLoading}
                submitButtonText={t("loginPageLogin")}
              >
                <div className="form-inputs">
                  <div className="email">
                    <TextBox
                      formInstance={loginForm}
                      label={t("loginPageEmail")}
                      type="email"
                      name="Email"
                      placeholder={t("loginPageEmailPlaceHolder")}
                      value={loginForm.values.Email}
                      setValue={(value) =>
                        loginForm.setFieldValue("Email", value)
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
                </div>
              </Form>
            )}
            {/* {button === "Mobile" && (
              <Form
                onSubmit={loginForm.handleSubmit}
                formInstance={loginForm}
                isLoading={loginResponse.isLoading}
              >
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
                  <GoogleReCaptcha
                    reCapthchaRef={reCapthchaRef}
                    onChange={handleOnReCaptchaChanged}
                  />
                  <FormTriggerButton label={t("loginPageLogin")} />
                </div>
              </Form>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
