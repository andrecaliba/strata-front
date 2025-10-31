import axiosClient from '../axiosClient';

// export interface Attendance {
//   attendance_id: string;
//   date: Date;
//   time_in: Date;
//   time_out: Date | null;
//   time_total: number; // Total work time in seconds
//   status: 'Active' | 'Taking a Break' | 'Completed' | 'Flagged';
//   break_started_at: Date | null;
//   last_sync_at: Date | null;
//   next_prompt_due: Date | null;
//   remaining_break: number; // Remaining break time in seconds
// }

// export interface WorkResponse {
//   message: string;
//   attendance: Attendance | null;
// }

export const workService = {
  timeIn: async () => {
    const response = await axiosClient.get('/work/time-in');
    return response.data;
  },
  
  timeOut: async () => {
    const response = await axiosClient.get('/work/time-out');
    return response.data;
  },
  
  startBreak: async () => {
    const response = await axiosClient.get('/work/start-break');
    return response.data;
  },
  
  endBreak: async () => {
    const response = await axiosClient.get('/work/end-break');
    return response.data;
  },
  
  syncTime: async () => {
    const response = await axiosClient.get('/work/sync-time');
    return response.data;
  }
};

