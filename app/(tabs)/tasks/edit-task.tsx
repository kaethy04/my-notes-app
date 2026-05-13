import { updateTask } from "@/lib/database";
import { useState } from "react";

import { router, useLocalSearchParams } from "expo-router";
import {
  Alert,
  Modal,
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
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleUpdate = async () => {
    try {
      if (!title.trim()) {
        throw new Error("Task title is required");
      }

      await updateTask(Number(params.id), title, description, status);
      setSuccessMessage("Task updated successfully.");
      setSuccessModalVisible(true);
    } catch (error) {
      Alert.alert(
        "Update Error",
        error instanceof Error ? error.message : "Something went wrong",
      );
    }
  };

  const closeSuccessModal = () => {
    setSuccessModalVisible(false);
    router.replace("/(tabs)/tasks/tasks");
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

      <Modal
        visible={successModalVisible}
        transparent
        animationType="fade"
        onRequestClose={closeSuccessModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Updated</Text>
            <Text style={styles.modalMessage}>{successMessage}</Text>
            <Pressable style={styles.modalButton} onPress={closeSuccessModal}>
              <Text style={styles.modalButtonText}>OK</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.35)",
    padding: 24,
  },
  modalContent: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    borderWidth: 2,
    borderColor: "#E63946",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#8B3A3A",
    marginBottom: 12,
  },
  modalMessage: {
    fontSize: 16,
    color: "#5a3a3a",
    textAlign: "center",
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: "#A91D3A",
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 10,
  },
  modalButtonText: {
    color: "#fff",
    fontWeight: "700",
  },
});
