import api from './api';
import { ENDPOINTS } from '../config/apiConfig';

const mockLevels = [
  { id: 1, name: 'Beginner', description: 'Basic level of knowledge' },
  { id: 2, name: 'Intermediate', description: 'Moderate knowledge and skills' },
  { id: 3, name: 'Advanced', description: 'Expert level of knowledge' }
];

const levelService = {
  getAll: async () => {
    try {
      const response = await api.get(ENDPOINTS.LEVELS.GET_ALL);
      return response.data;
    } catch (error) {
      console.error('Error fetching levels:', error);
      throw error;
    }
  },
  create: async (levelData) => {
    try {
      const newLevel = { id: mockLevels.length + 1, ...levelData };
      mockLevels.push(newLevel);
      return Promise.resolve({ data: newLevel });
    } catch (error) {
      console.error('Error creating level:', error);
      throw error;
    }
  },
  update: async (id, levelData) => {
    try {
      const index = mockLevels.findIndex(l => l.id === id);
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
  delete: async (id) => {
    try {
      const index = mockLevels.findIndex(l => l.id === id);
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
