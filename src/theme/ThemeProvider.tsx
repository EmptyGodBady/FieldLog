import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { darkTheme, lightTheme } from "./theme";
import AsyncStorage from "@react-native-async-storage/async-storage";

type ThemeContextValue = {
  theme: typeof lightTheme;
  isDark: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const loadTheme = async () => {
      const saved = await AsyncStorage.getItem("theme");
      if (saved === "dark") setIsDark(true);
    };
    loadTheme();
  }, []);

  const toggleTheme = async () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    await AsyncStorage.setItem("theme", newIsDark ? "dark" : "light");
  };

  const theme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used inside ThemeProvider");
  return context;
};
