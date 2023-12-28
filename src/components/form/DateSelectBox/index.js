import { useEffect, useState } from "react";
import "./stye.scss";
import { SelectBox } from "@/components";

const DateSelectBox = ({ formInstance }) => {
  const [getDays, setDays] = useState([]);
  const [getMonths, setMonths] = useState([]);
  const [getYears, setYears] = useState([]);

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
        label="Day"
        placeholder="Day"
        name="birthDay"
        value={formInstance.values.birthDay}
        setValue={(value) => formInstance.setFieldValue("birthDay", value)}
      />
      <SelectBox
        optionsData={getMonths}
        formInstance={formInstance}
        isSecure
        label="Month"
        placeholder="Month"
        name="birthMonth"
        value={formInstance.values.birthMonth}
        setValue={(value) => formInstance.setFieldValue("birthMonth", value)}
      />
      <SelectBox
        optionsData={getYears}
        formInstance={formInstance}
        isSecure
        label="Year"
        placeholder="Year"
        name="birthYear"
        value={formInstance.values.birthYear}
        setValue={(value) => formInstance.setFieldValue("birthYear", value)}
      />
    </div>
  );
};

export default DateSelectBox;
