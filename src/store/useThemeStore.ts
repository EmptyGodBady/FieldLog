import { create } from "zustand";

type ThemeState = {
  isDark: boolean;
  toggle: () => void;
};

const useThemeStore = create<ThemeState>((set) => ({
  isDark: false,
  toggle: () => set((state) => ({ isDark: !state.isDark })),
}));
  