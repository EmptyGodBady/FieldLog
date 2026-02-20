import { Text, TextInput, View, TouchableOpacity } from "react-native";
import { useTheme } from "../theme/ThemeProvider";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SendHorizonal } from "lucide-react-native";
import BaseLayout from "../components/BaseLayout";
type Props = {
  setUserName: (name: string) => void;
};
export default function WelcomeScreen({ setUserName }: Props) {
  const [userName, setLocalUserName] = useState("");
  const { theme, toggleTheme, isDark } = useTheme();

  const handleContinue = async () => {
    const trimmed = userName.trim();
    if (trimmed) {
      await AsyncStorage.setItem("userName", trimmed);
      setUserName(trimmed);
    }
  };
  return (
    <BaseLayout>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "60%",
          gap: 8,
        }}
      >
        <Text
          style={{
            color: theme.colors.textPrimary,
            fontSize: 48,
            fontWeight: "500",
            marginBottom: 16,
          }}
        >
          Hi
        </Text>
        <TextInput
          value={userName}
          onChangeText={setLocalUserName}
          style={{
            color: theme.colors.textPrimary,
            width: "auto",
            minWidth: "20%",
            maxWidth: "80%",
            height: 50,
            padding: 12,
            borderWidth: 1,
            borderRadius: 12,
            marginBottom: 16,
            borderColor: theme.colors.primary,
            fontSize: 32,
          }}
        />
        <Text
          style={{
            color: theme.colors.textPrimary,
            fontSize: 48,
            fontWeight: "500",
            marginBottom: 16,
          }}
        >
          !
        </Text>
      </View>
      <TouchableOpacity
        style={{
          borderRadius: 16,
          backgroundColor: theme.colors.primary,
          height: 50,
          width: 180,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 8,
          marginTop: 100,
        }}
        onPress={handleContinue}
      >
        <Text style={{ color: theme.colors.textPrimary, fontSize: 24 }}>
          Let's go!
        </Text>
        <SendHorizonal color={theme.colors.textPrimary} />
      </TouchableOpacity>
    </BaseLayout>
  );
}
