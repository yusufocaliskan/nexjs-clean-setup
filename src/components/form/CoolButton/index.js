const CoolButton = ({ main, selected, label, onClick }) => {
  return selected && !main ? (
    <div className="btn-selected">
      <button onClick={onClick}>{label}</button>
    </div>
  ) : !selected && !main ? (
    <div className="btn-not-selected">
      <button onClick={onClick}>{label}</button>
    </div>
  ) : (
    <div className="btn-main">
      <button onClick={onClick}>{label}</button>
    </div>
  );
};

export default CoolButton;
