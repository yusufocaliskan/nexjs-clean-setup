import LoadingGif from "@/components/LoadingGif";
import "./index.scss";
const FormTriggerButton = ({ formInstance, isLoading = false, label }) => {
  return (
    <>
      <div className=" form-trigger-button-wrapper">
        <button
          disabled={isLoading}
          type="submit"
          className="btn-main  form-trigger-button"
        >
          {isLoading ? <LoadingGif isPuff color="white" /> : label}
        </button>
      </div>
    </>
  );
};

export default FormTriggerButton;
