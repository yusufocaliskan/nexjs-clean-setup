"use client";
import "../auth.scss";

import {
  Form,
  TextBox,
  Title,
  PasswordInputs,
  PhoneInput,
  FullNameInputs,
  DateSelectBox,
  CitizenshipNationalitySelector,
  FormTriggerButton,
  TermAndPolicyCheckBox,
  DeclarationCheckBox,
  GoogleReCaptcha,
} from "@/components";
import { useFormik } from "formik";
import { registerFormValidations } from "@/validations/auth";
import { useTranslation } from "@/app/i18n/client";
import { useEffect, useRef } from "react";
import { authApi } from "@/services/auth";
import { referralApi } from "@/services/referral";
import { AuthLayout } from "@/layouts";
import useDebounce from "@/hooks/useDebounce";
import toast from "react-hot-toast";
import { queryResult } from "@/services/queryResult";
import routes from "@/routes";
import Link from "next/link";
import VerificationCode from "@/components/form/VerificationCodeInput";

const RegisterVerification = () => {
  const { t } = useTranslation();
  const referralCodeInput = useRef();
  const reCapthchaRef = useRef();

  //form validations
  const registerVerificationForm = useFormik({
    initialValues: {
      Token: ["", "", "", "", "", ""],
    },
    validationSchema: registerFormValidations,
    onSubmit: () => handleOnSubmitRegisterForm(),
  });

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
      <Title text={t("completeTheRegistration")} />
      <Form formInstance={registerVerificationForm}>
        <div className="login-form">
          <div className="form-inputs">
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
          </div>
        </div>

        <FormTriggerButton
          formInstance={registerVerificationForm}
          // isLoading={regitrationResponse.isLoading}
          label={t("verify")}
        />
      </Form>
    </AuthLayout>
  );
};

export default RegisterVerification;
