import React from "react";
import "./index.scss";

const SubmitInput = ({ placeholder, icon, onChange, type = "text" }) => {
  return (
    <div className="submit-input-container">
      <input
        type={type}
        className="submit-input"
        placeholder={placeholder}
        onChange={onChange}
      />
      <span className="submit-input-icon">{icon}</span>
    </div>
  );
};

export default SubmitInput;
