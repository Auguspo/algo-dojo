import React from "react";

const Modal = ({ children }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <button onClick={handleOpen}>Abrir modal</button>
      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            {children}
            <button onClick={handleClose}>Cerrar modal</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
