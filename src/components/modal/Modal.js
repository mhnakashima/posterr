// Modal.js
import React from 'react';
import { useModal } from './../../context/ModalContext';
import { createPortal } from 'react-dom';
import { XCircleIcon } from '@heroicons/react/24/outline';

const Modal = () => {
  const { isModalOpen, closeModal, modalContent } = useModal();

  return isModalOpen && createPortal(
    <div className="modal z-50 fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-75 flex justify-center items-center">
      <div className="'fixed inset-0 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none'">
        <div className="relative w-auto mx-auto my-6 z-50">
          <div className="relative bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
            <div className="flex items-start justify-between p-1 rounded-t">
              <button
                className="ml-auto bg-transparent border-0 "
                onClick={closeModal}
              >
                <XCircleIcon className='w-8 h-8 hover:text-blue-500' />
              </button>
            </div>
            {/* Body */}
            <div className="relative p-4 flex">{modalContent}</div>
          </div>
        </div>
        <div className="fixed inset-0 z-40 bg-black opacity-50"></div>
      </div>
    </div>,
    document.querySelector('#modal-root')
  );
};

export default Modal;