import Spacer from "../Spacer";
import "./modalStyle.scss";
const Modal = ({ children }) => {
  return (
    <>
      <div className="modal-wrapper">
        <div className="modal-overlay"></div>

        <div className="modal-content-wrapper">
          <div className="modal-content">{children}</div>
        </div>
      </div>
    </>
  );
};
export default Modal;
