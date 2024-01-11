import Spacer from "../Spacer";
import "./modalStyle.scss";
const Modal = ({ children, w }) => {
  return (
    <>
      <div className="modal-wrapper">
        <div className="modal-overlay"></div>

        <div className="modal-content-wrapper">
          <div className="modal-content" style={{ width: w }}>
            <div className="modal-content-inner">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Modal;
