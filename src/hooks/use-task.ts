import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { taskService } from '../api/services/taskService';

export const useGetTasks = () => {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: taskService.getTasks,
  });
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: taskService.createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
    onError: (error) => {
      console.error('Create task failed:', error);
    },
  });
};