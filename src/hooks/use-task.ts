import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { taskService } from "../api/services/taskService";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";

export const useGetAllTasks = () => {
  return useQuery({
    queryKey: ["alltasks"],
    queryFn: taskService.getAllTasks,
  });
};

export const useGetTasks = () => {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: taskService.getTasks,
  });
};

export const useGetTaskById = (taskId: string) => {
  return useQuery({
    queryKey: ["task", taskId],
    queryFn: () => taskService.getTaskById(taskId),
  });
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: taskService.createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Task created successfully!");
      router.back();
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const errorMessage =
        error.response?.data?.message || error.message || "Failed to create task. Please try again.";
      toast.error(errorMessage);
      console.error("Create task failed:", errorMessage);
    },
  });
};

export const useToggleSubtask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ subtaskId, completed }: { subtaskId: string; completed: boolean }) =>
      taskService.toggleSubtask(subtaskId, completed),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["alltasks"] });
      queryClient.invalidateQueries({ queryKey: ["task"] });
      toast.success("Subtask toggled successfully!");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const errorMessage =
        error.response?.data?.message || error.message ||  "Failed to toggle subtask. Please try again.";
      toast.error(errorMessage);
      console.error("Toggle subtask failed:", errorMessage);
    },
  });
};
