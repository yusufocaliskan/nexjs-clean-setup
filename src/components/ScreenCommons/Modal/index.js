import {MdClose} from 'react-icons/md';
import './modalStyle.scss';

const Modal = ({children, isOpen, setIsOpen, w}) => {
  const handleOnModalClosed = () => {
    setIsOpen(false);
  };
  if (!isOpen) return <></>;
  return (
    <>
      <div className="modal-wrapper">
        <div className="modal-overlay"></div>

        <div className="modal-content-wrapper">
          <div className="modal-content" style={{width: w}}>
            <div className="modal-content-inner">
              {setIsOpen && (
                <div onClick={handleOnModalClosed} className="modal-close-button">
                  <MdClose size={30} />
                </div>
              )}
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Modal;
