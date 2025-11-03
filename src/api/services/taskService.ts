import axiosClient from '../axiosClient';

export const taskService = {
  createTask: async (data: {
    title: string;
    description: string;
    dueDate: Date;
    difficulty: string;
    assignees: string[] | string;
    subtasks: string[] | string;
  }) => {
    const response = await axiosClient.post('/task/create-task', data);
    return response.data;
  },
  
  getAllTasks: async () => {
    const response = await axiosClient.get('/task/get-all-tasks');
    return response.data;
  },

  getTasks: async () => {
    const response = await axiosClient.get('/task/get-tasks');
    return response.data;
  },

  getTaskById: async (taskId: string) => {
    const response = await axiosClient.get(`/task/get-task/${taskId}`);
    return response.data;
  },

  toggleSubtask: async (subtaskId: string, completed: boolean) => {
    const response = await axiosClient.post(`/task/toggle-subtask/${subtaskId}`, { completed });
    return response.data;
  }
};