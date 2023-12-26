import FormikFormErrorDisplayer from "./FormikFormErrorDisplayer";

import { useRouter } from "next/router";
//Displaying fomr errors
const ErrorDisplayer = ({ formInstance }) => {
  return (
    <>
      <FormikFormErrorDisplayer formInstance={formInstance} />
    </>
  );
};

export default ErrorDisplayer;
