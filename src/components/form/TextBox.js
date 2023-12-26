const TextBox = ({ value, setValue, type = "text", label }) => {
  const handleOnKeyDown = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      <label>
        <p>{label}</p>
        <input type={type} value={value} onChange={handleOnKeyDown} />
      </label>
    </>
  );
};

export default TextBox;
