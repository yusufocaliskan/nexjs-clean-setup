"use client";
import "../auth.scss";
import Image from "next/image";
import LeftBG from "../../../../public/assets/images/auth/left-background.png";
import {
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
import Form from "@/components/form";
import { useFormik } from "formik";
import { registerFormValidations } from "@/validations/auth";
import { useTranslation } from "@/app/i18n/client";
import { useRef } from "react";

const RegisterTest = () => {
  const { t } = useTranslation();
  const reCapthchaRef = useRef();

  //form validations
  const registerForm = useFormik({
    initialValues: {
      password: "",
      passwordAgain: "",
      email: "",
      citizenship: "",
      nationalId: "",
      referralId: "",
      birthDay: "",
      termAndPolicy: false,
      declaration: false,
    },
    validationSchema: registerFormValidations,
    onSubmit: () => handleOnSubmitRegisterForm(),
  });

  const handleOnSubmitRegisterForm = (vals) => {
    const isRecaptchaValid = reCapthchaRef.current.getValue();
    console.log("All errors gone and form submitted");
  };

  const handleOnReCaptchaChanged = (val) => {
    console.log(val);
  };

  return (
    <div className="login-page-container">
      <div className="login-page-left-background">
        <Image src={LeftBG} alt="left logo" />{" "}
      </div>
      <div className="login-page-right">
        <div className="login-page-right-top">
          <div className="login-page-right-top-logo"></div>
          <p className="login-page-right-top-text">
            Don’t have an account?
            <span className="sign-up-for-free">Sign up for free</span>
          </p>
        </div>

        <div className="login-page-right-content">
          <Title text="Sign in to Hepbit" />
          <Form
            onSubmit={registerForm.handleSubmit}
            formInstance={registerForm}
          >
            <div className="login-form">
              <div className="form-inputs">
                <TextBox
                  formInstance={registerForm}
                  label="E-MAIL"
                  type="email"
                  name="email"
                  placeholder="Type a valid e-mail address"
                  value={registerForm.values.email}
                  setValue={(value) =>
                    registerForm.setFieldValue("email", value)
                  }
                />

                <PhoneInput
                  label="Phone Number"
                  onChange={(e) => console.log(e)}
                />
                <PasswordInputs isAgain formInstance={registerForm} />
                <TextBox
                  formInstance={registerForm}
                  label={t("referralId")}
                  placeholder={t("referralIdPlaceholder")}
                  name="referralId"
                  value={registerForm.values.referralId}
                  setValue={(value) =>
                    registerForm.setFieldValue("referralId", value)
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
                  name="termAndPolicy"
                  value={registerForm.values.termAndPolicy}
                  setValue={(value) =>
                    registerForm.setFieldValue("termAndPolicy", value)
                  }
                />
                <DeclarationCheckBox
                  formInstance={registerForm}
                  name="declaration"
                  value={registerForm.values.declaration}
                  setValue={(value) =>
                    registerForm.setFieldValue("declaration", value)
                  }
                />
                <GoogleReCaptcha
                  reCapthchaRef={reCapthchaRef}
                  onChange={handleOnReCaptchaChanged}
                />
              </div>
            </div>

            <FormTriggerButton label="Login" />
          </Form>
        </div>
      </div>
    </div>
  );
};

export default RegisterTest;
