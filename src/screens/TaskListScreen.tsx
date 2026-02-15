import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Button } from "react-native";
import { useTaskStore } from "../store/useTaskStore";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { TaskItem } from "../components/TaskItem";
import { TextInput } from "react-native-gesture-handler";

type Props = NativeStackScreenProps<RootStackParamList, "TaskList">;

export default function TaskListScreen({ navigation }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { tasks, addTask, toggleTask, removeTask } = useTaskStore();
  return (
    <View
      style={{
        margin: 0,
        padding: 20,
        backgroundColor: "white",
        height: "100%",
      }}
    >
      <Text style={{ fontSize: 24, marginBottom: 20 }}>FieldLog</Text>

      <TextInput
        placeholder="New task..."
        value={title}
        onChangeText={setTitle}
        style={{
          borderWidth: 1,
          padding: 10,
          marginBottom: 10,
        }}
      />
      <TextInput
        placeholder="Description..."
        value={description}
        onChangeText={setDescription}
        style={{
          borderWidth: 1,
          padding: 10,
          marginBottom: 10,
        }}
      />

      <Button
        title="Add"
        onPress={() => {
          if (!title.trim()) return;
          addTask(title, description);
          setTitle("");
          setDescription("");
        }}
      />

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("TaskDetails", {
                taskId: item.id,
              })
            }
          >
            <TaskItem
              title={item.title}
              description={item.description}
              syncStatus={item.syncStatus}
              onPress={() => toggleTask(item.id)}
              onDelete={() => removeTask(item.id)}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
