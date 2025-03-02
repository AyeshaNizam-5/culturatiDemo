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
    <div className="space-y-6">
      {/* Header Section */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-[#0b6085] mb-2">Institution Details</h1>
            <p className="text-[#6193a9]">Update your institution information</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-[#6193a9] mb-2">
                Institution Name
              </label>
              <input
                type="text"
                name="institutionName"
                value={formData.institutionName}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 bg-[#eff8fb] rounded-lg text-[#0b6085] 
                         border border-[#cde4ed] focus:outline-none focus:ring-2 
                         focus:ring-[#5ec5f1] focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-[#6193a9] mb-2">
                Institution Code
              </label>
              <input
                type="text"
                name="institutionCode"
                value={formData.institutionCode}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 bg-[#eff8fb] rounded-lg text-[#0b6085] 
                         border border-[#cde4ed] focus:outline-none focus:ring-2 
                         focus:ring-[#5ec5f1] focus:border-transparent"
              />
            </div>
          </div>

          {/* Type Selection */}
          <div>
            <label className="block text-sm font-medium text-[#6193a9] mb-2">
              Type
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              className="w-full px-4 py-2.5 bg-[#eff8fb] rounded-lg text-[#0b6085] 
                       border border-[#cde4ed] focus:outline-none focus:ring-2 
                       focus:ring-[#5ec5f1] focus:border-transparent"
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
            <label className="block text-sm font-medium text-[#6193a9] mb-2">
              Logo
            </label>
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-[#eff8fb] rounded-lg overflow-hidden border border-[#cde4ed]">
                <img 
                  src={formData.logo instanceof File ? URL.createObjectURL(formData.logo) : institution.logo}
                  alt="Logo Preview"
                  className="w-full h-full object-cover"
                />
              </div>
              <label className="flex items-center gap-2 px-4 py-2 bg-[#5ec5f1] rounded-lg 
                             cursor-pointer hover:bg-[#94d0ea] transition-colors text-white">
                <Upload size={20} />
                <span>Upload Logo</span>
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
            <label className="block text-sm font-medium text-[#6193a9] mb-2">
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
              <label className="flex items-center gap-2 px-4 py-2 bg-[#5ec5f1] rounded-lg 
                             cursor-pointer hover:bg-[#94d0ea] transition-colors text-white">
                <Upload size={20} />
                <span>Upload Cover Image</span>
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
              className="px-6 py-2.5 bg-[#5ec5f1] hover:bg-[#94d0ea] rounded-lg 
                       text-white font-medium transition-colors disabled:opacity-50"
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