import axiosClient from '../axiosClient';

export const codeService = {
  generateCodeManual: async () => {
    const response = await axiosClient.get('/code/generate-code');
    return response.data;
  },

  validateCode: async (data: { verificationId: string; code: string }) => {
    const response = await axiosClient.post('/code/validate-code', data);
    return response.data;
  },

  snoozeCode: async (data: { verificationId: string }) => {
    const response = await axiosClient.post('/code/snooze-code', data);
    return response.data;
  },

  getActiveCode: async () => {
    const response = await axiosClient.get('/code/get-active');
    return response.data;
  },

  expireCode: async (data: { verificationId: string }) => {
    const response = await axiosClient.post('/code/expire-code', data);
    return response.data;
  }, 
};