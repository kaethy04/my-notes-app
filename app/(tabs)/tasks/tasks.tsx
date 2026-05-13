import { deleteTask, getTasks, Task } from "@/lib/database";
import { router, useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  Alert,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

  const loadTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      Alert.alert("Load Error", "Failed to load tasks");
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadTasks();
    }, []),
  );

  const openDeleteModal = (task: Task) => {
    setTaskToDelete(task);
    setDeleteModalVisible(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalVisible(false);
    setTaskToDelete(null);
  };

  const handleDeleteConfirmed = async () => {
    if (!taskToDelete) {
      return;
    }

    try {
      await deleteTask(taskToDelete.id);
      closeDeleteModal();
      await loadTasks();
    } catch (error) {
      Alert.alert("Delete Error", "Failed to delete task");
    }
  };

  return (
    <View style={styles.container}>
      
      <Text style={styles.title}>Task List</Text>

      <Pressable
        style={styles.addButton}
        onPress={() => router.push("/(tabs)/tasks/add-task")}
      >
        <Text style={styles.addButtonText}>Add Task</Text>
      </Pressable>

      {tasks.length === 0 ? (
        <Text style={styles.emptyText}>No Tasks yet.</Text>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.taskTitle}>{item.title}</Text>
              <Text style={styles.taskDescription}>{item.description}</Text>
              <Text style={styles.taskStatus}>{item.status}</Text>

              <View style={styles.actions}>
                <Pressable
                  style={styles.detailButton}
                  onPress={() =>
                    router.push({
                      pathname: "/(tabs)/tasks/task-detail",
                      params: {
                        id: item.id,
                        title: item.title,
                        description: item.description,
                        status: item.status,
                      },
                    })
                  }
                >
                  <Text style={styles.detailButtonText}>View Details</Text>
                </Pressable>

                <Pressable
                  style={styles.deleteButton}
                  onPress={() => openDeleteModal(item)}
                >
                  <Text style={styles.deleteButtonText}>Delete</Text>
                </Pressable>
              </View>
            </View>
          )}
        />
      )}

      <Modal
        visible={deleteModalVisible}
        transparent
        animationType="fade"
        onRequestClose={closeDeleteModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Confirm Delete</Text>
            <Text style={styles.modalMessage}>
              Are you sure you want to delete this task?
            </Text>
            <View style={styles.modalButtons}>
              <Pressable style={styles.modalCancel} onPress={closeDeleteModal}>
                <Text style={styles.modalCancelText}>Cancel</Text>
              </Pressable>
              <Pressable
                style={styles.modalDelete}
                onPress={handleDeleteConfirmed}
              >
                <Text style={styles.modalDeleteText}>Delete</Text>
              </Pressable>
            </View>
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
  title: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 16,
    color: "#8B3A3A",
  },
  card: {
    backgroundColor: "#FFE4E9",
    borderWidth: 2,
    borderColor: "#E63946",
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 16,
    color: "#A91D3A",
    marginTop: 20,
    fontStyle: "italic",
  },
  addButton: {
    backgroundColor: "#A91D3A",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    alignSelf: "flex-start",
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
    color: "#8B3A3A",
  },
  taskDescription: {
    fontSize: 14,
    color: "#5a3a3a",
    marginBottom: 6,
  },
  taskStatus: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 12,
    color: "#A91D3A",
  },
  actions: {
    flexDirection: "row",
    gap: 10,
  },
  detailButton: {
    backgroundColor: "#A91D3A",
    padding: 10,
    borderRadius: 8,
  },
  detailButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  deleteButton: {
    backgroundColor: "#E63946",
    padding: 10,
    borderRadius: 8,
  },
  deleteButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  backButton: {
    alignSelf: "flex-start",
    marginBottom: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#A91D3A",
  },
  backButtonText: {
    color: "#A91D3A",
    fontWeight: "600",
    fontSize: 16,
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
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#E63946",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#8B3A3A",
    marginBottom: 12,
  },
  modalMessage: {
    fontSize: 16,
    color: "#5a3a3a",
    textAlign: "center",
    marginBottom: 24,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    gap: 12,
  },
  modalCancel: {
    flex: 1,
    backgroundColor: "#F4F1F1",
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#A91D3A",
  },
  modalCancelText: {
    color: "#A91D3A",
    fontWeight: "700",
    textAlign: "center",
  },
  modalDelete: {
    flex: 1,
    backgroundColor: "#A91D3A",
    paddingVertical: 12,
    borderRadius: 10,
  },
  modalDeleteText: {
    color: "#fff",
    fontWeight: "700",
    textAlign: "center",
  },
});

