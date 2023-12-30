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
  name: yup
    .string()
    .matches(
      /^[a-zA-ZığşàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžĞŞİÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð]+(([ ][a-zA-ZışğàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžŞĞİÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ])?[a-zA-ZığşàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžŞİĞÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð]*)*$/g,
    )
    .required(),
  surname: yup
    .string()
    .matches(
      /^[a-zA-ZığşàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžĞŞİÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð]+(([ ][a-zA-ZışğàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžŞĞİÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ])?[a-zA-ZığşàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžŞİĞÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð]*)*$/g,
    )
    .required(),
  email: yup.string().email().required(),
  password: yup
    .string()
    .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/)
    .required("Password must contain A-Z and at least 8 chraacters"),
  passwordAgain: yup.string().required(),
  referralId: yup.string(),

  birthDay: yup.object().required(),
  birthMonth: yup.object().required(),
  birthYear: yup.object().required(),
  citizenship: yup.object().required(),
  nationality: yup.object().required(),
  foreingNationalId: yup.string().required(),
  tukishNationalId: yup.string().check4ValidIndentity().required(),
  nationalId: yup.number().required(),
});

//Login form
export const loginFormValidations = yup.object().shape({
  password: yup.string().required(),
  email: yup.string().email(),
});
