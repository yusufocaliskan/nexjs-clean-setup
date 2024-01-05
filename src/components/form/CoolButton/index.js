import "./index.scss";

const CoolButton = ({ disabled, type, selected, label, onClick, fullSize }) => {
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
        <div className="btn-main">
          <button disabled={disabled} sonClick={onClick}>
            {label}
          </button>
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
    </div>
  );
};

export default CoolButton;
