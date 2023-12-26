import * as yup from "yup";

//Register Form
export const registerFormValidations = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email(),
  nationalId: yup.number().integer().required(),
});

//Login form
export const loginFormValidations = yup.object().shape({
  password: yup.string().required(),
  email: yup.string().email(),
});
