import { useTranslation } from "@/app/i18n/client";
import "./style.scss";
import { motion } from "framer-motion";
const FormikFormErrorDisplayer = ({ formInstance }) => {
  //Get the selected language
  //We use it to translate the errors of the form validations
  const { t } = useTranslation();

  const DisplayError = ({ errors, subKey }) => {
    return errors.map((key, index) => {
      let item = formInstance?.errors[key];

      if (subKey) {
        item = formInstance?.errors[subKey][key];
      }

      const isObject =
        item !== null && typeof item === "object" && !Array.isArray(item);

      if (isObject) {
        return (
          <DisplayError key={index} errors={Object.keys(item)} subKey={key} />
        );
      }
      return <RenderErrorsItem key={index} item={item} />;
    });
  };

  const RenderErrorsItem = ({ item }) => {
    return <div className="form-errors">{t(item)}</div>;
  };

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
        <DisplayError errors={Object.keys(formInstance?.errors)} />
      </motion.div>
    );
  return <></>;
};
export default FormikFormErrorDisplayer;
