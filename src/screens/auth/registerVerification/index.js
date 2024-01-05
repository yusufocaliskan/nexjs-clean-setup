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
const RegisterVerification = () => {
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
        <div className="login-form">
          <div className="form-inputs">
            <div className="text-align-center">
              <p dangerouslySetInnerHTML={{ __html: descriptionText }} />
            </div>

            <div className="verification-div">
              <VerificationCode
                formInstance={registerVerificationForm}
                verificationCode={registerVerificationForm.values.Token}
                name="Token"
                setVerificationCode={(value) =>
                  registerVerificationForm.setFieldValue("Token", value)
                }
              />
            </div>
            <div className="input-groups">
              <CoolButton label={t("resendCode")} type="Small" />
              <FormTriggerButton
                formInstance={registerVerificationForm}
                // isLoading={regitrationResponse.isLoading}
                label={t("verify")}
              />
            </div>
          </div>
        </div>
      </Form>
    </AuthLayout>
  );
};

export default RegisterVerification;
