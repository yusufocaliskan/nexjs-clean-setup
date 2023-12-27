import FormikFormErrorDisplayer from "./FormikFormErrorDisplayer";

//Displaying fomr errors
const ErrorDisplayer = ({ formInstance }) => {
  return (
    <>
      <FormikFormErrorDisplayer formInstance={formInstance} />
    </>
  );
};

export default ErrorDisplayer;
