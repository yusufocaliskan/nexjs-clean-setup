import { useTranslation } from "@/app/i18n/client";
import { usePathname, useSearchParams } from "next/navigation";

const FormikFormErrorDisplayer = ({ formInstance }) => {
  //Get the selected language
  //We use it to translate the errors of the form validations
  const path = usePathname();
  const lang = path.substring(1).split("/")[0];
  const { t } = useTranslation(lang);

  if (formInstance.errors)
    return Object.keys(formInstance.errors).map((key, index) => {
      return <div key={index}>{t(formInstance.errors[key])}</div>;
    });
  return <></>;
};
export default FormikFormErrorDisplayer;
