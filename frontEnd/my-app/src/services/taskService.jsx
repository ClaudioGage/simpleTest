import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000'; 
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    throw error;
  }
);

export const taskService = {

  async getTasks(type = null) {
    try {
      const params = {};
      if (type && type !== 'all') {
        params.type = type;
      }
      
      const response = await api.get('/task', { params });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch tasks');
    }
  },


  async getTask(id) {
    try {
      const response = await api.get(`/task/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch task');
    }
  },

  async createTask(taskData) {
    try {
      const response = await api.post('/task', taskData);
      return response.data;
    } catch (error) {
      if (error.response?.status === 400) {
        throw new Error(error.response.data.message || 'Invalid task data');
      }
      throw new Error(error.response?.data?.message || 'Failed to create task');
    }
  },

  async updateTask(id, taskData) {
    try {
      const response = await api.put(`/task/${id}`, taskData);
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        throw new Error('Task not found');
      }
      if (error.response?.status === 400) {
        throw new Error(error.response.data.message || 'Invalid task data');
      }
      throw new Error(error.response?.data?.message || 'Failed to update task');
    }
  },

  async deleteTask(id) {
    try {
      const response = await api.delete(`/task/${id}`);
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        throw new Error('Task not found');
      }
      throw new Error(error.response?.data?.message || 'Failed to delete task');
    }
  },
};