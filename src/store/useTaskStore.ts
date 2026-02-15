import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Task } from "../types";

type TaskState = {
  tasks: Task[];
  addTask: (title: string, description: string) => void;
  toggleTask: (id: string) => void;
  removeTask: (id: string) => void;
};
export const useTaskStore = create<TaskState>()(
  persist(
    (set, get) => ({
      tasks: [],

      addTask: (title, description) => {
        const newTask: Task = {
          id: uuidv4(),
          title,
          description,
          status: "open",
          createdAt: Date.now(),
          updatedAt: Date.now(),
          syncStatus: "pending",
        };

        set({ tasks: [newTask, ...get().tasks] });
      },

      toggleTask: (id) => {
        set({
          tasks: get().tasks.map((task) =>
            task.id === id
              ? {
                  ...task,
                  status: task.status === "open" ? "done" : "open",
                  updatedAt: Date.now(),
                  syncStatus: "pending",
                }
              : task,
          ),
        });
      },

      removeTask: (id) => {
        set({
          tasks: get().tasks.filter((task) => task.id !== id),
        });
      },
    }),
    {
      name: "task-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
