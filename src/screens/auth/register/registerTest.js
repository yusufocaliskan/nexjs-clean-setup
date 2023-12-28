"use client";
import "../auth.scss";
import Image from "next/image";
import LeftBG from "../../../../public/assets/images/auth/left-background.png";
import { useState } from "react";
import { CoolButton, TextBox, Title, EyeLine, EyeSlash } from "@/components";
import Form from "@/components/Form";
import { useFormik } from "formik";
import { registerFormValidations } from "@/validations/auth";

const RegisterTest = () => {
  const registerForm = useFormik({
    initialValues: {
      password: "",
      passwordAgain: "",
      email: "",
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
        <Title
          text="Sign in to Hepbit"
          desc="OR continue with e-mail"
          addDivider
        />
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
