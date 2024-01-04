import { TextBox } from "@/components";
import "./stye.scss";
import { useTranslation } from "@/app/i18n/client";

const FullNameInputs = ({ formInstance }) => {
  const { t } = useTranslation();

  return (
    <div className="fullname-inputs-wrapper">
      <TextBox
        formInstance={formInstance}
        label={t("name")}
        placeholder={t("namePlaceholder")}
        name="FirstName"
        value={formInstance.values.FirstName}
        setValue={(value) => formInstance.setFieldValue("FirstName", value)}
      />
      <TextBox
        formInstance={formInstance}
        label={t("surname")}
        placeholder={t("surnamePlaceholder")}
        name="LastName"
        value={formInstance.values.LastName}
        setValue={(value) => formInstance.setFieldValue("LastName", value)}
      />
    </div>
  );
};
export default FullNameInputs;
