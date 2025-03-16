import React from 'react';
import { Search } from 'lucide-react';

const InstitutionFilters = ({ search, onSearchChange, typeFilter, onTypeFilterChange }) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search cultural institutions..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-white rounded-lg text-black placeholder:text-gray-400 
                   border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <select
        value={typeFilter}
        onChange={(e) => onTypeFilterChange(e.target.value)}
        className="px-4 py-2.5 bg-white rounded-lg text-[#70b5d2] border border-gray-700
                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        <option value="">All Types</option>
        <option value="Museum">Museum</option>
        <option value="Heritage Site">Heritage Site</option>
        <option value="Castle">Castle</option>
        <option value="Art Gallery">Art Gallery</option>
        <option value="Theater">Theater</option>
        <option value="Cultural Center">Cultural Center</option>
      </select>
    </div>
  );
};

export default InstitutionFilters; 