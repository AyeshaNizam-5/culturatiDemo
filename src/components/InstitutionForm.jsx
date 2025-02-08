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
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
      <div className="bg-[#1e293b] rounded-lg w-full max-w-2xl border border-gray-700">
        <div className="flex justify-between items-center p-6 border-b border-gray-700">
          <h2 className="text-xl font-semibold text-white">
            {institution ? 'Edit Cultural Institution' : 'Add Cultural Institution'}
          </h2>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Institution Name
              </label>
              <input
                type="text"
                value={formData.institutionName}
                onChange={(e) => setFormData({...formData, institutionName: e.target.value})}
                className="w-full bg-[#0f172a] rounded-lg px-4 py-2.5 text-white 
                         border border-gray-700 focus:ring-2 focus:ring-blue-500 
                         focus:border-transparent outline-none"
                placeholder="e.g., National Museum of History"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Institution Code
              </label>
              <input
                type="text"
                value={formData.institutionCode}
                onChange={(e) => setFormData({...formData, institutionCode: e.target.value})}
                className="w-full bg-[#0f172a] rounded-lg px-4 py-2.5 text-white 
                         border border-gray-700 focus:ring-2 focus:ring-blue-500 
                         focus:border-transparent outline-none"
                placeholder="e.g., NMH001"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Type
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
                className="w-full bg-[#0f172a] rounded-lg px-4 py-2.5 text-white 
                         border border-gray-700 focus:ring-2 focus:ring-blue-500 
                         focus:border-transparent outline-none"
              >
                <option value="" className="bg-[#0f172a]">Select Type</option>
                <option value="Museum" className="bg-[#0f172a]">Museum</option>
                <option value="Heritage Site" className="bg-[#0f172a]">Heritage Site</option>
                <option value="Castle" className="bg-[#0f172a]">Castle</option>
                <option value="Art Gallery" className="bg-[#0f172a]">Art Gallery</option>
                <option value="Theater" className="bg-[#0f172a]">Theater</option>
                <option value="Cultural Center" className="bg-[#0f172a]">Cultural Center</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Logo
              </label>
              <input
                type="file"
                onChange={(e) => setFormData({...formData, logo: e.target.files[0]})}
                className="w-full bg-[#0f172a] rounded-lg px-4 py-2.5 text-gray-200
                         border border-gray-700 focus:ring-2 focus:ring-blue-500 
                         focus:border-transparent outline-none file:mr-4 
                         file:py-2 file:px-4 file:rounded-full file:border-0
                         file:text-sm file:font-medium file:bg-blue-600 
                         file:text-white hover:file:bg-blue-700"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Cover Image
              </label>
              <input
                type="file"
                onChange={(e) => setFormData({...formData, image: e.target.files[0]})}
                className="w-full bg-[#0f172a] rounded-lg px-4 py-2.5 text-gray-200
                         border border-gray-700 focus:ring-2 focus:ring-blue-500 
                         focus:border-transparent outline-none file:mr-4 
                         file:py-2 file:px-4 file:rounded-full file:border-0
                         file:text-sm file:font-medium file:bg-blue-600 
                         file:text-white hover:file:bg-blue-700"
              />
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white 
                       rounded-lg transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white 
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