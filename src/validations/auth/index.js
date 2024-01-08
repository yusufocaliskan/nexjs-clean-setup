import { isTurkishIdentity } from "@/utils";
import * as yup from "yup";

//Check valid nationali ID number
yup.addMethod(yup.string, "check4ValidIndentity", function (errorMessage) {
  return this.test(`check-nationalId-number`, errorMessage, function (value) {
    return isTurkishIdentity(value);
  });
});

//Register Form
export const registerFormValidations = yup.object().shape({
  Email: yup.string().email().required(),
  PhoneNumber: yup.string().required(),
  Password: yup.string().required(),
  ConfirmPassword: yup
    .string()
    .oneOf([yup.ref("Password"), null], "Passwords must match")
    .required(),

  ReferralCode: yup.string(),
  Agreement: yup
    .boolean()
    .required()
    .test("is-true", "Agreement must be accepted", (value) => value === true),
  Declaration: yup
    .boolean()
    .required()
    .test("is-true", "Declaration must be accepted", (value) => value === true),
  FirstName: yup.string().required(),
  LastName: yup.string().required(),
  BirthDate: yup.object().shape({
    Day: yup.object().required(),
    Month: yup.object().required(),
    Year: yup.object().required(),
  }),
  Citizenship: yup.object().required(),
  Country: yup.object().required(),
  IdentityNo: yup.string().check4ValidIndentity().required(),

  reCaptcha: yup.string().required(),
});

//Login form
export const loginFormValidations = yup.object().shape({
  Password: yup
    .string()
    .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/)
    .required(),
  Email: yup.string().email().required(),
  reCaptcha: yup.string().required(),
});

export const resetPasswordFormValidations = yup.object().shape({
  Password: yup
    .string()
    .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/)
    .required(),
  ConfirmPassword: yup
    .string()
    .oneOf([yup.ref("Password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  Email: yup.string().email().required(),

  reCaptcha: yup.string().required(),
});

export const deletePasswordFormValidations = yup.object().shape({
  Email: yup.string().email().required(),
  reCaptcha: yup.string().required(),
});

export const forgotPasswordSecondStepFormValidations = yup.object().shape({
  Token: yup
    .array()
    .of(
      yup
        .mixed()
        .test("isValidCode", "codeMustBeNumber", (value) => /^\d$/.test(value))
        .required("verificationCodeisRequired"),
    )
    .min(6, "codeMustBeMin6")
    .max(6, "codeMustBeMax6"),
});

//REgister Verification screen
export const registerVerificationFormValidations = yup.object().shape({
  Token: yup
    .array()
    .of(
      yup
        .mixed()
        .test("isValidCode", "codeMustBeNumber", (value) => /^\d$/.test(value))
        .required("verificationCodeisRequired"),
    )
    .min(6, "codeMustBeMin6")
    .max(6, "codeMustBeMax6"),
});
