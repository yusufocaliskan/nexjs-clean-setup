import "./index.scss";
const FormTriggerButton = ({ type, selected, label, onClick }) => {
  return (
    <>
      <div className=" form-trigger-button-wrapper">
        <button type="submit" className="btn-main  form-trigger-button">
          {label}
        </button>
      </div>
    </>
  );
};

export default FormTriggerButton;
