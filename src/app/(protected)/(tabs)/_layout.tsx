import { Ionicons } from "@expo/vector-icons";
import { router, Tabs } from "expo-router";
import { View } from "react-native-reanimated/lib/typescript/Animated";
export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#888", 
          borderTopColor: "#222",
        },
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "gray",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
          
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" size={size} color={color} />
          ),
        }}
      />

<Tabs.Screen
        name="plus"
        options={{
          title: "Plus",
          tabBarIcon: ({ color, size }) => (
            <View className='bg-neutral-700 rounded-xl w-36 p-1'>
                <Ionicons name="person-outline" size={size} color={color} />
            </View>
          
          ),
        }}
          listeners= {{
            tabPress: (e) =>{
            e.preventDefault();
            router.push('/new');
          },
        }}
      />


      <Tabs.Screen
        name="notification"
        options={{
          title: "Activity",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart-outline" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
  
    </Tabs>
  );
}