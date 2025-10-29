import { useMutation } from "@tanstack/react-query";
import { calendarService } from "@/api/services/calendarService";
import { toast } from "sonner"; // or your toast library
import { AxiosError } from "axios";

export const useCalendar = () => {
  const connectGoogleMutation = useMutation({
    mutationFn: calendarService.getGoogleAuthUrl,
    onSuccess: (data) => {
      // Open Google OAuth in a popup window
      const width = 500;
      const height = 600;
      const left = window.screenX + (window.outerWidth - width) / 2;
      const top = window.screenY + (window.outerHeight - height) / 2;
      
      window.open(
        data.authUrl,
        "Google Calendar Connection",
        `width=${width},height=${height},left=${left},top=${top}`
      );
      
      toast.success("Opening Google Calendar authorization...");
    },
    onError: (error: AxiosError<{ message: string }>) => {
        const errorMessage = error.message || 'Failed to connect Google Calendar.';
        toast.error(errorMessage);
        console.error('Error connecting Google Calendar:', errorMessage);
    },
  });

  const syncTaskMutation = useMutation({
    mutationFn: (taskId: string) => calendarService.syncTaskToCalendar(taskId),
    onSuccess: () => {
      toast.success("Task synced to Google Calendar successfully!");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const errorMessage = error.message || 'Failed to sync task to Google Calendar.';
      toast.error(errorMessage);
      console.error('Error syncing task to Google Calendar:', errorMessage);
    },
  });

  const syncAllTasksMutation = useMutation({
    mutationFn: calendarService.syncAllTasksToCalendar,
    onSuccess: () => {
      toast.success("All tasks synced to Google Calendar successfully!");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const errorMessage = error.message || 'Failed to sync tasks to Google Calendar.';
      toast.error(errorMessage);
      console.error('Error syncing tasks to Google Calendar:', errorMessage);
    },
  });

  return {
    connectGoogle: connectGoogleMutation.mutate,
    syncTask: syncTaskMutation.mutate,
    syncAllTasks: syncAllTasksMutation.mutate,
    isConnecting: connectGoogleMutation.isPending,
    isSyncing: syncTaskMutation.isPending,
    isSyncingAll: syncAllTasksMutation.isPending,
  };
};