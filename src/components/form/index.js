import { useTranslation } from "@/app/i18n/client";

const Form = ({ children, onSubmit, formInstance }) => {
  const { t } = useTranslation();
  return (
    <form style={{ width: "100%" }} onSubmit={onSubmit}>
      {!formInstance?.isValid && (
        <div style={{ textAlign: "center" }}>
          {t("required_fileds_message")}
        </div>
      )}
      {children}
    </form>
  );
};

export default Form;
