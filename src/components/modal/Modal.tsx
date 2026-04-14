import { createPortal } from 'react-dom';
import { useModal } from '../../context/ModalContext';

const Modal = () => {
  const { isModalOpen, closeModal, modalContent } = useModal();

  if (!isModalOpen) return null;

  const modalRoot = document.querySelector('#modal-root');
  if (!modalRoot) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      onClick={closeModal}
    >
      <div className="fixed inset-0 bg-black/50 dark:bg-black/70" />
      <div
        className="relative z-50 bg-white dark:bg-gray-900 rounded-xl shadow-xl dark:shadow-gray-950/50 overflow-hidden w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        {modalContent}
      </div>
    </div>,
    modalRoot,
  );
};

export default Modal;
