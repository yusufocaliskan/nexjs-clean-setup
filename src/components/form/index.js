import toast from "react-hot-toast";
import ErrorDisplayer from "./ErrorsDisplayer";
import { useEffect } from "react";
import { appConfigs } from "@/configs";
import GiantLoaderAnimation from "../LoadingGif/GiantLoaderAnimation";
import { motion } from "framer-motion";
import { useTranslation } from "@/app/i18n/client";
import { FormTriggerButton, GoogleReCaptcha, Spacer } from "@/components";

const Form = ({
  children,
  formInstance,
  dontDisplayErrors = false,
  dontDisplayCaptcha = false,
  submitButtonText = "Custom Text",
  captchaRef,
  onRecaptchaChanged,
  isLoading,
  setIsLoading,
}) => {
  const { t } = useTranslation();

  //set a max post request
  useEffect(() => {
    if (formInstance.submitCount >= appConfigs.form.maxFormRequestSize) {
      formInstance.resetForm();
      toast.error(t("maxFormRequestSizeText"));
      //setIsFormReachedMaxTresholde(true);
    }
  }, [formInstance.submitCount]);

  return (
    <>
      {/* //TODO: Try to find a better desing of GiantLoaderAnimation */}
      {/* {isLoading && ( */}
      {/*   <GiantLoaderAnimation isOpen={isLoading} setIsLoading={setIsLoading} /> */}
      {/* )} */}
      <motion.form
        initial={{ opacity: 0.5, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
        }}
        onSubmit={formInstance.handleSubmit}
      >
        {/* Do not display any erro till first submit */}
        {!dontDisplayErrors && formInstance.submitCount > 0 && (
          <ErrorDisplayer formInstance={formInstance} />
        )}
        {children}

        {/* //TODO: Check if the stastus of the captcha is active */}
        {!dontDisplayCaptcha && (
          <GoogleReCaptcha
            onChange={(val) => formInstance.setFieldValue("reCaptcha", val)}
            reCapthchaRef={captchaRef}
          />
        )}

        <FormTriggerButton
          formInstance={formInstance}
          isLoading={formInstance.isLoading}
          label={submitButtonText}
        />

        <Spacer />
      </motion.form>
    </>
  );
};

export default Form;
