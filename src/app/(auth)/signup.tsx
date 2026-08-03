import { Link } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const handleSignup = () => {
    if (password !== confirmPassword) {
      console.log("Passwords do not match");
      return;
    }
    // TODO: hook up your auth logic here
    console.log("Signing up with:", name, email, password);
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
            Create account
          </Text>
          <Text className="text-base text-gray-500 dark:text-gray-400 mt-2">
            Sign up to get started
          </Text>
        </View>

        {/* Name input */}
        <View className="mb-4">
          <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Full name
          </Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="John Doe"
            placeholderTextColor={isDark ? "#6B7280" : "#9CA3AF"}
            autoCapitalize="words"
            className="border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-3 text-base text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-900"
          />
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
        <View className="mb-4">
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

        {/* Confirm Password input */}
        <View className="mb-6">
          <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Confirm password
          </Text>
          <TextInput
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="••••••••"
            placeholderTextColor={isDark ? "#6B7280" : "#9CA3AF"}
            secureTextEntry
            className="border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-3 text-base text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-900"
          />
        </View>

        {/* Signup button */}
        <TouchableOpacity
          onPress={handleSignup}
          activeOpacity={0.8}
          className="bg-black dark:bg-white rounded-xl py-4 items-center"
        >
          <Text className="text-white dark:text-black text-base font-semibold">
            Sign Up
          </Text>
        </TouchableOpacity>

        {/* Login link */}
        <View className="flex-row justify-center mt-6">
          <Text className="text-gray-500 dark:text-gray-400 text-sm">
            Already have an account?{" "}
          </Text>
          <Link href="/login" asChild>
            <TouchableOpacity>
              <Text className="text-black dark:text-white text-sm font-semibold">
                Sign in
              </Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}