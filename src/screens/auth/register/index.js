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
import LeftSide from "../leftSide";
import { authApi } from "@/services/auth";
import { referralApi } from "@/services/referral";
import { AuthLayout } from "@/layouts";

const RegisterTest = () => {
  const { t } = useTranslation();
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
  //On form submitted
  const handleOnSubmitRegisterForm = () => {
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
    newRegisteration(data, captchaToken);
  };

  //Add '9' foreing persons
  const reFormattedIdentityNumber = () => {
    let number = registerForm.values.IdentityNo;
    if (registerForm.values.Citizenship.val != "tr") {
      number = `9${number}`;
    }

    return number;
  };

  const handleOnReCaptchaChanged = (val) => {
    console.log(val);
  };

  //Check if given referralCode is valid
  const handleOnReferralIdInputBlur = () => {
    if (registerForm.values.ReferralCode)
      checkIReferralIdIsValid(registerForm.values.ReferralCode);
  };

  const HeaderLinkRender = () => {
    return (
      <p className="login-page-right-top-text">
        Don’t have an account?
        <span className="sign-up-for-free">Sign up for free</span>
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
              label="E-MAIL"
              type="email"
              name="email"
              placeholder="Type a valid e-mail address"
              value={registerForm.values.Email}
              setValue={(value) => registerForm.setFieldValue("Email", value)}
            />
            <PhoneInput
              label="Phone Number"
              onChange={(e) => registerForm.setFieldValue("PhoneNumber", e)}
            />
            <PasswordInputs isAgain formInstance={registerForm} />
            <TextBox
              formInstance={registerForm}
              label={t("referralId")}
              placeholder={t("referralIdPlaceholder")}
              name="referralId"
              onBlur={handleOnReferralIdInputBlur}
              value={registerForm.values.ReferralCode}
              isLoading={referralIdResponse.isLoading}
              message={referralIdResponse?.error?.data?.Message || ""}
              setValue={(value) =>
                registerForm.setFieldValue("ReferralCode", value)
              }
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
            <GoogleReCaptcha
              reCapthchaRef={reCapthchaRef}
              onChange={handleOnReCaptchaChanged}
            />
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

export default RegisterTest;
