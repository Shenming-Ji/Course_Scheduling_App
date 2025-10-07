import { type PropsWithChildren } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Modal({ isOpen, onClose, children }: PropsWithChildren<ModalProps>) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose} 
    >
      <div
        className="bg-white rounded-2xl p-6 shadow-lg max-w-md w-full"
        onClick={(e) => e.stopPropagation()} 
      >
        {children}
        <div className="mt-4 flex justify-end">
          <button
            className="px-3 py-2 bg-purple-600 text-white rounded"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
