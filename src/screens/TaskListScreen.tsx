import React, { useState } from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import { useTaskStore } from "../store/useTaskStore";
import { TaskItem } from "../components/TaskItem";
import { TextInput } from "react-native-gesture-handler";
import BaseLayout from "../components/BaseLayout";
import { useTheme } from "../theme/ThemeProvider";
import { Pencil } from "lucide-react-native";

export default function TaskListScreen() {
  const [title, setTitle] = useState("");
  const { tasks, addTask, removeTask } = useTaskStore();
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
            borderRadius: 16,
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
            addTask(title);
            setTitle("");
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
