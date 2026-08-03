import { supabase } from "@/lib/supabase";
import { Text, View } from "react-native";

export default function PrpfileScreen() {
  return (
  <View className="flex-1 items-center justify-center">
    <Text onPress={() => supabase.auth.signOut()} className="text-white text-2xl font-bold"> Sign out</Text>
  </View>
  )
}