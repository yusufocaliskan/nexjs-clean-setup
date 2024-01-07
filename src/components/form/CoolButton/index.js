import "./index.scss";

const CoolButton = ({
  disabled,
  type,
  selected,
  label,
  onClick,
  fullSize,
  style,
}) => {
  return (
    <div className="cool-button">
      {selected && type === "Selected" && (
        <div className="btn-selected">
          <button disabled={disabled} onClick={onClick}>
            {label}
          </button>
        </div>
      )}
      {!selected && type === "Selected" && (
        <div className="btn-not-selected">
          <button disabled={disabled} onClick={onClick}>
            {label}
          </button>
        </div>
      )}
      {type === "Main" && fullSize && (
        <div className="btn-main-full-size">
          <button disabled={disabled} onClick={onClick}>
            {label}
          </button>
        </div>
      )}
      {type === "Main" && !fullSize && (
        <div
          className="btn-main"
          onClick={onClick}
          style={({ cursor: "pointer" }, { ...style })}
        >
          {label}
        </div>
      )}
      {type === "Small" && (
        <div className="btn-small-padding" onClick={onClick}>
          {label}
        </div>
      )}
      {type === "Main&Small" && (
        <div className="btn-small-padding-main">
          <button disabled={disabled} onClick={onClick}>
            {label}
          </button>
        </div>
      )}
      {type === "Main&Small&Plain" && (
        <div
          onClick={onClick}
          className="btn-small-padding-main"
          style={[{ cursor: "pointer" }, ...style]}
        >
          {label}
        </div>
      )}
    </div>
  );
};

export default CoolButton;
