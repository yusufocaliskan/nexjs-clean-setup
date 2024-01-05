import toast from "react-hot-toast";
import ErrorDisplayer from "./ErrorsDisplayer";
import { useEffect, useState } from "react";
import { appConfigs } from "@/configs";
import GiantLoaderAnimation from "../LoadingGif/GiantLoaderAnimation";
import { motion } from "framer-motion";

const Form = ({ children, formInstance, isLoading, setIsLoading }) => {
  //set a max post request
  useEffect(() => {
    if (formInstance.submitCount >= appConfigs.form.maxFormRequestSize) {
      toast.error(
        "You have riched the maximum post of the form. Please fill the form again.",
      );
      formInstance.resetForm();
    }
  }, [formInstance.submitCount]);

  return (
    <>
      <GiantLoaderAnimation isOpen={isLoading} setIsLoading={setIsLoading} />
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
        <ErrorDisplayer formInstance={formInstance} />
        {children}
      </motion.form>
    </>
  );
};

export default Form;
