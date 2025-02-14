import React, { useState } from 'react';
import { X } from 'lucide-react';

const InstitutionForm = ({ institution, onClose, onSubmit }) => {
  const [formData, setFormData] = useState(
    institution || {
      institutionName: "",
      institutionCode: "",
      logo: null,
      image: null,
      type: ""
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-[#F9FAFA] bg-opacity-95 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl border border-[#cde4ed] shadow-lg">
        <div className="flex justify-between items-center p-6 border-b border-[#c9e3ed]">
          <h2 className="text-xl font-semibold text-[#0b6085]">
            {institution ? 'Edit Cultural Institution' : 'Add Cultural Institution'}
          </h2>
          <button 
            onClick={onClose} 
            className="text-[#88b8c4] hover:text-[#0b6085] transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#0b6085] mb-2">
                Institution Name
              </label>
              <input
                type="text"
                value={formData.institutionName}
                onChange={(e) => setFormData({...formData, institutionName: e.target.value})}
                className="w-full bg-[#F9FAFA] rounded-lg px-4 py-2.5 text-[#0b6085] 
                         border border-[#b5dbe3] focus:ring-2 focus:ring-[#5ec5f1] 
                         focus:border-transparent outline-none"
                placeholder="e.g., National Museum of History"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#0b6085] mb-2">
                Institution Code
              </label>
              <input
                type="text"
                value={formData.institutionCode}
                onChange={(e) => setFormData({...formData, institutionCode: e.target.value})}
                className="w-full bg-[#F9FAFA] rounded-lg px-4 py-2.5 text-[#0b6085] 
                         border border-[#b5dbe3] focus:ring-2 focus:ring-[#5ec5f1] 
                         focus:border-transparent outline-none"
                placeholder="e.g., NMH001"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#0b6085] mb-2">
                Type
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
                className="w-full bg-[#F9FAFA] rounded-lg px-4 py-2.5 text-[#0b6085] 
                         border border-[#b5dbe3] focus:ring-2 focus:ring-[#5ec5f1] 
                         focus:border-transparent outline-none"
              >
                <option value="" className="bg-[#F9FAFA]">Select Type</option>
                <option value="Museum" className="bg-[#F9FAFA]">Museum</option>
                <option value="Heritage Site" className="bg-[#F9FAFA]">Heritage Site</option>
                <option value="Castle" className="bg-[#F9FAFA]">Castle</option>
                <option value="Art Gallery" className="bg-[#F9FAFA]">Art Gallery</option>
                <option value="Theater" className="bg-[#F9FAFA]">Theater</option>
                <option value="Cultural Center" className="bg-[#F9FAFA]">Cultural Center</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#0b6085] mb-2">
                Logo
              </label>
              <input
                type="file"
                onChange={(e) => setFormData({...formData, logo: e.target.files[0]})}
                className="w-full bg-[#F9FAFA] rounded-lg px-4 py-2.5 text-[#0b6085]
                         border border-[#b5dbe3] focus:ring-2 focus:ring-[#5ec5f1] 
                         focus:border-transparent outline-none file:mr-4 
                         file:py-2 file:px-4 file:rounded-full file:border-0
                         file:text-sm file:font-medium file:bg-[#5ec5f1] 
                         file:text-white hover:file:bg-[#0b6085]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#0b6085] mb-2">
                Cover Image
              </label>
              <input
                type="file"
                onChange={(e) => setFormData({...formData, image: e.target.files[0]})}
                className="w-full bg-[#F9FAFA] rounded-lg px-4 py-2.5 text-[#0b6085]
                         border border-[#b5dbe3] focus:ring-2 focus:ring-[#5ec5f1] 
                         focus:border-transparent outline-none file:mr-4 
                         file:py-2 file:px-4 file:rounded-full file:border-0
                         file:text-sm file:font-medium file:bg-[#5ec5f1] 
                         file:text-white hover:file:bg-[#0b6085]"
              />
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-[#88b8c4] hover:bg-[#b5dbe3] text-white 
                       rounded-lg transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#5ec5f1] hover:bg-[#0b6085] text-white 
                       rounded-lg transition-colors font-medium"
            >
              {institution ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InstitutionForm;