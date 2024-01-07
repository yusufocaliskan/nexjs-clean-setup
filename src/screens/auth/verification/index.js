"use client";
import "../auth.scss";

import {
  Form,
  Title,
  CoolButton,
  Spacer,
  VerticalDivider,
  FormTriggerButton,
} from "@/components";
import { useTranslation } from "@/app/i18n/client";
import { AuthLayout } from "@/layouts";
import routes from "@/routes";
import Link from "next/link";
import { MdEmail, MdSms } from "react-icons/md";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import VerificationCode from "@/components/form/VerificationCodeInput";
import { useFormik } from "formik";
import { registerVerificationFormValidations } from "@/validations/auth";
import { verificationMethodTypes } from "@/constants";

const VERIFICATION_CODE_NUMBER = 6;
const Verification = ({ verificationMethod }) => {
  const { t } = useTranslation();
  const user = useSelector((state) => state.user);
  const [getSelectedVerificationMethod, setSelectedVerificationMethod] =
    useState();

  const emailVerificationForm = useFormik({
    initialValues: {
      Token: ["", "", "", "", "", ""],
      email: user.informations.Email,
      phone: user.informations.PhoneNumber,
    },
    validationSchema: registerVerificationFormValidations,
    onSubmit: () => handleOnEmailVerificationFormSubmit(),
  });

  const smsVerificationForm = useFormik({
    initialValues: {
      Token: ["", "", "", "", "", ""],
      email: user.informations.Email,
      phone: user.informations.PhoneNumber,
    },
    validationSchema: registerVerificationFormValidations,
    onSubmit: () => handleOnSmsVerificationFormSubmit(),
  });

  const handleOnEmailVerificationFormSubmit = () => {
    console.log(" handleOnEmailVerificationFormSubmit FormSubmtttteedd");
  };
  const handleOnSmsVerificationFormSubmit = () => {
    console.log("FormSubmtttteedd");
  };
  //The description above inputs
  const emailDescriptionText = t("completeTheRegistraionScreenDesc")
    .replace("%d", VERIFICATION_CODE_NUMBER)
    .replace("%s", emailVerificationForm.values.email);
  const smsDescriptionText = t("completeTheRegistraionScreenDesc")
    .replace("%d", VERIFICATION_CODE_NUMBER)
    .replace("%s", smsVerificationForm.values.phone);

  useEffect(() => {
    console.log("HERE", user, user.informations.PhoneNumber);
  }, [user]);
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
  const VerificationMethodItemRender = ({
    title,
    desc,
    icon,
    method,
    setMethod,
    selectedMethod,
  }) => {
    return (
      <div className="verification-item">
        <div className="verification-item-left">
          <div className="verification-item-icon fill-icon-gray">{icon}</div>
          <div>
            <p>{title}</p>
            <p>
              <b>{desc}</b>
            </p>
          </div>
        </div>

        {method !== selectedMethod && (
          <div>
            <CoolButton
              onClick={() => setMethod(method)}
              type="Small"
              label="Select"
            />
          </div>
        )}
      </div>
    );
  };

  return (
    <AuthLayout headerLinkRender={<HeaderLinkRender />}>
      <Spacer h={100} />
      <Title
        text="Let’s confirm it’s really you"
        desc="Help us secure your account. Please complete the verifications below"
      />
      <div className="verification-method-card">
        <VerificationMethodItemRender
          title="Get the code by email at "
          desc={`at ${user.informations.Email}`}
          icon={<MdEmail size="30px" color="black" />}
          method={verificationMethodTypes.email}
          setMethod={setSelectedVerificationMethod}
          selectedMethod={getSelectedVerificationMethod}
        />
        {getSelectedVerificationMethod == verificationMethodTypes.email && (
          <VerificationForm
            formInstance={emailVerificationForm}
            descriptionText={emailDescriptionText}
            t={t}
          />
        )}

        <VerticalDivider />
        <VerificationMethodItemRender
          title="Get the code by text message (SMS)"
          desc={`at +${user.informations.PhoneNumber}`}
          icon={<MdSms size="30px" color="black" />}
          method={verificationMethodTypes.sms}
          setMethod={setSelectedVerificationMethod}
          selectedMethod={getSelectedVerificationMethod}
        />
        {getSelectedVerificationMethod == verificationMethodTypes.sms && (
          <VerificationForm
            formInstance={smsVerificationForm}
            descriptionText={smsDescriptionText}
            t={t}
          />
        )}
      </div>
    </AuthLayout>
  );
};

const VerificationForm = ({ formInstance, descriptionText, t }) => {
  return (
    <Form formInstance={formInstance} dontDisplayErrors>
      <div className="login-form">
        <div className="form-inputs">
          <div className="text-align-center">
            <p dangerouslySetInnerHTML={{ __html: descriptionText }} />
          </div>

          <div className="verification-div">
            <VerificationCode
              formInstance={formInstance}
              verificationCode={formInstance.values.Token}
              name="Token"
              setVerificationCode={(value) =>
                formInstance.setFieldValue("Token", value)
              }
            />
          </div>
          <div className="input-groups">
            <CoolButton label={t("resendCode")} type="Small" />
            <FormTriggerButton
              formInstance={formInstance}
              // isLoading={regitrationResponse.isLoading}
              label={t("verify")}
            />
          </div>
        </div>
      </div>
    </Form>
  );
};

export default Verification;
