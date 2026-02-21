import { Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../theme/ThemeProvider";
import {
  Activity,
  Calculator,
  CalendarFold,
  Notebook,
} from "lucide-react-native";
import BaseLayout from "../components/BaseLayout";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RootStackParamList } from "../types";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "TheLake">;

export default function MainScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const userName = AsyncStorage.getItem("userName");

  return (
    <BaseLayout>
      <Text
        style={{
          fontSize: 56,
          fontWeight: "600",
          paddingTop: 24,
          color: theme.colors.textPrimary,
        }}
      >
        Hi, {userName}!
      </Text>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          gap: "15%",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 100,
        }}
      >
        <TouchableOpacity
          style={{
            borderRadius: 16,
            backgroundColor: theme.colors.primary,
            height: 150,
            width: 150,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 8,
            paddingHorizontal: 16,
          }}
          onPress={() => navigation.navigate("TaskList")}
        >
          <Text style={{ color: theme.colors.textPrimary, fontSize: 24 }}>
            Tasks
          </Text>
          <Notebook color={theme.colors.textPrimary} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            borderRadius: 16,
            backgroundColor: theme.colors.primary,
            height: 150,
            width: 150,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 8,
            paddingHorizontal: 16,
          }}
          onPress={() => navigation.navigate("Schedule")}
        >
          <Text style={{ color: theme.colors.textPrimary, fontSize: 24 }}>
            Schedule
          </Text>
          <CalendarFold color={theme.colors.textPrimary} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            borderRadius: 16,
            backgroundColor: theme.colors.primary,
            height: 150,
            width: 150,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 8,
            paddingHorizontal: 16,
          }}
          onPress={() => navigation.navigate("Calculator")}
        >
          <Text style={{ color: theme.colors.textPrimary, fontSize: 24 }}>
            Calculator
          </Text>
          <Calculator color={theme.colors.textPrimary} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            borderRadius: 16,
            backgroundColor: theme.colors.primary,
            height: 150,
            width: 150,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 8,
            paddingHorizontal: 16,
          }}
          onPress={() => navigation.navigate("TaskList")}
        >
          <Text style={{ color: theme.colors.textPrimary, fontSize: 24 }}>
            Activity
          </Text>
          <Activity color={theme.colors.textPrimary} />
        </TouchableOpacity>
      </View>
    </BaseLayout>
  );
}
