import axiosClient from '../axiosClient';

export const workService = {
  timeIn: async () => {
    const response = await axiosClient.get('/work/time-in');
    return response.data;
  },
  
  timeOut: async () => {
    const response = await axiosClient.get('/work/time-out');
    return response.data;
  },
  
  startBreak: async () => {
    const response = await axiosClient.get('/work/start-break');
    return response.data;
  },
  
  endBreak: async () => {
    const response = await axiosClient.get('/work/end-break');
    return response.data;
  },
  
  syncTime: async () => {
    const response = await axiosClient.get('/work/sync-time');
    return response.data;
  }
};

