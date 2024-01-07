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
import { useDispatch, useSelector } from "react-redux";

import VerificationCode from "@/components/form/VerificationCodeInput";
import { useFormik } from "formik";
import { registerVerificationFormValidations } from "@/validations/auth";
import { verificationMethodTypes } from "@/constants";
import { authApi } from "@/services/auth";
import queryResult from "@/services/queryResult";
import { useRouter } from "next/navigation";
import { describeRoute } from "@/utils";
import { cleanUpUserStore } from "@/store/user";
import toast from "react-hot-toast";
import useCounter from "@/hooks/useCounter";
import { appConfigs } from "@/configs";

const VERIFICATION_CODE_NUMBER = 6;
const Verification = ({ verificationMethod }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [getSelectedVerificationMethod, setSelectedVerificationMethod] =
    useState();

  const emailCounter = useCounter("emailCounter", 50);

  const smsCounter = useCounter("smsCounter", 29);
  //queries
  const [reSendVerificationCode2Email, resendEmailCodeResponse] =
    authApi.useReSendVerificationCode2EmailMutation();

  const [verfiyEmailOPhoneNumber, emailVerificationResponse] =
    authApi.useVerfiyEmailOPhoneNumberMutation();

  //EMaIL FORM
  const emailVerificationForm = useFormik({
    initialValues: {
      Token: ["", "", "", "", "", ""],
      email: user.informations.Email,
      phone: user.informations.PhoneNumber,
    },
    validationSchema: registerVerificationFormValidations,
    onSubmit: () => handleOnEmailVerificationFormSubmit(),
  });
  const emailDescriptionText = t("completeTheRegistraionScreenDesc")
    .replace("%d", VERIFICATION_CODE_NUMBER)
    .replace("%s", emailVerificationForm.values.email);

  const handleOnEmailVerificationFormSubmit = async () => {
    const data = {
      verifyToken: user.informations.token,
      emailCode: emailVerificationForm.values.Token,
      //smsCode: emailVerificationForm.values.Token,
      smsCode: 123456,
    };
    const resp = await verfiyEmailOPhoneNumber(data);
    if (queryResult.isSuccess(resp)) {
      return toast.success("Verfied");
    }
    const isRedirect = queryResult.IIS_REDIRECTS_REDIRECT(resp);
    if (isRedirect) {
      router.push(routes[resp.data.Data]);
      return dispatch(cleanUpUserStore());
    }

    console.log(" handleOnEmailVerificationFormSubmit FormSubmtttteedd", resp);
    return toast.error(resp.data.error.data.Message);
    console.log(" handleOnEmailVerificationFormSubmit FormSubmtttteedd", resp);
  };

  ///SMS FORM
  const smsVerificationForm = useFormik({
    initialValues: {
      Token: ["", "", "", "", "", ""],
      email: user.informations.Email,
      phone: user.informations.PhoneNumber,
    },
    validationSchema: registerVerificationFormValidations,
    onSubmit: () => handleOnSmsVerificationFormSubmit(),
  });

  const smsDescriptionText = t("completeTheRegistraionScreenDesc")
    .replace("%d", VERIFICATION_CODE_NUMBER)
    .replace("%s", smsVerificationForm.values.phone);

  const handleOnSmsVerificationFormSubmit = () => {
    console.log("FormSubmtttteedd");
  };

  //When user needs verification code
  const handleOnClickResendEmailCodeButton = async () => {
    emailCounter.startCounter();
    const resp = await reSendVerificationCode2Email({
      verifyToken: user.informations.token,
    });

    //If backend wants to redirect
    const isRedirect = queryResult.IIS_REDIRECTS_REDIRECT(resp);
    if (isRedirect) {
      router.push(routes[resp.data.Data]);
      return dispatch(cleanUpUserStore());
    }
    if (queryResult.isSuccess(resp)) {
      return toast.success("We have sent a new code to your e-mail");
    }

    return toast.error("Error");
    console.log("Resending Email code", resp);
  };

  const handleOnClickResendSmsCodeButton = () => {
    console.log("Resending Sms code");
  };

  useEffect(() => {
    console.log("HERE", user, user.informations.PhoneNumber);
  }, [user]);

  const HeaderLinkRender = () => {
    return (
      <p className="login-page-right-top-text">
        {t("dontHaveAnAccount")}
        <Link href={routes.register} className="sign-up-for-free">
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
            onClickResenButton={handleOnClickResendEmailCodeButton}
            counter={emailCounter}
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
            onClickResenButton={handleOnClickResendSmsCodeButton}
            t={t}
            counter={smsCounter}
          />
        )}
      </div>
    </AuthLayout>
  );
};

const VerificationForm = ({
  formInstance,
  descriptionText,
  t,
  onClickResenButton,
  counter,
}) => {
  return (
    <Form formInstance={formInstance} dontDisplayErrors>
      {counter.isCounterStarted.toString()}
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
            <CoolButton
              label={`${t("resendCode")} (${counter.counter})`}
              type="Small"
              onClick={onClickResenButton}
            />
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
