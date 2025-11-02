import { useQuery } from '@tanstack/react-query';
import { userService } from '../api/services/userService';
import { User } from '@/types/dataInterface';

export const useGetUser = () => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;

  return useQuery<User>({
    queryKey: ['currentUser'],
    queryFn: userService.getUser,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    retry: 1,
    enabled: !!token,
    
  })
}

export const useGetAllUsers = () => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;

  return useQuery<User[]>({
    queryKey: ['allUsers'],
    queryFn: userService.getAllUsers,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    retry: 1,
    enabled: !!token,
  })
}