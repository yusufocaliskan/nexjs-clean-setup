import { useEffect, useState } from "react";
import "./stye.scss";
import { SelectBox, TextBox } from "@/components";
import { useTranslation } from "@/app/i18n/client";
import countries from "@/store/statics/countries";
import nationalities from "@/store/statics/nationalities";

const CitizenshipNationalitySelector = ({ formInstance, label }) => {
  const { t } = useTranslation();
  const [getCountries, setCountries] = useState(countries.getAllCountries());

  useEffect(() => {
    //On citizenship selectbox has changed
    if (formInstance.values.citizenship.val == "tr") {
      setCountries([{ val: "tr", title: "Turkey" }]);
      formInstance.setFieldValue("nationality", "");
    } else {
      setCountries(countries.getAllCountries());
      formInstance.setFieldValue("nationality", "");
    }
  }, [formInstance.values.citizenship]);

  //Returns the number of days of the current month
  return (
    <>
      {/* <div style={{ marginBottom: "-1rem" }} className="text-box-label"> */}
      {/*   {label} */}
      {/* </div> */}

      <div className="date-selectbox-wrapper">
        <SelectBox
          optionsData={nationalities.getAllNationalities()}
          formInstance={formInstance}
          label={t("citizenship")}
          placeholder={t("citizenshipPlaceholder")}
          name="citizenship"
          value={formInstance.values.citizenship}
          setValue={(value) => formInstance.setFieldValue("citizenship", value)}
        />

        {/* Displayed just for nontr citizenships */}
        {formInstance.values.citizenship.val && (
          <SelectBox
            optionsData={getCountries}
            formInstance={formInstance}
            label={t("nationality")}
            placeholder={t("nationalityPlaceholder")}
            name="citizenship"
            value={formInstance.values.nationality}
            setValue={(value) =>
              formInstance.setFieldValue("nationality", value)
            }
          />
        )}
      </div>

      {/* Turkish nationality  */}
      {formInstance.values.nationality &&
        formInstance.values.citizenship.val == "tr" && (
          <div className="nationaly-id-wrapper">
            <TextBox
              formInstance={formInstance}
              label={t("turkishNationalIdLabel")}
              placeholder={t("turkishNonationalIdPlaceholder")}
              name="tukishNationalId"
              value={formInstance.values.tukishNationalId}
              setValue={(value) =>
                formInstance.setFieldValue("tukishNationalId", value)
              }
            />
          </div>
        )}
      {/* None-Turkish  ID must start with 99  */}
      {formInstance.values.nationality &&
        formInstance.values.citizenship.val !== "tr" && (
          <div className="nationaly-id-wrapper">
            <TextBox
              formInstance={formInstance}
              label={t("foreingNationalIdLabel")}
              placeholder={t("foreingNonationalIdPlaceholder")}
              name="foreingNationalId"
              value={formInstance.values.foreingNationalId}
              setValue={(value) =>
                formInstance.setFieldValue("foreingNationalId", value)
              }
              leftSideRenderItem={<span>9</span>}
            />
          </div>
        )}
    </>
  );
};

export default CitizenshipNationalitySelector;
