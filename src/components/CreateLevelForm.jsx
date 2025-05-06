import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

const CreateLevelForm = ({ level, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: ""
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (level) {
      setFormData({
        name: level.name || "",
        description: level.description || "",
        image: null,
      });
    }
  }, [level]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.description) newErrors.description = "Description is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-md border border-[#cde4ed]">
        <div className="flex justify-between items-center p-6 border-b border-[#cde4ed]">
          <h2 className="text-xl font-bold text-[#0b6085]">
            {level ? "Edit" : "Create"} Level
          </h2>
          <button onClick={onClose} className="text-[#6193a9] hover:text-[#0b6085]">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#6193a9] mb-1">
              Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full bg-[#eff8fb] rounded-lg px-4 py-2 text-[#0b6085] border border-[#cde4ed]
                       focus:outline-none focus:ring-2 focus:ring-[#5ec5f1] focus:border-transparent"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-[#6193a9] mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={4}
              className="w-full bg-[#eff8fb] rounded-lg px-4 py-2 text-[#0b6085] border border-[#cde4ed]
                       focus:outline-none focus:ring-2 focus:ring-[#5ec5f1] focus:border-transparent"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>

          {/* <div>
            <label className="block text-sm font-medium text-[#6193a9] mb-1">Upload Image</label>
            <input
              type="file"
              className="w-full bg-[#eff8fb] p-2 rounded-lg text-[#0b6085] "
              onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
            />
          </div> */}

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-[#eff8fb] hover:bg-[#e0f7fa] text-[#0b6085] rounded-lg transition-colors border border-[#cde4ed]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#5ec5f1] hover:bg-[#94d0ea] text-white rounded-lg transition-colors"
            >
              {level ? "Update" : "Create"} Level
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateLevelForm;
