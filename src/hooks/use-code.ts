import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import { useEffect, useRef } from 'react';
import { codeService } from '../api/services/codeService';
import { VerificationResponse } from '../types/dataInterface';

export const useGetActiveVerification = () => {
  const previousVerificationId = useRef<string | null>(null);
  
  const query = useQuery<VerificationResponse>({
    queryKey: ['activeVerification'],
    queryFn: codeService.getActiveCode,
    refetchInterval: 5000, 
    refetchOnWindowFocus: true,
    staleTime: 0,
    gcTime: 0,
  });

  // Handle desktop notification when new verification appears
  useEffect(() => {
    const verification = query.data?.verification;
    
    if (
      verification && 
      verification.verification_id !== previousVerificationId.current &&
      Notification.permission === 'granted'
    ) {
      new Notification('Verification Required', {
        body: `Please verify your presence by entering the code.\nExpires in 15 minutes.`,
        icon: '/favicon.ico',
        requireInteraction: true,
        tag: 'verification-prompt',
      });
      
      previousVerificationId.current = verification.verification_id;
    } else if (!verification) {
      previousVerificationId.current = null;
    }
  }, [query.data?.verification]);
  return query;
};

export const useGenerateVerification = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: codeService.generateCodeManual,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activeVerification'] });
      toast.success('Verification code generated!');
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to generate code.';
      toast.error(errorMessage);
      console.error('Failed to generate code:', error);
    },
  });
};

export const useValidateCode = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ verificationId, code }: { verificationId: string; code: string }) =>
      codeService.validateCode({ verificationId, code: code.toUpperCase() }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activeVerification'] });
      queryClient.invalidateQueries({ queryKey: ["workStatus"] });
      queryClient.invalidateQueries({ queryKey: ["attendances"] });
      queryClient.invalidateQueries({ queryKey: ["allUsers"] });
      toast.success('Code validated successfully!');
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const errorMessage = error.message || 'Invalid code';
      toast.error(errorMessage);
    },
  });
};

export const useSnoozeVerification = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: codeService.snoozeCode,
    onSuccess: async (data) => {
      queryClient.invalidateQueries({ queryKey: ['activeVerification'] });
      await queryClient.refetchQueries({ queryKey: ['activeVerification'] });
      toast.success(`Code snoozed (${data.snooze_count}/3 snoozes used)`);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const errorMessage = error.response?.data?.message || error.message || "Failed to snooze.";
      toast.error(errorMessage);
    },
  });
};

// Request notification permission
export const requestNotificationPermission = async () => {
  if ('Notification' in window && Notification.permission === 'default') {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }
  return Notification.permission === 'granted';
};