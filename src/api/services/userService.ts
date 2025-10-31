import axiosClient from '../axiosClient';

export const userService = {
  getUser: async () => {
    const response = await axiosClient.get('/user/get-user');
    return response.data;
  }
};