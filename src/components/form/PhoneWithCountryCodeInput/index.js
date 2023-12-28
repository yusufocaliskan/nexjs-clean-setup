import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./index.scss";

const InputWithCountryCode = ({ onChange, label }) => {
  return (
    <div className="text-box-wrapper">
      <div className="text-box-label">{label}</div>
      <PhoneInput
        inputClass="inputClass"
        containerClass="container"
        onChange={onChange}
        country={"tr"}
      />
    </div>
  );
};

export default InputWithCountryCode;
