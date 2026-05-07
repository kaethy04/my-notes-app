import { deleteTask, getTasks, Task } from "@/lib/database";
import { router, useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const loadTasks = () => {
    try {
      const data = getTasks();
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

  const handleDelete = (id: number) => {
    try {
      deleteTask(id);
      loadTasks();
    } catch (error) {
      Alert.alert("Delete Error", "Failed to delete task");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Task List</Text>

      <Pressable
        style={styles.addButton}
        onPress={() => router.push("/add-task")}
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
                      pathname: "/task-detail",
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
                  onPress={() => handleDelete(item.id)}
                >
                  <Text style={styles.deleteButtonText}>Delete</Text>
                </Pressable>
              </View>
            </View>
          )}
        />
      )}
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
});

