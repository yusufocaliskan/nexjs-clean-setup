import * as yup from 'yup';
export const changePasswordValidations = yup.object().shape({
  CurrentPassword: yup
    .string()
    .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/)
    .required(),
  ConfirmNewPassword: yup
    .string()
    .oneOf([yup.ref('NewPassword'), null], 'Passwords must match')
    .required(),
  NewPassword: yup
    .string()
    .oneOf([yup.ref('ConfirmNewPassword'), null], 'Passwords must match')
    .required(),
});
