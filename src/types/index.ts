export type Task = {
  id: string;
  title: string;
};
export type ThemeState = {
  isDark: boolean;
  toggle: () => void;
};
export type UserState = {
  name: string | null;
  setName: (name: string) => void;
};
export type RootStackParamList = {
  TaskList: undefined;
  TaskDetails: { taskId: string };
  EditTask: { taskId: string };
  Froggie: undefined;
  TheLake: undefined;
  Schedule: undefined;
  EditShift: { date: string };
  Calculator: undefined;
};
export type Shift = {
  id: string;
  date: string; // "2026-02-20"
  startTime: string; // "08:00"
  endTime: string; // "16:00"
  coworker?: string;
};
export type TaskState = {
  tasks: Task[];
  addTask: (title: string) => void;
  removeTask: (id: string) => void;
};
