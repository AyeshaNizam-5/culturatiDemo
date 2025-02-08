import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateCategoryForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const categorySuggestions = ["Art", "History", "Nature"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !description) {
      setError("Name and Description fields are required.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("image", image);

    try {
      await axios.post("/api/newCategorie", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/dashboard");
    } catch (err) {
      setError("Error creating category. Try again.");
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <div className="flex-1 flex justify-center items-center">
        <div className="bg-gray-800 p-10 rounded-xl shadow-lg w-[500px]">
          <h1 className="text-2xl font-bold mb-6">Create Category for Content</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div>
              <label className="block mb-2">Category Name *</label>
              <select 
                className="w-full p-3 bg-gray-700 rounded-md" 
              >
                <option value="">Category Suggestions</option>
                {categorySuggestions.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <input 
                type="text" 
                placeholder="Enter a new category name"
                className="w-full mt-2 p-3 bg-gray-700 rounded-md"
                value={name} 
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            
            
            <div>
              <label className="block mb-2">Description *</label>
              <textarea 
                placeholder="Description"
                className="w-full p-3 bg-gray-700 rounded-md"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            
            <div>
              <label className="block mb-2">Upload Image</label>
              <input 
                type="file" 
                className="w-full bg-gray-700 p-2 rounded-md" 
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>

            
            {error && <p className="text-red-400 text-sm">{error}</p>}

            
            <div className="flex justify-between">
              <button 
                type="button" 
                className="bg-gray-600 px-4 py-2 rounded-md" 
                onClick={() => navigate("/dashboard")}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Create Category
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCategoryForm;
