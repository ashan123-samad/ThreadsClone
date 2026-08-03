import { supabase } from "@/lib/supabase";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter your email and password.");
      return;
    }

    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signInWithPassword({ 
        email,
        password,
      });
      if (error) Alert.alert(error.message);
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className="flex-1 bg-white dark:bg-black"
    >
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      <View className="flex-1 justify-center px-6">
        {/* Header */}
        <View className="mb-10">
          <Text className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome back
          </Text>
          <Text className="text-base text-gray-500 dark:text-gray-400 mt-2">
            Sign in to continue
          </Text>
        </View>

        {/* Email input */}
        <View className="mb-4">
          <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Email
          </Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="you@example.com"
            placeholderTextColor={isDark ? "#6B7280" : "#9CA3AF"}
            autoCapitalize="none"
            keyboardType="email-address"
            className="border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-3 text-base text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-900"
          />
        </View>

        {/* Password input */}
        <View className="mb-6">
          <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Password
          </Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="••••••••"
            placeholderTextColor={isDark ? "#6B7280" : "#9CA3AF"}
            secureTextEntry
            className="border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-3 text-base text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-900"
          />
        </View>

        {/* Login button */}
        <TouchableOpacity
          onPress={handleLogin}
          activeOpacity={0.8}
          disabled={isLoading}
          className="bg-black dark:bg-white rounded-xl py-4 items-center"
        >
          <Text className="text-white dark:text-black text-base font-semibold">
            {isLoading ? "Signing in..." : "Log In"}
          </Text>
        </TouchableOpacity>

        {/* Sign up link */}
        <View className="flex-row justify-center mt-6">
          <Text className="text-gray-500 dark:text-gray-400 text-sm">
            Don't have an account?{" "}
          </Text>
          <Link href="/signup" asChild>
            <TouchableOpacity>
              <Text className="text-black dark:text-white text-sm font-semibold">
                Create one
              </Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}