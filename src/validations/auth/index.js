import * as yup from "yup";

//Register Form
export const registerFormValidations = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
  passwordAgain: yup.string().required(),
  referralId: yup.string(),
  name: yup.string().required(),
  surname: yup.string().required(),
  birthDay: yup.number().required(),
  birthMonth: yup.number().required(),
  birthYear: yup.number().required(),
  nationalId: yup.number().integer().required(),
});

//Login form
export const loginFormValidations = yup.object().shape({
  password: yup.string().required(),
  email: yup.string().email(),
});
