import { Stack } from "expo-router";

export default function TasksLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: { 
            backgroundColor:"#A91D3A", 
            
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
            fontWeight:"bold",
        }
      }}
    >
      <Stack.Screen
        name="tasks"
        options={{
          title: "Task List",
        }}
      />
      <Stack.Screen
        name="add-task"
        options={{
          title: "Add Task",
        }}
      />
      <Stack.Screen
        name="edit-task"
        options={{
          title: "Edit Task",
        }}
      />
      <Stack.Screen
        name="task-detail"
        options={{
          title: "Task Detail",
        }}
      />
    </Stack>
  );
}
