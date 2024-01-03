import React from "react";
import { useState } from "react";
import "../../../screens/auth/forgot-password/index.scss";
import "../TextBox/stye.scss";

const VerificationCode = ({
  verificationCode,
  setVerificationCode,
  formInstance,
}) => {
  const inputRefs = Array.from({ length: 6 }, () => React.createRef());
  const isError = formInstance?.errors[name] && formInstance.submitCount > 0;

  const handleInputChange = (index, value) => {
    const newVerificationCode = [...verificationCode];
    newVerificationCode[index] = value;
    setVerificationCode(newVerificationCode);

    if (value !== "" && index < 5) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && index > 0 && verificationCode[index] === "") {
      inputRefs[index - 1].current?.focus();
    }
  };
  return (
    <div className="verification-div">
      {verificationCode.map((value, index) => (
        <input
          className={` verification-inputs ${value && "text-box-has-val-input"} 
          ${isError && "text-box-errorred-input"}`}
          key={index}
          ref={inputRefs[index]}
          type="text"
          maxLength="1"
          value={value}
          onChange={(e) => handleInputChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
        />
      ))}
    </div>
  );
};

export default VerificationCode;
