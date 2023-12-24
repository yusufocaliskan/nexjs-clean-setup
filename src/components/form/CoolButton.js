const CoolButton = ({ label, onClick }) => {
  return (
    <>
      <button onClick={onClick}>{label}</button>
    </>
  );
};

export default CoolButton;
