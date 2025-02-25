import React, { useState } from 'react';
import { useParams, useOutletContext } from 'react-router-dom';
import { Upload } from 'lucide-react';
import institutionService from '../services/institutionService';

const Institution = () => {
  const { institutionId } = useParams();
  const { institution, refreshInstitution } = useOutletContext();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    institutionName: institution.institutionName,
    institutionCode: institution.institutionCode,
    type: institution.type,
    logo: null,
    image: null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        [field]: file
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await institutionService.update(institutionId, formData);
      await refreshInstitution();
    } catch (error) {
      console.error('Error updating institution:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-[#eff8fb] rounded-xl p-6 shadow-lg ">
        <h2 className="text-2xl font-bold text-[#0b6085] mb-6">Institution Details</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Institution Name
              </label>
              <input
                type="text"
                name="institutionName"
                value={formData.institutionName}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 bg-[white] rounded-lg text-[#0b6085] 
                         border border-gray-700 focus:outline-none focus:ring-2 
                         focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Institution Code
              </label>
              <input
                type="text"
                name="institutionCode"
                value={formData.institutionCode}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 bg-[white] rounded-lg text-white 
                         border border-gray-700 focus:outline-none focus:ring-2 
                         focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Type
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              className="w-full px-4 py-2.5 bg-[white] rounded-lg text- [#0b6085]
                       border border-gray-700 focus:outline-none focus:ring-2 
                       focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Museum">Museum</option>
              <option value="Heritage Site">Heritage Site</option>
              <option value="Castle">Castle</option>
              <option value="Art Gallery">Art Gallery</option>
              <option value="Theater">Theater</option>
              <option value="Cultural Center">Cultural Center</option>
            </select>
          </div>

          {/* Logo Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Logo
            </label>
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-[white] rounded-lg overflow-hidden border border-gray-700">
                <img 
                  src={formData.logo instanceof File ? URL.createObjectURL(formData.logo) : institution.logo}
                  alt="Logo Preview"
                  className="w-full h-full object-cover"
                />
              </div>
              <label className="flex items-center gap-2 px-4 py-2 bg-[#94d0ea] rounded-lg 
                             cursor-pointer hover:bg-[#eef7fa] transition-colors border border-gray-700">
                <Upload size={20} className="text-[#0b6085]" />
                <span className="text-[#0b6085]">Upload Logo</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, 'logo')}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Cover Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Cover Image
            </label>
            <div className="flex items-center gap-4">
              <div className="w-40 h-24 bg-[#94d0ea] rounded-lg overflow-hidden border border-gray-700">
                <img 
                  src={formData.image instanceof File ? URL.createObjectURL(formData.image) : institution.image}
                  alt="Cover Preview"
                  className="w-full h-full object-cover"
                />
              </div>
              <label className="flex items-center gap-2 px-4 py-2 bg-[#94d0ea] rounded-lg 
                             cursor-pointer hover:bg-[#eef7fa] transition-colors border border-gray-700">
                <Upload size={20} className="text-[#0b6085]" />
                <span className="text-[#0b6085]">Upload Cover Image</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, 'image')}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 bg-[#94d0ea] hover:bg-[#eef7fa] rounded-lg 
                       text-[#0b6085] font-medium transition-colors disabled:opacity-50 border border-[#6797a7]"
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Institution; 