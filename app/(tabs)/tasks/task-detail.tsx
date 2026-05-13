import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function TaskDetailScreen() {
  const { id, title, description, status } = useLocalSearchParams<{
    id: string;
    title: string;
    description: string;
    status: string;
  }>();

  const statusColor =
    status === "Finished"
      ? "#A91D3A"
      : status === "Ongoing"
      ? "#E63946"
      : "#8B3A3A";

  return (
    <View style={styles.page}>
      <View style={styles.card}>
        <Text style={styles.heading}>Task Detail</Text>
        <View style={styles.row}>
          <Text style={styles.sectionLabel}>Task ID</Text>
          <Text style={styles.sectionValue}>{id}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.sectionLabel}>Title</Text>
          <Text style={styles.sectionValue}>{title}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.sectionLabel}>Description</Text>
          <Text style={styles.sectionValue}>{description}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: statusColor }]}> 
          <Text style={styles.statusText}>{status}</Text>
        </View>
      </View>

      <Pressable
        style={styles.editButton}
        onPress={() =>
          router.push({
            pathname: "/(tabs)/tasks/edit-task",
            params: { id, title, description, status },
          })
        }
      >
        <Text style={styles.editButtonText}>Edit Task</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#FFF5F7",
    padding: 20,
  },
  card: {
    backgroundColor: "#none",
    borderRadius: 24,
    padding: 23,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 5,
    borderWidth: 1,
    borderColor: "#E63946",
  },
  heading: {
    fontSize: 28,
    fontWeight: "800",
    color: "#A91D3A",
    marginBottom: 20,
  },
  row: {
    marginBottom: 18,
  },
  sectionLabel: {
    fontSize: 14,
    color: "#8B3A3A",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 6,
  },
  sectionValue: {
    fontSize: 18,
    color: "#5a3a3a",
    lineHeight: 26,
  },
  statusBadge: {
    alignSelf: "flex-start",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 999,
    marginTop: 4,
    marginBottom: 28,
  },
  statusText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },
  editButton: {
    backgroundColor: "#A91D3A",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 20,
  },
  editButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});
