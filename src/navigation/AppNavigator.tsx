import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TaskListScreen from "../screens/TaskListScreen";
import TaskDetailsScreen from "../screens/TaskDetailsScreen";
import { Button, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import EditTaskModal from "../screens/EditTaskModal";

export type RootStackParamList = {
  TaskList: undefined;
  TaskDetails: { taskId: string };
  EditTask: { taskId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTintColor: "black",
        }}
      >
        <Stack.Screen
          name="TaskList"
          component={TaskListScreen}
          options={{ title: "Tasks" }}
        />
        <Stack.Screen
          name="TaskDetails"
          component={TaskDetailsScreen}
          options={({ navigation, route }) => ({
            title: "Task Details",
            headerRight: () => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("EditTask", {
                    taskId: route.params.taskId,
                  })
                }
                style={{ marginRight: 15 }}
              >
                <Feather name="edit" size={24} color="" />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="EditTask"
          component={EditTaskModal}
          options={{
            title: "Edit Task",
            //   presentation: "modal", // <-- модальный экран
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
