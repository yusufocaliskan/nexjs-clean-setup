import { useTranslation } from "@/app/i18n/client";
import { getSelectedLanguage } from "@/utils";

const FormikFormErrorDisplayer = ({ formInstance }) => {
  //Get the selected language
  //We use it to translate the errors of the form validations
  const lang = getSelectedLanguage();
  const { t } = useTranslation(lang);

  if (formInstance.errors)
    return Object.keys(formInstance.errors).map((key, index) => {
      return <div key={index}>{t(formInstance.errors[key])}</div>;
    });
  return <></>;
};
export default FormikFormErrorDisplayer;
