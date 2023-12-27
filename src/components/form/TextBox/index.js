import { EyeSlash, EyeLine } from "@/components/";
import "./stye.scss";
import { useEffect, useState } from "react";

const TextBox = ({
  value,
  placeholder,
  isSecure = false,
  setValue,
  type = "text",
  label,
  name,
  formInstance,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleOnKeyDown = (e) => {
    setValue(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="text-box-wrapper">
      <label>
        <p className="text-box-label">{label}</p>
        <input
          placeholder={placeholder}
          className="text-box-input"
          type={showPassword ? "text" : type}
          value={value}
          onChange={handleOnKeyDown}
        />
      </label>
      {formInstance?.errors[name] && (
        <div className="text-box-errors">{formInstance?.errors[name]}</div>
      )}
      {isSecure && (
        <span className="password-toggle" onClick={togglePasswordVisibility}>
          {showPassword ? <EyeSlash /> : <EyeLine />}
        </span>
      )}
    </div>
  );
};

export default TextBox;
