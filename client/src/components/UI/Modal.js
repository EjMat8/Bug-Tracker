import React from "react";
import ReactDOM from "react-dom";
const Modal = ({ children, setOpenModal }) =>
  ReactDOM.createPortal(
    <div
      className="modal"
      onClick={(e) => {
        setOpenModal(false);
      }}
    >
      <div onClick={(e) => e.stopPropagation()} className="modal__container">
        {children}
      </div>
    </div>,
    document.getElementById("modal")
  );

export default Modal;
