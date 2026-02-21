import { ReactNode } from "react";
import { FlexAlignType, TouchableOpacity, View } from "react-native";
import { useTheme } from "../theme/ThemeProvider";
import { Moon, Sun } from "lucide-react-native";
type Props = {
  children: ReactNode;
  align?: FlexAlignType;
};
export default function BaseLayout({ children, align = "center" }: Props) {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <View
      style={{
        backgroundColor: theme.colors.background,
        height: "100%",
        flex: 1,
        alignItems: align,
      }}
    >
      {children}
      <TouchableOpacity
        style={{
          position: "absolute",
          bottom: 48,
          right: 48,
          width: 48,
          height: 48,
          borderRadius: 16,
          borderColor: theme.colors.textPrimary,
          borderWidth: 2,
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: theme.colors.background,
        }}
        onPress={toggleTheme}
      >
        {isDark ? <Sun color={theme.colors.textPrimary} /> : <Moon />}
      </TouchableOpacity>
    </View>
  );
}
