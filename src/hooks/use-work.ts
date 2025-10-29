import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { workService } from '../api/services/workService';

export const useTimeIn = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: workService.timeIn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['attendance'] });
      queryClient.invalidateQueries({ queryKey: ['workStatus'] });
    },
    onError: (error) => {
      console.error('Time in failed:', error);
    },
  });
};

export const useTimeOut = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: workService.timeOut,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['attendance'] });
      queryClient.invalidateQueries({ queryKey: ['workStatus'] });
    },
    onError: (error) => {
      console.error('Time out failed:', error);
    },
  });
};

export const useStartBreak = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: workService.startBreak,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['attendance'] });
      queryClient.invalidateQueries({ queryKey: ['workStatus'] });
    },
    onError: (error) => {
      console.error('Start break failed:', error);
    },
  });
};

export const useEndBreak = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: workService.endBreak,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['attendance'] });
      queryClient.invalidateQueries({ queryKey: ['workStatus'] });
    },
    onError: (error) => {
      console.error('End break failed:', error);
    },
  });
};

export const useSyncTime = () => {
  return useQuery({
    queryKey: ['workStatus'],
    queryFn: workService.syncTime,
    refetchInterval: 30000, // Refetch every 30 seconds
  });
};