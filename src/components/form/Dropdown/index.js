import { useState } from "react";
import "./index.scss";
import ArrowIcon from "@/components/Icons/ArrowIcon";
import { useRouter } from "next/navigation";

const Dropdown = ({ options, route, title, icon }) => {
  const [isActive, setIsActive] = useState(false);
  const [selected, setIsSelected] = useState(title);
  const router = useRouter();



  return (
    <div className="dropdown">
      <div
        onClick={(e) => {
          setIsActive(!isActive);
        }}
        className="dropdown-btn"
      >
        <span className="dropdown-label">
          {icon} {selected}
        </span>
        <span style={{ transform: isActive ? "rotate(180deg)" : "" }}>
          <ArrowIcon />
        </span>
      </div>
      <div
        className="dropdown-content"
        style={{ display: isActive ? "block" : "none" }}
      >
        {options.map((item, index) => (
          <div
            key={index}
            onClick={(e) => {
              {
                route && router.push(item.link);
              }
              setIsSelected(e.target.textContent);
              setIsActive(!isActive);
            }}
            className="item"
          >
            {item.icon && item.icon} {item.value}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
