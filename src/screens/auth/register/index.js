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

const Register = () => {
  const { t } = useTranslation();
  const referralCodeInput = useRef();
  const reCapthchaRef = useRef();

  const [newRegisteration, regitrationResponse] =
    authApi.useNewRegistrationMutation();

  const [checkIReferralIdIsValid, referralIdResponse] =
    referralApi.useCheckIReferralIdIsValidMutation();

  //form validations
  const registerForm = useFormik({
    initialValues: {
      Email: "",
      PhoneNumber: "",
      Password: "",
      ConfirmPassword: "",
      ReferralCode: "",
      Agreement: false,
      Declaration: false,
      FirstName: "",
      LastName: "",
      BirthDate: {
        Day: "",
        Month: "",
        Year: "",
      },
      Citizenship: "",
      Country: "",
      IdentityNo: "",
    },
    validationSchema: registerFormValidations,
    onSubmit: () => handleOnSubmitRegisterForm(),
  });

  //Check if given referralCode is valid
  const [textDebouncedReferralCode] = useDebounce(
    registerForm.values.ReferralCode,
    600,
  );

  useEffect(() => {
    const check4ValidRefferalCode = async () => {
      if (textDebouncedReferralCode) {
        const res = await checkIReferralIdIsValid(textDebouncedReferralCode);
        console.log(res);

        //FIX: this does't work, I dont know why!
        referralCodeInput.current.focus();
      }
    };
    check4ValidRefferalCode();
  }, [textDebouncedReferralCode]);

  useEffect(() => {
    referralIdResponse?.error?.data && referralCodeInput.current.focus();
  }, [referralIdResponse]);

  //On form submitted
  const handleOnSubmitRegisterForm = async () => {
    const captchaToken = reCapthchaRef.current.getValue();
    const data = { ...registerForm.values };

    data["BirthDate"] = {
      Day: registerForm.values.BirthDate.Day.val,
      Month: registerForm.values.BirthDate.Month.val,
      Year: registerForm.values.BirthDate.Year.val,
    };
    data["Citizenship"] = registerForm.values.Citizenship.val;
    data["Country"] = registerForm.values.Country.val;

    data["IdentityNo"] = reFormattedIdentityNumber(
      registerForm.values.IdentityNo,
    );

    console.log("Reformatted Register Form  : ", data);
    console.log("All errors are gone and the form has submitted");
    try {
      const resp = await newRegisteration(data, captchaToken);

      //There is an error
      if (queryResult.isError(resp) || queryResult.isWarning(resp)) {
        //TODO: remove the resetForm comment, they need to refill the form
        // on production
        if (queryResult.isWarning(resp)) {
          // registerForm.resetForm();
        }
        return toast.error(resp.error?.data?.Message);
      }

      //On success
      if (queryResult.isSuccess(resp)) {
        //TODO: Set the token to the store
        //registerForm.resetForm();

        return toast.success(resp.error?.data?.Message);
      }
    } catch (error) {
      return toast.error(t("unknownRequestErrorMessage"));
    }
  };

  //Add '9' foreing persons
  const reFormattedIdentityNumber = () => {
    let number = registerForm.values.IdentityNo;
    if (registerForm.values.Citizenship.val != "tr") {
      number = `9${number}`;
    }

    return number;
  };

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
      <Title text="Sign in to Hepbit" />
      <Form
        formInstance={registerForm}
        isLoading={regitrationResponse.isLoading}
      >
        <div className="login-form">
          <div className="form-inputs">
            <TextBox
              formInstance={registerForm}
              label={t("email")}
              type="email"
              name="email"
              placeholder={t("emailInputPlaceholder")}
              value={registerForm.values.Email}
              setValue={(value) => registerForm.setFieldValue("Email", value)}
            />
            <PhoneInput
              label={t("phoneNumber")}
              onChange={(e) => registerForm.setFieldValue("PhoneNumber", e)}
            />
            <PasswordInputs isAgain formInstance={registerForm} />
            <TextBox
              formInstance={registerForm}
              label={t("referralId")}
              placeholder={t("referralIdPlaceholder")}
              name="ReferralCode"
              value={registerForm.values.ReferralCode}
              isLoading={referralIdResponse.isLoading}
              message={referralIdResponse?.error?.data?.Message || ""}
              setValue={(value) =>
                registerForm.setFieldValue("ReferralCode", value)
              }
              inputRef={referralCodeInput}
            />
            <FullNameInputs formInstance={registerForm} />
            <DateSelectBox formInstance={registerForm} />
            <CitizenshipNationalitySelector
              label={t("Citizenship")}
              formInstance={registerForm}
            />
            <TermAndPolicyCheckBox
              formInstance={registerForm}
              name="Agreement"
              value={registerForm.values.Agreement}
              setValue={(value) =>
                registerForm.setFieldValue("Agreement", value)
              }
            />
            <DeclarationCheckBox
              formInstance={registerForm}
              name="Declaration"
              value={registerForm.values.Declaration}
              setValue={(value) =>
                registerForm.setFieldValue("Declaration", value)
              }
            />

            {/* //TODO: Check if the stastus of the captcha is active */}
            <GoogleReCaptcha reCapthchaRef={reCapthchaRef} />
          </div>
        </div>

        <FormTriggerButton
          formInstance={registerForm}
          isLoading={regitrationResponse.isLoading}
          label="Login"
        />
      </Form>
    </AuthLayout>
  );
};

export default Register;
