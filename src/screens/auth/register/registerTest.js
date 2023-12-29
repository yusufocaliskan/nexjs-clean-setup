"use client";
import "../auth.scss";
import Image from "next/image";
import LeftBG from "../../../../public/assets/images/auth/left-background.png";
import {
  CoolButton,
  TextBox,
  Title,
  PasswordInputs,
  PhoneInput,
  FullNameInputs,
  DateSelectBox,
  CitizenshipNationalitySelector,
} from "@/components";
import Form from "@/components/form";
import { useFormik } from "formik";
import { registerFormValidations } from "@/validations/auth";
import { useTranslation } from "@/app/i18n/client";

const RegisterTest = () => {
  const { t } = useTranslation();

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
    },
    validationSchema: registerFormValidations,
    onSubmit: () => console.log("Res"),
  });

  const handleOnSubmitRegisterForm = () => {
    console.log("handleOnSubmitRegisterForm");
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
        <Title text="Sign in to Hepbit" />
        <div className="login-page-right-content">
          <Form
            onSubmit={handleOnSubmitRegisterForm}
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
                <PasswordInputs formInstance={registerForm} />
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
                <CitizenshipNationalitySelector formInstance={registerForm} />
                <TextBox
                  formInstance={registerForm}
                  isSecure
                  label="PASSWORD"
                  type="password"
                  placeholder="Let's create a strong password."
                  name="password"
                  value={registerForm.values.password}
                  setValue={(value) =>
                    registerForm.setFieldValue("password", value)
                  }
                />
                <TextBox
                  formInstance={registerForm}
                  isSecure
                  label="PASSWORD AGAIN"
                  type="password"
                  name="passwordAgain"
                  placeholder="Enter your password again"
                  value={registerForm.values.passwordAgain}
                  setValue={(value) =>
                    registerForm.setFieldValue("passwordAgain", value)
                  }
                />

                <div className="scan-and-forgot">
                  <p className="scan-login">Scan to login</p>
                  <p className="forgot-password">Forgot Password?</p>
                </div>
                <div className="login-btn-area">
                  <CoolButton className="login-btn" label="Login" />
                </div>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default RegisterTest;
