import axiosClient from '../axiosClient';

export const authService = {
  signUp: async (data: { email: string; firstName: string; lastName: string; password: string }) => {
    const response = await axiosClient.post('/auth/sign-up', data);
    return response.data;
  },
  
  signIn: async (data: { email: string; password: string }) => {
    const response = await axiosClient.post('/auth/sign-in', data);
    return response.data;
  },

  signOut: async () => {
    const response = await axiosClient.get('/auth/sign-out');
    return response.data;
  }
};