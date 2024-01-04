import { useEffect, useState } from "react";
import "./stye.scss";
import { SelectBox } from "@/components";
import { useTranslation } from "@/app/i18n/client";

const DateSelectBox = ({ formInstance }) => {
  const [getDays, setDays] = useState([]);
  const [getMonths, setMonths] = useState([]);
  const [getYears, setYears] = useState([]);
  const { t } = useTranslation();

  //create options
  useEffect(() => {
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
  }, []);

  //Returns the number of days of the current month
  const getDaysInCurrentMonth = () => {
    const date = new Date();
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  return (
    <div className="date-selectbox-wrapper">
      <SelectBox
        optionsData={getDays}
        formInstance={formInstance}
        label={t("day")}
        placeholder={t("dayPlaceholder")}
        name="birthDay"
        value={formInstance.values.BirthDate.Day}
        setValue={(value) => formInstance.setFieldValue("BirthDate.Day", value)}
      />
      <SelectBox
        optionsData={getMonths}
        formInstance={formInstance}
        isSecure
        label={t("month")}
        placeholder={t("monthPlaceholder")}
        name="birthMonth"
        value={formInstance.values.BirthDate.Month}
        setValue={(value) =>
          formInstance.setFieldValue("BirthDate.Month", value)
        }
      />
      <SelectBox
        optionsData={getYears}
        formInstance={formInstance}
        isSecure
        label={t("year")}
        placeholder={t("yearPlaceholder")}
        name="birthYear"
        value={formInstance.values.BirthDate.Year}
        setValue={(value) => {
          return formInstance.setFieldValue("BirthDate.Year", value);
        }}
      />
    </div>
  );
};

export default DateSelectBox;
