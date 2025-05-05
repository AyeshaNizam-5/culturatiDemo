import React, { useState, useRef } from 'react';
import { m1, m2, m3, m4 } from '../assets';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';

const InstitutionImages = ({ isExpanded, onExpand }) => {
  const [images, setImages] = useState([m1, m2, m3, m4]);
  const fileInputRef = useRef(null);

  const handleDeleteImage = (src) => {
    setImages(images.filter((img) => img !== src));
  };

  const handleAddImages = (e) => {
    const files = Array.from(e.target.files || []);
    const newUrls = files.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...newUrls]);
  };

  const triggerFileInput = (e) => {
    e.stopPropagation(); // Prevent section expansion
    fileInputRef.current?.click();
  };

  return (
    <div
      className={`w-full border rounded-md p-4 bg-white shadow-md cursor-pointer transition-all duration-300 ${isExpanded ? 'h-[500px]' : 'h-40'} overflow-hidden`}
      onClick={(e) => {
        const tag = e.target.tagName.toLowerCase();
        if (tag !== 'button' && tag !== 'svg' && tag !== 'path' && tag !== 'input' && tag !== 'label') {
          onExpand();
        }
      }}
    >

      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-[#0b6085]">Institution Images</h3>
        {isExpanded && (
          <Button variant="outline" size="sm" onClick={triggerFileInput}>
            <Plus className="w-4 h-4 mr-1" />
            Add Images
          </Button>
        )}
      </div>

      <div className="mt-2 grid grid-cols-4 gap-2 overflow-y-auto max-h-72">
        {images.map((img, i) => (
          <div key={i} className="relative group w-full h-24">
            <img
              src={img}
              alt={`institution-${i}`}
              className="w-full h-full object-cover rounded-md border"
            />
            {isExpanded && (
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent expansion
                  handleDeleteImage(img);
                }}
                className="absolute top-1 right-1 p-1 bg-white/80 rounded-full shadow-sm hover:bg-white transition-opacity opacity-0 group-hover:opacity-100"
              >
                <Trash2 className="w-4 h-4 text-red-600" />
              </button>
            )}
          </div>
        ))}
      </div>

      <input
        type="file"
        multiple
        ref={fileInputRef}
        onChange={handleAddImages}
        className="hidden"
      />
    </div>
  );
};

export default InstitutionImages;
