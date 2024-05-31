// src/components/ImageModal.js
import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Adjust the selector as needed

const ImageModal = ({ isOpen, onRequestClose, imageSrc }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="modal"
      overlayClassName="overlay"
    >
      <div className="flex justify-center items-center h-full">
        <img src={imageSrc} alt="Full view" className="max-h-full max-w-full" />
      </div>
    </Modal>
  );
};

export default ImageModal;
