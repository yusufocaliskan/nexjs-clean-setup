import "./stye.scss";

const CheckBox = ({ value, setValue, name, formInstance, rightSideText }) => {
  const isError = formInstance?.errors[name] && formInstance.submitCount > 0;

  const handleOnKeyDown = (e) => {
    setValue(!value);
  };

  return (
    <label className="checkbox-box-wrapper">
      <span class="checkmark"></span>
      <input
        className={` text-box-input ${value && "text-box-has-val-input"} 
            ${isError && "text-box-errorred-input"}`}
        type="checkbox"
        value={value}
        onChange={handleOnKeyDown}
      />
      <div>{rightSideText}</div>
    </label>
  );
};

export default CheckBox;
