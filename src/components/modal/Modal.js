import { useState } from "react";

const Modal = ({ isOpen, onClose, children }) => {

    const [isOpenedModal, setOpenedModal] = useState(!!isOpen);
    const closeModal = () => {
        setOpenedModal(false);
        onClose();
    };

    return (
        <>
            {!!isOpenedModal && (
                <div className="fixed inset-0 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
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
                            <div className="relative p-3 flex">{children}</div>
                        </div>
                    </div>
                    <div className="fixed inset-0 z-40 bg-black opacity-50"></div>
                </div>
            )}
        </>
    )
}

export default Modal;