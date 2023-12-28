import { useState } from "react";
import "./stye.scss";
import ChevronDownIcon from "@/components/Icons/ChevronDownIcon";
import ChevronUpIcon from "@/components/Icons/ChevronUpIcon";

const SelectBox = ({
  value,
  placeholder,
  setValue,
  label,
  name,
  formInstance,
  optionsData,
  RenderOption,
}) => {
  const [isOptionOpen, setIsOptionOpen] = useState(false);

  //Setting the selected options
  const handleMakeSelection = (val) => {
    setValue(val);
    setIsOptionOpen(false);
  };

  const RenderItem = ({ data }) => {
    if (RenderOption) {
      return <RenderOption optionsData={optionsData} />;
    }
    return data.map((item, index) => {
      return (
        <div
          key={index}
          className={`
                    selectbox-item ${
                      value == item.val && "selectbox-selected-item"
                    }`}
          onClick={() => handleMakeSelection(item.val)}
        >
          <span>{item.val}</span>
        </div>
      );
    });
  };

  return (
    <div className="text-box-wrapper">
      <p className="text-box-label">{label}</p>
      <div
        placeholder={placeholder}
        className="text-box-input selectbox-container"
        style={{ height: 52 }}
        value={value}
        onClick={() => setIsOptionOpen(!isOptionOpen)}
      >
        {value && <span className="selectbox-selected">{value}</span>}
        {!value && <span className="selectbox-placeholder">{placeholder}</span>}
        <span className="selectbox-arrow">
          {!isOptionOpen && <ChevronDownIcon width={15} />}
          {isOptionOpen && <ChevronUpIcon width={15} />}
        </span>
      </div>

      {formInstance?.errors[name] && (
        <div className="text-box-errors">{formInstance?.errors[name]}</div>
      )}

      {isOptionOpen && (
        <div className="selectbox-options">
          <RenderItem data={optionsData} />
        </div>
      )}
    </div>
  );
};

export default SelectBox;
