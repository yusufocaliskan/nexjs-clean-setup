"use client";

import "./index.scss";
import { useEffect, useState } from "react";
import { useTranslation } from "@/app/i18n/client";

import {
  LockLine,
  CoolButton,
  Title,
  PasswordInputs,
  TextBox,
  FormTriggerButton,
  Form,
  GoogleReCaptcha,
  LoggedInProfileCard,
} from "@/components";

import Link from "next/link";
import SmallLogo from "@/components/Logo/smallLogo";
import { useFormik } from "formik";
import { loginFormValidations } from "@/validations/auth";
import { useRef } from "react";
import LeftSide from "../leftSide";
import { signIn, signOut, useSession } from "next-auth/react";
import toast from "react-hot-toast";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { useRouter } from "next/navigation";
import routes from "@/routes";
import { cleanUpUserStore, setToken } from "@/store/user";
import { useDispatch, useSelector } from "react-redux";
import queryResult from "@/services/queryResult";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { authApi } from "@/services/auth";

const Login = () => {
  const [button, setButton] = useState("Email");
  const [isLoading, setIsLoading] = useState(false);

  //Store
  const dispatch = useDispatch();

  const [getUserInformations, userInformationResponse] =
    authApi.useGetUserInformationsMutation();

  const [logoutSession, logoutResp] = authApi.useLogoutSessionMutation();

  const router = useRouter();
  const { t } = useTranslation();

  //SEssions
  const session = useSession();
  const isAuthorized = session?.status === "authenticated";

  const loginForm = useFormik({
    initialValues: {
      Password: "",
      Email: "",
      reCaptcha: "",
    },
    validationSchema: loginFormValidations,
    onSubmit: () => handleOnSubmitLoginForm(),
  });

  const data = loginForm.values;

  //store the user token that comes from server
  useEffect(() => {
    //is user need to confirm her/his e-mail?
    //redirect to email confirmation page
    if (session?.data?.notConfirmedEmail) {
    }

    //Is signIn success
    if (isAuthorized) {
      const tokens = session?.data?.accessToken;
      if (tokens) {
        dispatch(setToken(tokens));
        //Get user informations.

        getUserInformations();
        //router.push(routes.welcome);
      }
    }
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
