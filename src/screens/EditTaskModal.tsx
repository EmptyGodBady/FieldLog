import React, { useState } from "react";
import { View, TextInput, Button } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { useTaskStore } from "../store/useTaskStore";

type Props = NativeStackScreenProps<RootStackParamList, "EditTask">;

export default function EditTaskModal({ route, navigation }: Props) {
  const { taskId } = route.params;
  const { tasks, toggleTask, addTask, removeTask } = useTaskStore();
  const task = tasks.find((t) => t.id === taskId);

  const [title, setTitle] = useState(task?.title ?? "");
  const [description, setDescription] = useState(task?.description ?? "");

  if (!task) return null;

  const handleSave = () => {
    removeTask(taskId);
    addTask(title, description);
    navigation.goBack();
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Task title"
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 10,
          marginBottom: 20,
        }}
      />
      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder="Task description"
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 10,
          marginBottom: 20,
        }}
      />
      <Button title="Save" onPress={handleSave} />
    </View>
  );
}
