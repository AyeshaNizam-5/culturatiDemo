import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex items-center justify-center gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg bg-[#1e293b] text-white border border-gray-700 
                 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#2d3a4f] transition-colors"
      >
        <ChevronLeft size={20} />
      </button>
      
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-10 h-10 rounded-lg font-medium transition-colors
            ${currentPage === page
              ? 'bg-blue-600 text-white'
              : 'bg-[#1e293b] text-white hover:bg-[#2d3a4f] border border-gray-700'
            }`}
        >
          {page}
        </button>
      ))}
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg bg-[#1e293b] text-white border border-gray-700 
                 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#2d3a4f] transition-colors"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default Pagination; 