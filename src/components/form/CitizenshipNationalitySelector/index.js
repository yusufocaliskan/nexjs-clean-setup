import { useEffect, useState } from "react";
import "./stye.scss";
import { SelectBox } from "@/components";
import { useTranslation } from "@/app/i18n/client";
import countries from "@/store/statics/countries";

const DateSelectBox = ({ formInstance }) => {
  const [getDays, setDays] = useState([]);
  const [getMonths, setMonths] = useState([]);
  const [getYears, setYears] = useState([]);
  const { t } = useTranslation();

  //create options
  useEffect(() => {
    console.log(countries.getAllCountries());
    const days = [];
    const months = [];
    const years = [];

    for (let d = 1; d <= getDaysInCurrentMonth(); d++) {
      days.push({ val: d });
    }
    for (let m = 1; m <= 12; m++) {
      months.push({ val: m });
    }
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const startYear = "1945";

    for (let y = startYear; y <= currentYear; y++) {
      years.push({ val: y });
    }

    setDays(days);
    setMonths(months);
    setYears(years);
    console.log(formInstance.citizenship);
  }, []);

  //Returns the number of days of the current month
  const getDaysInCurrentMonth = () => {
    const date = new Date();
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const handleMakeSelection = (val) => {
    //setIsOptionOpen(false);
    console.log(val);
    formInstance.setFieldValue("citizenship", val);
  };

  return (
    <div className="date-selectbox-wrapper">
      <SelectBox
        formInstance={formInstance}
        label={t("day")}
        placeholder={t("dayPlaceholder")}
        name="citizenship"
        value={formInstance.values.citizenship}
        setValue={(value) => formInstance.setFieldValue("citizenship", value)}
        RenderOption={() => {
          return countries.getAllCountries().map((item, index) => {
            console.log(formInstance.citizenship, item.value);
            return (
              <div
                key={index}
                onClick={() => handleMakeSelection(item.value.replace("'", ""))}
                className={`
                    selectbox-item ${
                      formInstance.citizenship == item.value.replace("'", "") &&
                      "selectbox-selected-item"
                    }`}
              >
                <span>{item.text}</span>
              </div>
            );
          });
        }}
      />
      <SelectBox
        optionsData={getMonths}
        formInstance={formInstance}
        isSecure
        label={t("month")}
        placeholder={t("monthPlaceholder")}
        name="birthMonth"
        value={formInstance.values.birthMonth}
        setValue={(value) => formInstance.setFieldValue("birthMonth", value)}
      />
    </div>
  );
};

export default DateSelectBox;
