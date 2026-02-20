import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Button } from "react-native";
import { useTaskStore } from "../store/useTaskStore";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { TaskItem } from "../components/TaskItem";
import { TextInput } from "react-native-gesture-handler";
import BaseLayout from "../components/BaseLayout";
import { useTheme } from "../theme/ThemeProvider";
import { Pencil } from "lucide-react-native";

type Props = NativeStackScreenProps<RootStackParamList, "TaskList">;

export default function TaskListScreen({ navigation }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { tasks, addTask, toggleTask, removeTask } = useTaskStore();
  const { theme } = useTheme();

  return (
    <BaseLayout>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          gap: 16,
        }}
      >
        <TextInput
          placeholder="New task..."
          value={title}
          onChangeText={setTitle}
          style={{
            color: theme.colors.textPrimary,
            height: 50,
            paddingHorizontal: 12,
            width: "80%",
            borderWidth: 1,
            borderRadius: 25,
            marginBottom: 16,
            borderColor: theme.colors.primary,
            fontSize: 32,
            marginTop: 16,
          }}
          placeholderTextColor={theme.colors.textSecondary}
        />
        <TouchableOpacity
          style={{
            borderRadius: 16,
            backgroundColor: theme.colors.primary,
            height: 50,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 8,
            paddingHorizontal: 12,
          }}
          onPress={() => {
            if (!title.trim()) return;
            addTask(title, description);
            setTitle("");
            setDescription("");
          }}
        >
          <Pencil color={theme.colors.textPrimary} />
        </TouchableOpacity>
      </View>

      <FlatList
        style={{ width: "95%" }}
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskItem title={item.title} onDelete={() => removeTask(item.id)} />
        )}
      />
    </BaseLayout>
  );
}
