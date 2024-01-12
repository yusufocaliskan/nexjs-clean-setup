import { countries } from "@/utils/countries";
import React, { useState } from "react";
import "./index.scss";

const CountrySelector = () => {
  const [selectedValue, setSelectedValue] = useState("");

  const handleCountryChange = (value) => {
    setSelectedValue(value);
  };

  return (
    <div className="country-selector">
      <select
        className="country-select"
        value={selectedValue}
        onChange={(e) => handleCountryChange(e.target.value)}
      >
        {countries.map((country) => (
          <option
            className="country-options"
            key={country.code}
            value={country.code}
          >
            {country.emoji} {country.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CountrySelector;
