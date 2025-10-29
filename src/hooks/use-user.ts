import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { userService } from '../api/services/userService';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { AxiosError } from 'axios';

export const useGetUser = () => {
  return useQuery({
    queryKey: ['getUser'],
    queryFn: userService.getUser,
  })
}

