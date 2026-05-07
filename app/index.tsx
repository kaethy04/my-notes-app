import { initDatabase } from "@/lib/database";
import { router } from "expo-router";
import { useEffect } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";

export default function Index() {
  useEffect(() => {
    try {
      initDatabase();
    } catch (error) {
      Alert.alert("Database Error", "Failed to initialize database");
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Notes</Text>
      <Text style={styles.subtitle}>Welcome user</Text>

      <Pressable style={styles.button} onPress={() => router.push("/tasks")}>
        <Text style={styles.buttonText}>Open Tasks</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#FFF5F7",
  },
  title: {
    fontSize: 34,
    fontWeight: "700",
    marginBottom: 12,
    color: "#8B3A3A",
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#A91D3A",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});