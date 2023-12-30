import FormikFormErrorDisplayer from "./FormikFormErrorDisplayer";

//Displaying fomr errors
const ErrorDisplayer = ({ formInstance }) => {
  return (
    <>
      {!formInstance.isValid && formInstance.submitCount > 0 && (
        <FormikFormErrorDisplayer formInstance={formInstance} />
      )}
    </>
  );
};

export default ErrorDisplayer;
