export interface User {
  user_id: string;
  manager: User | null;
  subordinates: User[];
  email: string;
  first_name: string;
  last_name: string;
  role: 'Employee' | 'Manager';
  attendances?: Attendance[];
  tasks?: Task[];
}

export interface Assignee extends User {
  progress: number;
}

export interface Subtask {
  subtask_id: string;
  title: string;
  completed: boolean;
}

export interface Task {
  task_id: string;
  title: string;
  description: string;
  difficulty: "Easy" | "Moderate" | "Hard";
  status: "To Do" | "In Progress" | "Completed" | "For Review";
  due_date: string;
  progress: number;
  assignees: Assignee[];
  subtasks: Subtask[];
}

export interface Verification {
  verification_id: string;
  code: string;
  time: Date;
  expiration: Date;
  status: 'Pending' | 'Completed' | 'Missed';
  snooze_count: number;
  last_snooze_time?: Date;
}

export interface VerificationResponse {
  message: string;
  verification: Verification | null;
}

export interface Attendance {
  attendance_id: string;
  date: string;
  time_in?: string;
  time_out?: string;
  user: User;
  status: 'Active' | 'Taking a Break' | 'Completed' | 'Flagged';
  time_total: number;
  remaining_break: number;
}