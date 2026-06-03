import { create } from 'zustand';
import { User, Course, Module, StudentProgress, Role } from '../types';

interface StoreState {
  // Autenticação
  currentUser: User | null;
  login: (username: string, password?: string) => boolean;
  logout: () => void;

  // Dados Globais
  users: User[];
  courses: Course[];
  modules: Module[];
  progress: StudentProgress[];

  // Ações de Admin (Alunos)
  addUser: (user: Omit<User, 'id'>) => void;
  updateUser: (id: string, user: Partial<User>) => void;
  deleteUser: (id: string) => void;

  // Ações de Admin (Cursos)
  addCourse: (course: Omit<Course, 'id'>) => void;
  updateCourse: (id: string, course: Partial<Course>) => void;
  deleteCourse: (id: string) => void;

  // Ações de Admin (Módulos)
  addModule: (module: Omit<Module, 'id'>) => void;
  updateModule: (id: string, module: Partial<Module>) => void;
  deleteModule: (id: string) => void;

  // Ações de Aluno (Progresso)
  markModuleCompleted: (studentId: string, courseId: string, moduleId: string) => void;
}

const initialUsers: User[] = [
  { id: '1', name: 'Administrador', phone: '000000000', username: 'admin', role: 'ADMIN', password: '123' },
  { id: '2', name: 'João Silva', phone: '11999999999', username: 'joao', role: 'STUDENT', password: '123', courseId: 'c2' },
];

const initialCourses: Course[] = [
  {
    id: 'c1',
    title: 'Operador de Guindauto / Caminhão Munck',
    description: 'Curso completo de operação segura de Guindauto/Munck.',
    imageUrl: 'https://images.unsplash.com/photo-1605333390962-e9185a4918e3?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'c2',
    title: 'Operador de Escavadeira Hidráulica',
    description: 'Aprenda a operar escavadeiras com foco em segurança e eficiência.',
    imageUrl: 'https://images.unsplash.com/photo-1541888081691-88f287431e78?auto=format&fit=crop&q=80&w=800',
  },
];

const initialModules: Module[] = [
  {
    id: 'm1',
    courseId: 'c1',
    title: 'Módulo 1: Introdução e Normas Regulamentadoras',
    description: 'Conheça a NR-11 e NR-12 aplicadas à operação.',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    activityDescription: 'Responda: Quais os principais EPIs para operação de Munck?',
    isLocked: false,
  },
  {
    id: 'm2',
    courseId: 'c1',
    title: 'Módulo 2: Inspeção Diária',
    description: 'Como realizar o checklist diário do equipamento.',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    isLocked: false,
  },
];

const initialProgress: StudentProgress[] = [
  {
    id: 'p1',
    studentId: '2',
    courseId: 'c1',
    completedModuleIds: [],
  },
];

export const useStore = create<StoreState>((set, get) => ({
  currentUser: null,
  users: initialUsers,
  courses: initialCourses,
  modules: initialModules,
  progress: initialProgress,

  login: (username, password) => {
    const user = get().users.find(u => u.username === username && u.password === password);
    if (user) {
      set({ currentUser: user });
      return true;
    }
    return false;
  },
  logout: () => set({ currentUser: null }),

  addUser: (user) => set((state) => ({ users: [...state.users, { ...user, id: Date.now().toString() }] })),
  updateUser: (id, userUpdate) => set((state) => ({
    users: state.users.map((u) => (u.id === id ? { ...u, ...userUpdate } : u)),
  })),
  deleteUser: (id) => set((state) => ({
    users: state.users.filter((u) => u.id !== id),
  })),

  addCourse: (course) => set((state) => ({ courses: [...state.courses, { ...course, id: Date.now().toString() }] })),
  updateCourse: (id, courseUpdate) => set((state) => ({
    courses: state.courses.map((c) => (c.id === id ? { ...c, ...courseUpdate } : c)),
  })),
  deleteCourse: (id) => set((state) => ({
    courses: state.courses.filter((c) => c.id !== id),
  })),

  addModule: (moduleData) => set((state) => ({ modules: [...state.modules, { ...moduleData, id: Date.now().toString() }] })),
  updateModule: (id, moduleUpdate) => set((state) => ({
    modules: state.modules.map((m) => (m.id === id ? { ...m, ...moduleUpdate } : m)),
  })),
  deleteModule: (id) => set((state) => ({
    modules: state.modules.filter((m) => m.id !== id),
  })),

  markModuleCompleted: (studentId, courseId, moduleId) => set((state) => {
    const existingProgress = state.progress.find(p => p.studentId === studentId && p.courseId === courseId);
    
    if (existingProgress) {
      if (!existingProgress.completedModuleIds.includes(moduleId)) {
        return {
          progress: state.progress.map(p => 
            p.id === existingProgress.id 
              ? { ...p, completedModuleIds: [...p.completedModuleIds, moduleId] }
              : p
          )
        };
      }
      return state;
    } else {
      return {
        progress: [
          ...state.progress,
          {
            id: Date.now().toString(),
            studentId,
            courseId,
            completedModuleIds: [moduleId],
          }
        ]
      };
    }
  }),
}));
