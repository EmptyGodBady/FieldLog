import React from "react";
import { View, Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { useTaskStore } from "../store/useTaskStore";

type Props = NativeStackScreenProps<RootStackParamList, "TaskDetails">;

export default function TaskDetailsScreen({ route }: Props) {
  const { taskId } = route.params;
  const { tasks } = useTaskStore();
  const task = tasks.find((t) => t.id === taskId);

  if (!task) {
    return <Text>Task not found</Text>;
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24 }}>Title: {task.title}</Text>
      <Text style={{ fontSize: 24 }}>Description: {task.description}</Text>
    </View>
  );
}
