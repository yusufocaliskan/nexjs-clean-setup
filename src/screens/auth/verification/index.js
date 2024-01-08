"use client";
import "../auth.scss";

import { Title, CoolButton, Spacer, VerticalDivider } from "@/components";
import { useTranslation } from "@/app/i18n/client";
import { AuthLayout } from "@/layouts";
import routes from "@/routes";
import Link from "next/link";
import { MdEmail, MdSms } from "react-icons/md";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import VerificationForm from "./verification-form/";
import { useFormik } from "formik";
import { registerVerificationFormValidations } from "@/validations/auth";
import { verificationMethodTypes } from "@/constants";
import { authApi } from "@/services/auth";
import queryResult from "@/services/queryResult";
import { useRouter } from "next/navigation";
import { cleanUpUserStore } from "@/store/user";
import toast from "react-hot-toast";
import useCounter from "@/hooks/useCounter";
import { appConfigs } from "@/configs";
import GiantLoaderAnimation from "@/components/LoadingGif/GiantLoaderAnimation";

const VERIFICATION_CODE_NUMBER = 6;

const Verification = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  const [getSelectedVerificationMethod, setSelectedVerificationMethod] =
    useState();

  //counters
  const emailCounter = useCounter(
    "emailCounter",
    appConfigs.form.counterTimeOut,
  );

  const smsCounter = useCounter("smsCounter", appConfigs.form.counterTimeOut);

  //queries
  const [reSendVerificationCode2Email, resendEmailCodeResponse] =
    authApi.useReSendVerificationCode2EmailMutation();

  const [reSendVerificationCode2Sms, resendSmsCodeResponse] =
    authApi.useReSendVerificationCode2SmsMutation();

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

  //We won't let user to see this page
  //if they didnt' come with informatios
  useEffect(() => {
    if (
      !user ||
      !user.informations.token ||
      !user.informations.Email ||
      !user.informations.PhoneNumber
    ) {
      setIsLoading(true);
      router.push(routes.register);
    } else {
      setIsLoading(false);
    }
  }, [user.infomations]);

  //When on e-mail form submitted
  const handleOnEmailVerificationFormSubmit = async () => {
    if (smsVerificationForm.submitCount <= 0) {
      toast.success(
        "Grate!, you're so close to the end, please go head and fill in the sms verification code.",
      );
      setSelectedVerificationMethod(verificationMethodTypes.sms);
    } else {
      setSelectedVerificationMethod();
    }
    return toast.error(resp.data.error.data.Message);
  };

  const handleOnSmsVerificationFormSubmit = () => {
    if (emailVerificationForm.submitCount <= 0) {
      toast.success("All most done! Now we need the e-mail verification code.");
      setSelectedVerificationMethod(verificationMethodTypes.email);
    } else {
      setSelectedVerificationMethod();
    }
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
      return toast.success(resp.data.Message || t("success"));
    }

    return toast.error(resp.error.data.Message);
  };

  const handleOnClickResendSmsCodeButton = async () => {
    smsCounter.startCounter();

    const resp = await reSendVerificationCode2Sms({
      verifyToken: user.informations.token,
    });

    //If backend wants to redirect
    const isRedirect = queryResult.IIS_REDIRECTS_REDIRECT(resp);
    if (isRedirect) {
      router.push(routes[resp.data.Data]);
      return dispatch(cleanUpUserStore());
    }
    if (queryResult.isSuccess(resp)) {
      return toast.success(resp.data.Message);
    }

    return toast.error(resp.error.data.Message);
  };

  //When all inputs of the forms are filled
  const completeTheVerification = async () => {
    const data = {
      verifyToken: user.informations.token,
      emailCode: emailVerificationForm.values.Token.join(""),
      smsCode: smsVerificationForm.values.Token.join(""),
    };

    //send code
    const resp = await verfiyEmailOPhoneNumber(data);

    if (queryResult.isSuccess(resp)) {
      toast.success(resp.data.Message);

      //Send the use tho the login page.
      return router.push(routes.login);
    }

    //if server needs to redirect
    const isRedirect = queryResult.IIS_REDIRECTS_REDIRECT(resp);
    if (isRedirect) {
      router.push(routes[resp.data.Data]);
      return dispatch(cleanUpUserStore());
    }

    return toast.error(resp.error.data.Message);
  };

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
              label={t("select")}
            />
          </div>
        )}
      </div>
    );
  };

  if (isLoading) {
    return <GiantLoaderAnimation isLoading={true} />;
  }

  return (
    <AuthLayout headerLinkRender={<HeaderLinkRender />}>
      <Spacer h={100} />
      <Title
        text={t("verificationScreenTitle")}
        desc={t("verificationScreenDesc")}
      />
      <div className="verification-method-card">
        <VerificationMethodItemRender
          title={t("emailConfirmationCardTitle")}
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
          title={t("smsConfirmationCardTitle")}
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
        <Spacer />
        {!getSelectedVerificationMethod &&
          emailVerificationForm.isValid &&
          smsVerificationForm.isValid &&
          emailVerificationForm.submitCount > 0 &&
          smsVerificationForm.submitCount > 0 && (
            <div>
              <CoolButton
                label="Done"
                type="Main"
                onClick={completeTheVerification}
                style={{ width: "100%", cursor: "pointer" }}
              />
            </div>
          )}
      </div>
    </AuthLayout>
  );
};

export default Verification;
