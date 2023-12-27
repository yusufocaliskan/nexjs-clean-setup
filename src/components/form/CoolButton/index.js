const CoolButton = ({ type, selected, label, onClick }) => {
  return (
    <>
      {selected && type !== "Main" && (
        <div className="btn-selected">
          <button onClick={onClick}>{label}</button>
        </div>
      )}
      {!selected && type !== "Main" && (
        <div className="btn-not-selected">
          <button onClick={onClick}>{label}</button>
        </div>
      )}
      {type === "Main" && (
        <div className="btn-main">
          <button onClick={onClick}>{label}</button>
        </div>
      )}
    </>
  );
};

export default CoolButton;
