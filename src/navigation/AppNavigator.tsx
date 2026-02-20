import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TaskListScreen from "../screens/TaskListScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import WelcomeScreen from "../screens/WelcomeScreen";
import MainScreen from "../screens/MainScreen";
import { useTheme } from "../theme/ThemeProvider";

export type RootStackParamList = {
  TaskList: undefined;
  TaskDetails: { taskId: string };
  EditTask: { taskId: string };
  Froggie: undefined;
  TheLake: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const [userName, setUserName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { theme } = useTheme();
  //reset name
  // await AsyncStorage.removeItem("userName");
  // setUserName(null);
  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedName = await AsyncStorage.getItem("userName");
        if (storedName) {
          setUserName(storedName);
        }
      } catch (error) {
        console.warn("Error loading user:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);
  if (isLoading) return null;
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTintColor: theme.colors.textPrimary,
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
        }}
      >
        {userName == null ? (
          <Stack.Screen name="Froggie">
            {(props) => <WelcomeScreen {...props} setUserName={setUserName} />}
          </Stack.Screen>
        ) : (
          <Stack.Screen name="TheLake" component={MainScreen} />
        )}

        <Stack.Screen
          name="TaskList"
          component={TaskListScreen}
          options={{ title: "Tasks" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
