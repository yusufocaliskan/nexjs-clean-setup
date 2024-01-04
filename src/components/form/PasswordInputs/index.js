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
        name="Password"
        value={formInstance.values.Password}
        setValue={(value) => formInstance.setFieldValue("Password", value)}
      />
      {isAgain && (
        <TextBox
          isSecure
          label={t("passwordAgain")}
          type="password"
          placeholder={t("passwordAgainPlaceholder")}
          name="ConfirmPassword"
          value={formInstance.values.ConfirmPassword}
          setValue={(value) =>
            formInstance.setFieldValue("ConfirmPassword", value)
          }
        />
      )}
    </div>
  );
};
export default PasswordInputs;
