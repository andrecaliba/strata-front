import axiosClient from '../axiosClient';

export const calendarService = {
  getGoogleAuthUrl: async (): Promise<{ authUrl: string }> => {
    const response = await axiosClient.get('/calendar/google/auth');
    return response.data;
  },
  
  syncTaskToCalendar: async (taskId: string): Promise<{ message: string; eventId: string }> => {
    const response = await axiosClient.post(`/calendar/sync-task/${taskId}`);
    return response.data;
  },

  syncAllTasksToCalendar: async (): Promise<{ message: string }> => {
    const response = await axiosClient.post('/calendar/sync-all-tasks');
    return response.data;
  },
};