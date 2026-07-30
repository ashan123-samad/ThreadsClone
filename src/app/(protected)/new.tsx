import { useState } from "react";
import {
View, 
Text,
TextInput,
Pressable,
KeyboardAvoidingView,
Platform
} 
from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
export default function NewPostScreen() {
    const [text, setText]  = useState('');
    return(
        <SafeAreaView edges={["bottom"]} className="p-4 flex-1" >
        <KeyboardAvoidingView 
        className="flex-1"
         behavior={Platform.OS === 'ios' ? 'padding': 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios'? 140 : 0}
         >
        

            <Text style={{
                color:"#ffffff",
                }} className="text-white text-lg font-bold">username</Text>
            <TextInput 
            value={text}
            style={{color:"#ffffff"}}
            onChangeText={setText}
            placeholder="What is in your mind?"
            placeholderTextColor="#888"
            className="text-white text-lg"
            multiline
            numberOfLines={4}
            />
            <View className="mt-auto">
                <Pressable onPress={() => console.log('post:')}
                style={{
                    backgroundColor: "#ffffff",
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    borderRadius: 999,
                    alignSelf: "flex-end",
                    marginTop: 20,

                }}
                className="bg-blue-600 p-3 px-6 self-end rounded-full"
                
                >
                    <Text className="text-white font-bold">
                        Post
                    </Text>
                </Pressable>
            </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}