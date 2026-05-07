import { updateTask } from "@/lib/database";
import { useState } from "react";

import { router, useLocalSearchParams } from "expo-router";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const statusOptions = ["Pending", "Ongoing", "Finished"];

export default function EditTaskScreen() {
  const params = useLocalSearchParams<{
    id: string;
    title: string;
    description: string;
    status: string;
  }>();

  const [title, setTitle] = useState(params.title || "");
  const [description, setDescription] = useState(params.description || "");
  const [status, setStatus] = useState(params.status || "Pending");

  const handleUpdate = () => {
    try {
      if (!title.trim()) {
        throw new Error("Task title is required");
      }

      updateTask(Number(params.id), title, description, status);
      Alert.alert("Success", `Task updated successfully.`);
      router.replace("/tasks");
    } catch (error) {
      Alert.alert(
        "Update Error",
        error instanceof Error ? error.message : "Something went wrong",
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Task</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter task title"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Enter task description"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <Text style={styles.label}>Select Status</Text>
      <View style={styles.statusContainer}>
        {statusOptions.map((option) => (
          <Pressable
            key={option}
            style={[
              styles.statusButton,
              status === option && styles.statusButtonActive,
            ]}
            onPress={() => setStatus(option)}
          >
            <Text
              style={[
                styles.statusButtonText,
                status === option && styles.statusButtonTextActive,
              ]}
            >
              {option}
            </Text>
          </Pressable>
        ))}
      </View>

      <Pressable style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Update Task</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFF5F7",
  },
  input: {
    borderWidth: 1,
    borderColor: "#E63946",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },
  statusContainer: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
    flexWrap: "wrap",
  },
  statusButton: {
    borderWidth: 1,
    borderColor:"#E63946",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: "#fff",
  },
  statusButtonActive: {
    backgroundColor: "#A91D3A",
    borderColor: "#A91D3A",
  },
  statusButtonText: {
    color: "#A91D3A",
    fontWeight: "600",
  },
  statusButtonTextActive: {
    color: "#fff",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#A91D3A",
    padding: 14,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
  },
});
