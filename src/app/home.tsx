import { ThemedView } from "@/components/themed-view";
import { supabase } from "@/lib/supabase";
import { router } from "expo-router";
import { useEffect } from "react";
import { Text, TouchableOpacity } from "react-native";
import { View } from "react-native-reanimated/lib/typescript/Animated";

export default function HomeScreen() {
  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();

      if (!data.session) {
        router.replace("/login");
      }
    };

    checkAuth();
  }, []);

  return (
    <ThemedView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
     <View
     
     >
        
     </View>

    </ThemedView>
  );
}