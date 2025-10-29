import axiosClient from '../axiosClient';

export const taskService = {
  createTask: async (data: {
    title: string;
    description: string;
    dueDate: Date;
    difficulty: string;
    assignees: string[];
  }) => {
    const response = await axiosClient.post('/task/create-task', data);
    return response.data;
  },
  
  getTasks: async () => {
    const response = await axiosClient.get('/task/get-tasks');
    return response.data;
  }
};