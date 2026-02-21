import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Task, TaskState } from "../types";

export const useTaskStore = create<TaskState>()(
  persist(
    (set, get) => ({
      tasks: [],

      addTask: (title) => {
        const newTask: Task = {
          id: uuidv4(),
          title,
        };

        set({ tasks: [newTask, ...get().tasks] });
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
