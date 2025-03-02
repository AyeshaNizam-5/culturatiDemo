import React from 'react';
import { AlertTriangle } from 'lucide-react';

const ConfirmDialog = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-lg border border-[#cde4ed]">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-red-500" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-[#0b6085]">{title}</h2>
            <p className="text-[#6193a9] mt-1">{message}</p>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-[#eff8fb] hover:bg-[#e0f7fa] text-[#0b6085] 
                     transition-colors border border-[#cde4ed]"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog; 