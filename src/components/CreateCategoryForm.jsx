import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

const CreateCategoryForm = ({ category, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: null,
  });
  const [errors, setErrors] = useState({});
  const categorySuggestions = ["Art", "History", "Nature"];

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name || "",
        description: category.description || "",
        image: null,
      });
    }
  }, [category]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Category name is required";
    if (!formData.description) newErrors.description = "Description is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const newCategory = {
        id: category?.id || Date.now(),
        name: formData.name,
        description: formData.description,
      };
      onSubmit(newCategory);
      onClose;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-[#1e293b] rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-gray-700">
          <h2 className="text-xl font-semibold text-white">
            {category ? "Edit Category" : "Create Category"}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">
              Category Name *
            </label>
            <select
              className="w-full bg-[#0f172a] rounded-lg px-4 py-2 text-white"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            >
              <option value="">Category Suggestions</option>
              {categorySuggestions.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Enter a new category name"
              className="w-full mt-2 bg-[#0f172a] rounded-lg px-4 py-2 text-white"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">Description *</label>
            <textarea
              placeholder="Description"
              className="w-full bg-[#0f172a] rounded-lg px-4 py-2 text-white"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">Upload Image</label>
            <input
              type="file"
              className="w-full bg-[#0f172a] p-2 rounded-lg text-white"
              onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
            />
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
            >
              {category ? "Update Category" : "Create Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCategoryForm;
