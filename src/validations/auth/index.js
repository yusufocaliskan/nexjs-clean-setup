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
});

//Login form
export const loginFormValidations = yup.object().shape({
  password: yup
    .string()
    .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/)
    .required(),
  email: yup.string().email().required(),
});

export const forgotPasswordLastStepFormValidations = yup.object().shape({
  password: yup
    .string()
    .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/)
    .required(),
  passwordAgain: yup
    .string()
    .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/)
    .required(),
  email: yup.string().email().required(),
});

export const forgotPasswordFirstStepFormValidations = yup.object().shape({
  email: yup.string().email().required(),
});

export const forgotPasswordSecondStepFormValidations = yup.object().shape({
  verificationCode: yup
    .array()
    .of(
      yup
        .mixed()
        .test(
          "isValidCode",
          "Doğrulama kodu rakamlardan oluşmalıdır",
          (value) => /^\d$/.test(value),
        )
        .required("Doğrulama kodu boş bırakılamaz"),
    )
    .min(6, "Doğrulama kodu 6 karakterden oluşmalıdır")
    .max(6, "Doğrulama kodu 6 karakterden oluşmalıdır"),
});
