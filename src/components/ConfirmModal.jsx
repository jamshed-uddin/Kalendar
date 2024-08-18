import React from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");
const customStyles = {
  overlay: {
    backgroundColor: "transparent",
  },
  content: {
    backgroundColor: "aliceblue",
    border: "none",
    borderRadius: " 1.4rem",
    boxShadow: "0 0 1rem 0.1rem rgba(128, 128, 128, 0.32)",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const ConfirmModal = ({ isOpen, closeModal, children }) => {
  return (
    <Modal
      style={customStyles}
      isOpen={isOpen}
      role={"dialog"}
      onRequestClose={closeModal}
    >
      <>{children}</>
    </Modal>
  );
};

export default ConfirmModal;
