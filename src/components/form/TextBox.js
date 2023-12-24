const TextBox = ({ value, setValue, label }) => {
  const handleOnKeyDown = (e) => {
    if (e.target.value) setValue(e.target.value);
  };

  return (
    <>
      <label>
        <p>{label}</p>
        <input value={value} onChange={handleOnKeyDown} />
      </label>
    </>
  );
};

export default TextBox;
