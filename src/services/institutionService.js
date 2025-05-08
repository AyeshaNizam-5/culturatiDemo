import api from './api';
import { ENDPOINTS } from '../config/apiConfig';
import { m3, m4, m2, m1 } from '../assets';

// Mock data
const mockInstitutions = [
  {
    id: 1,
    institutionName: "National Museum of History",
    institutionCode: "NMH001",
    logo: m3,
    image: m4,
    type: "Museum"
  },
  {
    id: 2,
    institutionName: "Royal Heritage Castle",
    institutionCode: "RHC002",
    logo: m2,
    image: m1,
    type: "Castle"
  }
];

const institutionService = {
  getAll: async () => {
    try {
      const response = await api.get(`${ENDPOINTS.INSTITUTIONS.GET_ALL}`); 
    
      if (response.status === 200) {
        console.log('Response:', response.data);
        return {data: response.data};
      }
      throw new Error('Institution not found');
    } catch (error) {
      console.error('Error fetching institutions:', error);
      throw error;
    }
  },

  create: async (institutionData) => {
    try {
      // // Mock create
      // const newInstitution = {
      //   id: mockInstitutions.length + 1,
      //   ...institutionData,
      //   logo: institutionData.logo || "https://placehold.co/150x150",
      //   image: institutionData.image || "https://placehold.co/800x400"
      // };
      // mockInstitutions.push(newInstitution);
      // return Promise.resolve({ data: newInstitution });
      const response = await api.post(`${ENDPOINTS.INSTITUTIONS.CREATE}`, institutionData, 
        {headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Response:', response);
      return { data: response.data };
    } catch (error) {
      console.error('Error creating institution:', error);
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const response = await api.get(`${ENDPOINTS.INSTITUTIONS.GET_BY_ID}`);
      if (response.status === 200) {
        console.log('Response:', response.data);
        return { data: response.data };
      }
      throw new Error('Institution not found');
    } catch (error) {
      console.error('Error fetching institution:', error);
      throw error;
    }
  },

  createTenantInstitutionDetails: async (institutionData) => {
    try {
      console.log('Tenant Institution Data:', institutionData); 
      const response = await api.post(`${ENDPOINTS.INSTITUTIONS.CREATE_TENANT_INSTITUTION_DETAILS}`, institutionData);
      if (response.status === 200) {
        console.log('Response:', response.data);
        return { data: response.data };
      }
      throw new Error('Failed to create tenant institution details');
    } catch (error) {
      console.error('Error creating tenant institution details:', error);
      throw error;
    }
  },

  update: async (id, institutionData) => {
    try {
      const index = mockInstitutions.findIndex(inst => inst.id === id);
      if (index !== -1) {
        mockInstitutions[index] = { 
          ...mockInstitutions[index], 
          ...institutionData 
        };
        return Promise.resolve({ data: mockInstitutions[index] });
      }
      throw new Error('Institution not found');
    } catch (error) {
      console.error('Error updating institution:', error);
      throw error;
    }
  },

  delete: async (id) => {
    try {
      // const index = mockInstitutions.findIndex(inst => inst.id === id);
      // if (index !== -1) {
      //   mockInstitutions.splice(index, 1);
      //   return Promise.resolve({ success: true });
      // }
      // throw new Error('Institution not found');
      const response = await api.delete(ENDPOINTS.INSTITUTIONS.DELETE(id));
      if (response) {
        console.log('Response:', response.data);
        return { success: true };
      }
      throw new Error('Failed to delete institution');

    } catch (error) {
      console.error('Error deleting institution:', error);
      throw error;
    }
  }
};

export default institutionService;