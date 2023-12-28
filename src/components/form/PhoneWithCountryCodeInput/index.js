import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./index.scss";

const InputWithCountryCode = ({ onChange }) => {
  return (
    <PhoneInput
      inputClass="inputClass"
      containerClass="container"
      onChange={onChange}
      country={'tr'}
    />
  );
};

export default InputWithCountryCode;
