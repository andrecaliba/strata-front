import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { workService } from "../api/services/workService";

export const useTimeIn = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: workService.timeIn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workStatus"] });
      queryClient.refetchQueries({ queryKey: ["workStatus"] });
    },
    onError: (error) => {
      console.error("Time in failed:", error);
    },
  });
};

export const useTimeOut = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: workService.timeOut,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workStatus"] });
      queryClient.refetchQueries({ queryKey: ["workStatus"] });
    },
    onError: (error) => {
      console.error("Time out failed:", error);
    },
  });
};

export const useStartBreak = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: workService.startBreak,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workStatus"] });
      queryClient.refetchQueries({ queryKey: ["workStatus"] });
    },
    onError: (error) => {
      console.error("Start break failed:", error);
    },
  });
};

export const useEndBreak = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: workService.endBreak,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workStatus"] });
      queryClient.refetchQueries({ queryKey: ["workStatus"] });
    },
    onError: (error) => {
      console.error("End break failed:", error);
    },
  });
};

export const useSyncTime = () => {
  return useQuery({
    queryKey: ["workStatus"],
    queryFn: workService.syncTime,
    refetchInterval: (query) => {
      // Stop refetching if status is Completed
      const data = query.state.data;
      // Stop refetching only if no attendance at all
      if (!data?.attendance) {
        console.log('Stopping refetch - No attendance found');
        return false;
      }
      // Keep refetching even when completed (but at a slower rate)
      if (data.attendance.status === 'Completed') {
        console.log('Slow refetch - Work completed');
        return 60000; // Refetch every 60 seconds when completed
      }
      
      // Faster sync when on break to catch when break time exhausts
      if (data.attendance.status === 'Taking a Break') {
        return 5000; // Sync every 5 seconds when on break
      }
      return 30000; // Refetch every 30 seconds otherwise
    },
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    staleTime: 0,
    gcTime: 0, // Don't cache - always fetch fresh
    retry: 1,
  });
};

export const useGetAllAttendances = (date?: string, searchInput?: string) => {
  return useQuery({
    queryKey: ["attendances", date, searchInput],
    queryFn: () => workService.getAllAttendances(date, searchInput),
  });
};

export const useGetAttendances = () => {
  return useQuery({
    queryKey: ["attendances"],
    queryFn: workService.getAttendances,
  });
}