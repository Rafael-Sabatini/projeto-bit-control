// Componente de fora para modal, que pode ser reutilizado em qualquer lugar do projeto.

import React from "react";
import Modal from "react-modal";
import "./ModalStyle.css";

Modal.setAppElement("#root");

const ModalComponent = ({ isOpen, onRequestClose, children }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <button
        className="fixed top-2 right-2 text-red-500 text-4xl h-9 w-9 hover:scale-110 active:scale-95 cursor-pointer transition-all duration-200 rounded-md"
        onClick={onRequestClose}
        data-testid="botaoFecharModal"
      >
        x
      </button>
      {children}
    </Modal>
  );
};

export default ModalComponent;
