import React, { useState } from "react";
import { Text, TouchableOpacity, StyleSheet, View } from "react-native";
import {
  GestureHandlerRootView,
  Swipeable,
} from "react-native-gesture-handler";
import { useTheme } from "../theme/ThemeProvider";
type Props = {
  title: string;
  onDelete: () => void;
};

export const TaskItem = ({ title, onDelete }: Props) => {
  const { theme } = useTheme();
  const [isDone, setIsDone] = useState(false);
  const renderRightActions = () => {
    return (
      <TouchableOpacity
        style={{
          marginTop: 15,
          borderRadius: 25,
          backgroundColor: theme.colors.danger,
          justifyContent: "center",
          alignItems: "center",
          width: "40%",
          height: 50,
        }}
        onPress={onDelete}
      >
        <Text
          style={{
            color: theme.colors.background,
            fontSize: 24,
          }}
        >
          Delete
        </Text>
      </TouchableOpacity>
    );
  };
  const renderLeftActions = () => {
    return (
      <TouchableOpacity
        style={{
          marginTop: 15,
          borderRadius: 25,
          backgroundColor: theme.colors.primary,
          justifyContent: "center",
          alignItems: "center",
          width: "40%",
          height: 50,
        }}
        onPress={() => setIsDone(!isDone)}
      >
        <Text
          style={{
            color: theme.colors.background,
            fontSize: 24,
          }}
        >
          Done
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Swipeable
        renderRightActions={renderRightActions}
        renderLeftActions={renderLeftActions}
      >
        <View
          style={{
            borderColor: theme.colors.primary,
            borderWidth: 1,
            borderRadius: 25,
            paddingHorizontal: 12,
            backgroundColor: theme.colors.background,
            height: 50,
            marginTop: 15,
            paddingTop: 8,
          }}
        >
          <Text
            style={{
              fontSize: 32,
              textDecorationLine: isDone ? "line-through" : "none",
              color: theme.colors.textPrimary,
            }}
          >
            {title}
          </Text>
        </View>
      </Swipeable>
    </GestureHandlerRootView>
  );
};
