import "./index.scss";

const CoolButton = ({ type, selected, label, onClick, fullSize }) => {
  return (
    <div className="cool-button">
      {selected && type === "Selected" && (
        <div className="btn-selected">
          <button onClick={onClick}>{label}</button>
        </div>
      )}
      {!selected && type === "Selected" && (
        <div className="btn-not-selected">
          <button onClick={onClick}>{label}</button>
        </div>
      )}
      {type === "Main" && fullSize && (
        <div className="btn-main-full-size">
          <button onClick={onClick}>{label}</button>
        </div>
      )}
      {type === "Main" && !fullSize && (
        <div className="btn-main">
          <button onClick={onClick}>{label}</button>
        </div>
      )}
      {type === "Small" && (
        <div className="btn-small-padding">
          <button onClick={onClick}>{label}</button>
        </div>
      )}
      {type === "Main&Small" && (
        <div className="btn-small-padding-main">
          <button onClick={onClick}>{label}</button>
        </div>
      )}
    </div>
  );
};

export default CoolButton;
