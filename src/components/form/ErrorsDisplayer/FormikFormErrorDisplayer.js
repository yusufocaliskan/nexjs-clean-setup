import { useTranslation } from "@/app/i18n/client";
import "./style.scss";
import { motion } from "framer-motion";

import { MdErrorOutline } from "react-icons/md";
import { useEffect, useState } from "react";
const FormikFormErrorDisplayer = ({ formInstance }) => {
  //Get the selected language
  //We use it to translate the errors of the form validations
  const { t } = useTranslation();

  const [getCurrentWindowWidth, setCurrentWindowWidth] = useState(
    window.innerWidth,
  );
  const [isErrorDisplayerOpen, setIsErrorDisplayerOpen] = useState(false);

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

  useEffect(() => {
    const handleGetSizeOftheWindow = (e) => {
      console.log(window.innerWidth);
      setCurrentWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleGetSizeOftheWindow);
    return () => {
      window.removeEventListener("resize", handleGetSizeOftheWindow);
    };
  }, []);

  useEffect(() => {
    if (getCurrentWindowWidth <= 800) {
      setIsErrorDisplayerOpen(false);
    } else {
      setIsErrorDisplayerOpen(true);
    }
  }, [getCurrentWindowWidth]);

  const RenderErrorsItem = ({ item }) => {
    return (
      <div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="form-errors"
      >
        {t(item)}
      </div>
    );
  };
  if (!formInstance.isValid)
    return (
      <div>
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="formik-error-popup"
          onClick={() => setIsErrorDisplayerOpen(!isErrorDisplayerOpen)}
        >
          <div className="error-displayer-title">
            {!formInstance?.isValid && isErrorDisplayerOpen && (
              <div className="text-box-label error-displayer-label ">
                {t("required_fileds_message")}
              </div>
            )}
            <div className="error-displayer-icon">
              <MdErrorOutline color="red" size="50px" />{" "}
            </div>
          </div>
          {isErrorDisplayerOpen && (
            <DisplayError errors={Object.keys(formInstance?.errors)} />
          )}
        </motion.div>
      </div>
    );
  return <></>;
};
export default FormikFormErrorDisplayer;
