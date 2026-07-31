import { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { router } from "expo-router";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Email:", email);
    console.log("Password:", password);
  };

  const handleCreateAccount = () => {
    router.push("/");
  };

  return (
    <View className="flex-1 bg-black justify-center px-6">
      <View className="w-full">

        <Text className="text-white text-3xl font-bold mb-2">
          Welcome Back
        </Text>

        <Text className="text-gray-400 text-base mb-8">
          Login to your account
        </Text>

        {/* Email */}
        <Text className="text-white text-sm font-semibold mb-2">
          Email
        </Text>

        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          placeholderTextColor="#888"
          keyboardType="email-address"
          autoCapitalize="none"
          className="bg-neutral-900 text-white border border-neutral-700 rounded-xl px-4 py-4 mb-5"
        />

        {/* Password */}
        <Text className="text-white text-sm font-semibold mb-2">
          Password
        </Text>

        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your password"
          placeholderTextColor="#888"
          secureTextEntry
          className="bg-neutral-900 text-white border border-neutral-700 rounded-xl px-4 py-4 mb-6"
        />

        {/* Login */}
        <Pressable
          onPress={handleLogin}
          className="bg-blue-600 rounded-xl py-4 items-center"
        >
          <Text className="text-white text-base font-bold">
            Login
          </Text>
        </Pressable>

        {/* Create account */}
        <View className="flex-row justify-center mt-6">
          <Text className="text-gray-400">
            Don't have an account?{" "}
          </Text>

          <Pressable onPress={handleCreateAccount}>
            <Text className="text-blue-500 font-semibold">
              Create one
            </Text>
          </Pressable>
        </View>

      </View>
    </View>
  );
}