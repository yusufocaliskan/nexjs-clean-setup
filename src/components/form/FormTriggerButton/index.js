import LoadingGif from "@/components/LoadingGif";
import "./index.scss";
const FormTriggerButton = ({ disabled, isLoading = false, label }) => {
  return (
    <>
      <div className=" form-trigger-button-wrapper">
        <button
          disabled={disabled}
          type="submit"
          className="btn-main  form-trigger-button"
        >
          {isLoading || disabled ? <LoadingGif isPuff color="white" /> : label}
        </button>
      </div>
    </>
  );
};

export default FormTriggerButton;
