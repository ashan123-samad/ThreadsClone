import { useAuth } from "@/providers/AuthProvider";
import { Redirect } from "expo-router";

export default function Index() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Redirect href="/(protected)/(tabs)" />;
  }

  return <Redirect href="/login" />;
}
