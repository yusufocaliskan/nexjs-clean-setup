"use client";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import "../auth.scss";
import { useFormik } from "formik";
import { loginFormValidations } from "@/validations/auth";
import { CoolButton, TextBox } from "@/components";
import { useEffect } from "react";
import Form from "@/components/Form";
import toast from "react-hot-toast";
import { useTranslation } from "@/app/i18n/client";

const Login = ({ lng }) => {
  const { t } = useTranslation(lng);

  //Checking for the login formm
  const loginForm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginFormValidations,
    onSubmit: (values) => {
      toast.success("Good!");
      console.log("Submitteedd", values);
    },
  });

  useEffect(() => {
    console.log(loginForm.errors);
  }, [loginForm]);

  return (
    <div className="login-page-container">
      <div className="login-page-left-background" />

      <div>
        <div>
          <ThemeSwitcher />
        </div>
        <div>
          <Form onSubmit={loginForm.handleSubmit} formInstance={loginForm}>
            <div>
              <TextBox
                label={t("email")}
                value={loginForm.values.email}
                setValue={(value) => loginForm.setFieldValue("email", value)}
              />
            </div>
            <div>
              <TextBox
                label={t("password")}
                value={loginForm.values.password}
                setValue={(value) => loginForm.setFieldValue("password", value)}
              />
            </div>
            <CoolButton label="Submitooo" type="submit" />
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
