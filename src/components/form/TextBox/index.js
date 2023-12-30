import { EyeSlash, EyeLine } from "@/components/";
import "./stye.scss";
import { useState } from "react";

const TextBox = ({
  value,
  placeholder,
  isSecure = false,
  setValue,
  type = "text",
  label,
  name,
  formInstance,

  icon

  leftSideRenderItem,
main
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isError = formInstance?.errors[name] && formInstance.submitCount > 0;

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
        {leftSideRenderItem && (
          <div className="left-side-of-input">{leftSideRenderItem}</div>
        )}
        <input
          placeholder={placeholder}
          className={` text-box-input ${value && "text-box-has-val-input"} 
            ${isError && "text-box-errorred-input"}`}
          style={leftSideRenderItem && { textIndent: 25 }}
          type={showPassword ? "text" : type}
          value={value}
          onChange={handleOnKeyDown}
        />
      </label>

      {isSecure && (
        <span className="password-toggle" onClick={togglePasswordVisibility}>
          {showPassword ? <EyeSlash /> : <EyeLine />}
        </span>
      )}
      {icon && (
        <span className="password-toggle" onClick={togglePasswordVisibility}>
          {icon}
        </span>
      )}
    </div>
  );
};

export default TextBox;
