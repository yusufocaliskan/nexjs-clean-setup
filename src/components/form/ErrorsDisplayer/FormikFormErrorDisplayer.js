import { useTranslation } from "@/app/i18n/client";
import "./style.scss";
import { motion } from "framer-motion";
const FormikFormErrorDisplayer = ({ formInstance }) => {
  //Get the selected language
  //We use it to translate the errors of the form validations
  const { t } = useTranslation();

  if (formInstance?.errors)
    return (
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="formik-error-popup"
      >
        {!formInstance?.isValid && (
          <div className="text-box-label">{t("required_fileds_message")}</div>
        )}
        {Object.keys(formInstance?.errors).map((key, index) => {
          return (
            <div className="form-errors" key={index}>
              {t(formInstance.errors[key])}
            </div>
          );
        })}
      </motion.div>
    );
  return <></>;
};
export default FormikFormErrorDisplayer;
