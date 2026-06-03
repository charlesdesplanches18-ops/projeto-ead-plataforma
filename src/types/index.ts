export type Role = 'ADMIN' | 'STUDENT';

export interface User {
  id: string;
  name: string;
  phone: string;
  email?: string;
  username: string;
  password?: string;
  role: Role;
  courseId?: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
}

export interface Module {
  id: string;
  courseId: string;
  title: string;
  description: string;
  videoUrl: string;
  pdfUrl?: string;
  activityDescription?: string;
  isLocked: boolean;
}

export interface StudentProgress {
  id: string;
  studentId: string;
  courseId: string;
  completedModuleIds: string[];
}
