import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { taskService } from "../api/services/taskService";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";

export const useGetTasks = () => {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: taskService.getTasks,
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
        error.message || error.response?.data?.message || "Failed to create task. Please try again.";
      toast.error(errorMessage);
      console.error("Create task failed:", errorMessage);
    },
  });
};
