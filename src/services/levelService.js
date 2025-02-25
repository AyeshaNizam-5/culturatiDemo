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
      // const response = await api.get(`${ENDPOINTS.LEVELS.GET_ALL}?institutionId=${institutionId}`);
      // return response.data;
      const filteredLevels = mockLevels.filter(level => level.institutionId === parseInt(institutionId));
      return Promise.resolve({ data: filteredLevels });
    } catch (error) {
      console.error('Error fetching levels:', error);
      throw error;
    }
  },

  create: async (levelData, institutionId) => {
    try {
      const newLevel = { 
        id: mockLevels.length + 1, 
        ...levelData,
        institutionId: parseInt(institutionId)
      };
      mockLevels.push(newLevel);
      return Promise.resolve({ data: newLevel });
    } catch (error) {
      console.error('Error creating level:', error);
      throw error;
    }
  },

  update: async (id, levelData, institutionId) => {
    try {
      const index = mockLevels.findIndex(l => l.id === id && l.institutionId === parseInt(institutionId));
      if (index !== -1) {
        mockLevels[index] = { ...mockLevels[index], ...levelData };
        return Promise.resolve({ data: mockLevels[index] });
      }
      throw new Error('Level not found');
    } catch (error) {
      console.error('Error updating level:', error);
      throw error;
    }
  },

  delete: async (id, institutionId) => {
    try {
      const index = mockLevels.findIndex(l => l.id === id && l.institutionId === parseInt(institutionId));
      if (index !== -1) {
        mockLevels.splice(index, 1);
        return Promise.resolve({ success: true });
      }
      throw new Error('Level not found');
    } catch (error) {
      console.error('Error deleting level:', error);
      throw error;
    }
  }
};

export default levelService;
