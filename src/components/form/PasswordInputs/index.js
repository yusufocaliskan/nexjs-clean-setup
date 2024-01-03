import { TextBox } from "@/components";
import "./stye.scss";
import { useTranslation } from "@/app/i18n/client";
const PasswordInputs = ({ formInstance, isAgain }) => {
  const { t } = useTranslation();
  return (
    <div className="password-inputs-wrapper">
      <TextBox
        formInstance={formInstance}
        isSecure
        label={t("loginPagePassword")}
        type="password"
        placeholder={t("passwordPlaceholder")}
        name="password"
        value={formInstance.values.password}
        setValue={(value) => formInstance.setFieldValue("password", value)}
      />
      {isAgain && (
        <TextBox
          isSecure
          label={t("passwordAgain")}
          type="password"
          placeholder={t("passwordAgainPlaceholder")}
          name="passwordAgain"
          value={formInstance.values.passwordAgain}
          setValue={(value) =>
            formInstance.setFieldValue("passwordAgain", value)
          }
        />
      )}
    </div>
  );
};
export default PasswordInputs;
