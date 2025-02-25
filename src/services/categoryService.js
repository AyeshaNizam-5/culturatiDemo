import api from './api';
import { ENDPOINTS } from '../config/apiConfig';

const mockCategories = [
  { id: 1, name: 'History', description: 'Cultural and historical content', institutionId: 1 },
  { id: 2, name: 'Art', description: 'All about art and creativity', institutionId: 1 },
  { id: 3, name: 'Science', description: 'Scientific exhibits', institutionId: 2 },
  { id: 4, name: 'Architecture', description: 'Architectural history', institutionId: 2 }
];

const categoryService = {
  getAll: async (institutionId) => {
    try {
      // When backend is ready, uncomment:
      // const response = await api.get(`${ENDPOINTS.CATEGORIES.GET_ALL}?institutionId=${institutionId}`);
      // return response.data;
      const filteredCategories = mockCategories.filter(cat => cat.institutionId === parseInt(institutionId));
      return Promise.resolve({ data: filteredCategories });
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },

  create: async (categoryData, institutionId) => {
    try {
      const newCategory = { 
        id: mockCategories.length + 1, 
        ...categoryData,
        institutionId: parseInt(institutionId)
      };
      mockCategories.push(newCategory);
      return Promise.resolve({ data: newCategory });
    } catch (error) {
      console.error('Error creating category:', error);
      throw error;
    }
  },

  update: async (id, categoryData, institutionId) => {
    try {
      const index = mockCategories.findIndex(c => c.id === id && c.institutionId === parseInt(institutionId));
      if (index !== -1) {
        mockCategories[index] = { ...mockCategories[index], ...categoryData };
        return Promise.resolve({ data: mockCategories[index] });
      }
      throw new Error('Category not found');
    } catch (error) {
      console.error('Error updating category:', error);
      throw error;
    }
  },

  delete: async (id, institutionId) => {
    try {
      const index = mockCategories.findIndex(c => c.id === id && c.institutionId === parseInt(institutionId));
      if (index !== -1) {
        mockCategories.splice(index, 1);
        return Promise.resolve({ success: true });
      }
      throw new Error('Category not found');
    } catch (error) {
      console.error('Error deleting category:', error);
      throw error;
    }
  }
};

export default categoryService;