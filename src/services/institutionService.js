import api from './api';
import { ENDPOINTS } from '../config/apiConfig';

// Placeholder data for development
const mockInstitutions = [
  {
    id: 1,
    institutionName: "National Museum of History",
    institutionCode: "NMH001",
    logo: "https://placehold.co/150x150",
    image: "https://placehold.co/800x400",
    type: "Museum"
  },
  {
    id: 2,
    institutionName: "Royal Heritage Castle",
    institutionCode: "RHC002",
    logo: "https://placehold.co/150x150",
    image: "https://placehold.co/800x400",
    type: "Castle"
  },
  {
    id: 3,
    institutionName: "Metropolitan Art Gallery",
    institutionCode: "MAG003",
    logo: "https://placehold.co/150x150",
    image: "https://placehold.co/800x400",
    type: "Art Gallery"
  }
];

const institutionService = {
  getAll: async (params = {}) => {
    try {
      const response = await api.get(ENDPOINTS.INSTITUTIONS.GET_ALL, { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching institutions:', error);
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const response = await api.get(ENDPOINTS.INSTITUTIONS.GET_BY_ID(id));
      return response.data;
    } catch (error) {
      console.error('Error fetching institution:', error);
      throw error;
    }
  },

  create: async (institutionData) => {
    try {
      // Handle file uploads with FormData
      const formData = new FormData();
      Object.keys(institutionData).forEach(key => {
        if (institutionData[key] instanceof File) {
          formData.append(key, institutionData[key]);
        } else {
          formData.append(key, institutionData[key]);
        }
      });

      const response = await api.post(ENDPOINTS.INSTITUTIONS.CREATE, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating institution:', error);
      throw error;
    }
  },

  update: async (id, institutionData) => {
    try {
      // Handle file uploads with FormData
      const formData = new FormData();
      Object.keys(institutionData).forEach(key => {
        if (institutionData[key] instanceof File) {
          formData.append(key, institutionData[key]);
        } else {
          formData.append(key, institutionData[key]);
        }
      });

      const response = await api.put(ENDPOINTS.INSTITUTIONS.UPDATE(id), formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error updating institution:', error);
      throw error;
    }
  },

  delete: async (id) => {
    try {
      await api.delete(ENDPOINTS.INSTITUTIONS.DELETE(id));
      return true;
    } catch (error) {
      console.error('Error deleting institution:', error);
      throw error;
    }
  },

  getTypes: async () => {
    try {
      const response = await api.get(ENDPOINTS.INSTITUTIONS.TYPES);
      return response.data;
    } catch (error) {
      console.error('Error fetching institution types:', error);
      throw error;
    }
  }
};

// For development only - will be removed in production
if (import.meta.env.DEV) {
  // Mock data for development
  const mockInstitutions = [
    {
      id: 1,
      institutionName: "National Museum of History",
      institutionCode: "NMH001",
      logo: "https://placehold.co/150x150",
      image: "https://placehold.co/800x400",
      type: "Museum"
    },
    // ... other mock data
  ];

  // Override methods with mock data in development
  institutionService.getAll = async () => ({ data: mockInstitutions });
  institutionService.getById = async (id) => ({ 
    data: mockInstitutions.find(i => i.id === id) 
  });
  // ... other mock method overrides
}

export default institutionService; 