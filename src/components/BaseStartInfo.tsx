import React from 'react';
import { Button } from '@/components/ui/button';

const BaseStartInfo = ({
  title,
  paragraph,
  isExpanded,
  onExpand,
  onEdit
}: {
  title: string;
  paragraph: string;
  isExpanded: boolean;
  onExpand: () => void;
  onEdit: () => void;
}) => {
  return (
    <div
      className={`w-full border rounded-md p-4 bg-white shadow-md cursor-pointer transition-all duration-300 ${isExpanded ? 'h-64' : 'h-32'} overflow-hidden`}
      onClick={onExpand}
    >
      <h3 className="text-lg font-semibold text-[#0b6085]">{title}</h3>
      <p className="text-sm text-gray-700 mt-2 line-clamp-3">{paragraph}</p>
      {isExpanded && (
        <Button variant="outline" size="sm" className="mt-4" onClick={(e) => { e.stopPropagation(); onEdit(); }}>
          Edit
        </Button>
      )}
    </div>
  );
};

export default BaseStartInfo;