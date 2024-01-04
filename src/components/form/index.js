import toast from "react-hot-toast";
import ErrorDisplayer from "./ErrorsDisplayer";
import { useEffect } from "react";
import { appConfigs } from "@/configs";

const Form = ({ children, formInstance }) => {
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
    <form
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
    </form>
  );
};

export default Form;
