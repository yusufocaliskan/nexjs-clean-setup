import { useEffect, useState } from "react";
import "./stye.scss";
import ChevronDownIcon from "@/components/Icons/ChevronDownIcon";
import ChevronUpIcon from "@/components/Icons/ChevronUpIcon";
import { motion } from "framer-motion";

const SelectBox = ({
  value,
  placeholder,
  setValue,
  label,
  name,
  formInstance,
  optionsData,
}) => {
  const [isOptionOpen, setIsOptionOpen] = useState(false);
  const isError = formInstance?.errors[name] && formInstance.submitCount > 0;

  //Setting the selected options
  const handleMakeSelection = (val) => {
    setValue(val);
    setIsOptionOpen(false);
  };

  //Rendirin the optins
  const RenderItem = () => {
    return optionsData.map((item, index) => {
      return (
        <div
          key={index}
          className={`
                    selectbox-item ${
                      value == item.val && "selectbox-selected-item"
                    }`}
          onClick={() => handleMakeSelection(item)}
        >
          <span>{item.title ? item.title : item.val}</span>
        </div>
      );
    });
  };

  return (
    <div className="text-box-wrapper">
      {label && <p className="text-box-label">{label}</p>}
      <div
        className={` text-box-input selectbox-container  ${
          value && "text-box-has-val-input"
        } ${isError && "text-box-errorred-input"} `}
        style={{ height: 52 }}
        value={value}
        onClick={() => setIsOptionOpen(!isOptionOpen)}
      >
        {value && (
          <span className="selectbox-selected">
            {value.title ? value.title : value.val}
          </span>
        )}
        {!value?.val && (
          <span className="selectbox-placeholder">{placeholder}</span>
        )}
        <span className="selectbox-arrow">
          {!isOptionOpen && <ChevronDownIcon width={15} />}
          {isOptionOpen && <ChevronUpIcon width={15} />}
        </span>
      </div>
      {isOptionOpen && (
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="selectbox-options"
        >
          <RenderItem />
        </motion.div>
      )}
    </div>
  );
};

export default SelectBox;
