import { TabBarIcon, type TabIconName } from "@/components/TabBarIcon";
import { Tabs } from "expo-router";
import { Platform } from "react-native";

const icon =
  (name: TabIconName) =>
  ({ color }: { color: string; size: number }) =>
    <TabBarIcon name={name} color={color} />;

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#ffffff",
        tabBarInactiveTintColor: "#999999",
        tabBarStyle: {
          backgroundColor: "#252525",
          borderTopColor: "#444444",
          borderTopWidth: 1,
          height: Platform.OS === "android" ? 72 : 65,
          paddingBottom: Platform.OS === "android" ? 10 : 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          marginTop: 2,
        },
        tabBarIconStyle: {
          marginTop: 2,
        },
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: icon("home"),
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: icon("search"),
        }}
      />

      <Tabs.Screen
        name="plus"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="add" color={color} size={30} />
          ),
        }}
      />

      <Tabs.Screen
        name="notification"
        options={{
          title: "Activity",
          tabBarIcon: icon("activity"),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: icon("profile"),
        }}
      />
    </Tabs>
  );
}
