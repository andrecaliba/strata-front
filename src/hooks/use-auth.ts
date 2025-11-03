import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "../api/services/authService";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AxiosError } from "axios";

export const useSignUp = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: authService.signUp,
    onSuccess: (data) => {
      router.push("/");
      toast.success(data.message);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const errorMessage = error.response?.data?.message || "Sign up failed. Please try again.";
      toast.error(errorMessage);
      console.error("Sign up failed:", errorMessage);
    },
  });
};

export const useSignIn = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: authService.signIn,
    onSuccess: (data) => {
      console.log("Login response:", data); // Debug log
      // Store token
      if (data.token) {
        localStorage.setItem("authToken", data.token);
        console.log("Token stored:", data.token);
      } else {
        console.error("No token in response:", data);
      }
      // Redirect to user's home page
      router.push(`/${data.userId}/home`);
      toast.success("Logged in successfully!");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const errorMessage = error.response?.data?.message || "Sign in failed. Please try again.";
      toast.error(errorMessage);
      console.error("Sign in failed:", error);
    },
  });
};

export const useSignOut = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.signOut,
    onSuccess: () => {
      // Clear all cached data
      queryClient.clear();
      // Remove token
      localStorage.removeItem("authToken");
      // Redirect to login
      router.push("/");
    },
    onError: (error) => {
      console.error("Sign out failed:", error);
      // Still clear local data even if server logout fails
      localStorage.removeItem("authToken");
      router.push("/");
    },
  });
};
