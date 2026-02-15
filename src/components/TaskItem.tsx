import React from "react";
import { Text, TouchableOpacity, StyleSheet, View } from "react-native";
import {
  GestureHandlerRootView,
  Swipeable,
} from "react-native-gesture-handler";
type Props = {
  title: string;
  description: string;
  syncStatus: "synced" | "pending" | "error";
  onDelete: () => void;
  onPress: () => void;
};

export const TaskItem = ({
  title,
  description,
  syncStatus,
  onDelete,
  onPress,
}: Props) => {
  const renderRightActions = () => {
    return (
      <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    );
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Swipeable renderRightActions={renderRightActions}>
        <View style={styles.taskContainer}>
          <Text style={{ fontSize: 50 }}>{title}</Text>
          <Text style={{ fontSize: 15 }}>{description}</Text>
          <Text style={{ fontSize: 12 }}>sync: {syncStatus}</Text>
        </View>
      </Swipeable>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    borderRadius: 20,
    padding: 15,
    paddingLeft: 20,
    backgroundColor: "#d4edda",
    height: 100,
    marginTop: 15,
  },
  deleteButton: {
    marginTop: 15,
    borderRadius: 20,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: 100,
  },
  deleteText: {
    color: "white",
    fontWeight: "bold",
  },
});
