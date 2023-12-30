import { useTranslation } from "@/app/i18n/client";
import ErrorDisplayer from "./ErrorsDisplayer";

const Form = ({ children, onSubmit, formInstance }) => {
  const { t } = useTranslation();
  return (
    <form style={{ width: "100%" }} onSubmit={onSubmit}>
      <ErrorDisplayer formInstance={formInstance} />
      {children}
    </form>
  );
};

export default Form;
