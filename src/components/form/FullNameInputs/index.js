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
        name="name"
        value={formInstance.values.name}
        setValue={(value) => formInstance.setFieldValue("name", value)}
      />
      <TextBox
        formInstance={formInstance}
        label={t("surname")}
        placeholder={t("surnamePlaceholder")}
        name="surname"
        value={formInstance.values.surname}
        setValue={(value) => formInstance.setFieldValue("surname", value)}
      />
    </div>
  );
};
export default FullNameInputs;
