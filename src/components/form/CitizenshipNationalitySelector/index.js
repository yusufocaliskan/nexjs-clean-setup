import { useEffect, useState } from "react";
import "./stye.scss";
import { SelectBox, TextBox } from "@/components";
import { useTranslation } from "@/app/i18n/client";
import countries from "@/store/statics/countries";
import nationalities from "@/store/statics/nationalities";
import { motion } from "framer-motion";
const CitizenshipNationalitySelector = ({ formInstance, label }) => {
  const { t } = useTranslation();
  const [getCountries, setCountries] = useState(countries.getAllCountries());
  const [getStoredCitizenship, setStoredCitizenship] = useState();

  useEffect(() => {
    //On citizenship selectbox has changed
    console.log(getStoredCitizenship, formInstance.values.Citizenship.val);
    if (formInstance.values.Citizenship.val == "tr") {
      setCountries([{ val: "tr", title: "Turkey" }]);
    } else {
      setCountries(countries.getAllCountries());
    }

    //TODO: try to find a way to get previous valies of forInstance
    //in order not use useState
    if (getStoredCitizenship != formInstance.values.Citizenship.val) {
      formInstance.setFieldValue("Country", "");
    }

    setStoredCitizenship(formInstance.values.Citizenship.val);
  }, [formInstance.values]);

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
          value={formInstance.values.Citizenship}
          setValue={(value) => formInstance.setFieldValue("Citizenship", value)}
        />

        {/* Displayed just for nontr citizenships */}
        {formInstance.values.Citizenship.val && (
          <SelectBox
            optionsData={getCountries}
            formInstance={formInstance}
            label={t("nationality")}
            placeholder={t("nationalityPlaceholder")}
            name="Country"
            value={formInstance.values.Country}
            setValue={(value) => formInstance.setFieldValue("Country", value)}
          />
        )}
      </div>

      {/* Turkish nationality  */}
      {formInstance.values.Country &&
        formInstance.values.Citizenship.val == "tr" && (
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="nationaly-id-wrapper"
          >
            <TextBox
              formInstance={formInstance}
              label={t("turkishNationalIdLabel")}
              placeholder={t("turkishNonationalIdPlaceholder")}
              name="IdentityNo"
              value={formInstance.values.IdentityNo}
              setValue={(value) =>
                formInstance.setFieldValue("IdentityNo", value)
              }
            />
          </motion.div>
        )}
      {/* None-Turkish  ID must start with 9  */}
      {formInstance.values.Country &&
        formInstance.values.Citizenship.val != "tr" && (
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="nationaly-id-wrapper"
          >
            <TextBox
              formInstance={formInstance}
              label={t("foreingNationalIdLabel")}
              placeholder={t("foreingNonationalIdPlaceholder")}
              name="IdentityNo"
              value={formInstance.values.IdentityNo}
              setValue={(value) =>
                formInstance.setFieldValue("IdentityNo", value)
              }
              leftSideRenderItem={<span>9</span>}
            />
          </motion.div>
        )}
    </>
  );
};

export default CitizenshipNationalitySelector;
