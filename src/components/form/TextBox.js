const TextBox = ({ value, setValue, label }) => {
  return (
    <>
      <label>
        <p>{label}</p>
        <input value={value} onKeyDown={setValue} />
      </label>
    </>
  );
};

export default TextBox;
