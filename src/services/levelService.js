import api from './api';
import { ENDPOINTS } from '../config/apiConfig';

const mockLevels = [
  { id: 1, name: 'Beginner', description: 'Basic level of knowledge', institutionId: 1 },
  { id: 2, name: 'Intermediate', description: 'Moderate knowledge and skills', institutionId: 1 },
  { id: 3, name: 'Advanced', description: 'Expert level of knowledge', institutionId: 1 },
  { id: 4, name: 'Novice', description: 'Entry level knowledge', institutionId: 2 },
  { id: 5, name: 'Expert', description: 'Advanced understanding', institutionId: 2 }
];

const levelService = {
  getAll: async (institutionId) => {
    try {
      // When backend is ready, uncomment:
      const response = await api.get(`${ENDPOINTS.LEVELS.GET_ALL}`);
      // const filteredLevels = mockLevels.filter(level => level.institutionId === parseInt(institutionId));
      return Promise.resolve({ data: response.data });
    } catch (error) {
      console.error('Error fetching levels:', error);
      throw error;
    }
  },

  create: async (levelData, institutionId) => {
    try {
      // const newLevel = { 
      //   id: mockLevels.length + 1, 
      //   ...levelData,
      //   institutionId: parseInt(institutionId)
      // };
      // mockLevels.push(newLevel);
      console.log('Level data:', levelData);
      const response = await api.post(`${ENDPOINTS.LEVELS.CREATE}`, levelData);
      return Promise.resolve({ data: response.data });
    } catch (error) {
      console.error('Error creating level:', error);
      throw error;
    }
  },

  update: async (id, levelData, institutionId) => {
    try {
      // const index = mockLevels.findIndex(l => l.id === id && l.institutionId === parseInt(institutionId));
      // if (index !== -1) {
      //   mockLevels[index] = { ...mockLevels[index], ...levelData };
      //   return Promise.resolve({ data: mockLevels[index] });
      // }
      console.log('Level data:', levelData);
      const newlevelData = {
        ...levelData,
        id: id,
        levelOrder: 1,
      };
      console.log('New level data:', newlevelData);
      const response = await api.put(ENDPOINTS.LEVELS.DELETE(id), newlevelData);
      console.log('Response:', response.data);
      return response.data;
      throw new Error('Level not found');
    } catch (error) {
      console.error('Error updating level:', error);
      throw error;
    }
  },

  delete: async (id, institutionId) => {
    try {
      const response = await api.delete(ENDPOINTS.LEVELS.DELETE(id));
      return response.data;
    } catch (error) {
      console.error('Error deleting level:', error);
      throw error;
    }
  }
};

export default levelService;
