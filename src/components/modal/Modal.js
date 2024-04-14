// Modal.js
import React from 'react';
import { useModal } from './ModalContext';
import { createPortal } from 'react-dom';

const Modal = () => {
  const { isModalOpen, closeModal, modalContent } = useModal();

  return isModalOpen && createPortal(
    <div className="modal z-50 fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-75 flex justify-center items-center">
      <div className="'fixed inset-0 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none'">
        <div className="relative w-auto mx-auto my-6 z-50">
          <div className="relative bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
            <div className="flex items-start justify-between p-1 rounded-t">
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={closeModal}
              >
                <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            {/* Body */}
            <div className="relative p-3 flex">{modalContent}</div>
          </div>
        </div>
        <div className="fixed inset-0 z-40 bg-black opacity-50"></div>
      </div>
    </div>,
    document.querySelector('#modal-root')
  );
};

export default Modal;