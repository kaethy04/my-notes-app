import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#A91D3A",
        headerStyle: { 
            backgroundColor:"#A91D3A", 
            
        },
        headerTintColor: "#fff",
        tabBarStyle: {
            paddingBottom: 5,
            height: 60,
        }
      }}
    >
      <Tabs.Screen 
      name="index"
      options={{
        title: "Home",
        tabBarIcon: ({ color, size, focused}) => (
          <Ionicons name={focused ? "home" : "home-outline"} size={size} color={color} />
        )
      }}/>
      <Tabs.Screen 
      name="tasks" 
      options={{
        title: "Tasks",
        headerShown: false,
        tabBarIcon: ({ color, size, focused }) => (
          <Ionicons name={focused ? "list" : "list-outline"} size={size} color={color} />
        )
      }}/>
    </Tabs>
  );
}
