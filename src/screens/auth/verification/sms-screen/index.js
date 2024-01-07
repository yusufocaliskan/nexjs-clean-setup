"use client";
import "../auth.scss";

import {
  Form,
  Title,
  FormTriggerButton,
  CoolButton,
  Spacer,
} from "@/components";
import { useFormik } from "formik";
import { registerVerificationFormValidations } from "@/validations/auth";
import { useTranslation } from "@/app/i18n/client";
import { useEffect, useRef } from "react";
import { AuthLayout } from "@/layouts";
import { queryResult } from "@/services/queryResult";
import routes from "@/routes";
import Link from "next/link";
import VerificationCode from "@/components/form/VerificationCodeInput";
import { useSelector } from "react-redux";
import { useSession } from "next-auth/react";

const VERIFICATION_CODE_NUMBER = 6;
const Verification = ({ verificationMethod }) => {
  const { t } = useTranslation();
  const reCapthchaRef = useRef();
  const user = useSelector((state) => state.user);

  const session = useSession();
  console.log("Session", session);
  //form validations
  const registerVerificationForm = useFormik({
    initialValues: {
      Token: ["", "", "", "", "", ""],
      email: "test@gmail.com",
    },
    validationSchema: registerVerificationFormValidations,
    onSubmit: () => handleOnSubmitRegisterForm(),
  });

  //The description above inputs
  const descriptionText = t("completeTheRegistraionScreenDesc")
    .replace("%d", VERIFICATION_CODE_NUMBER)
    .replace("%s", registerVerificationForm.values.email);

  //On form submitted
  const handleOnSubmitRegisterForm = async () => {};

  const HeaderLinkRender = () => {
    return (
      <p className="login-page-right-top-text">
        {t("dontHaveAnAccount")}
        <Link href={routes.auth.register} className="sign-up-for-free">
          {t("signUpForFree")}
        </Link>
      </p>
    );
  };

  return (
    <AuthLayout headerLinkRender={<HeaderLinkRender />}>
      <Spacer h={100} />
      <Title text={t("completeTheRegistration")} />
      <Form formInstance={registerVerificationForm} dontDisplayErrors>
        <div className="login-form">test</div>
      </Form>
    </AuthLayout>
  );
};

export default Verification;
