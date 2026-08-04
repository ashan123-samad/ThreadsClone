import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/AuthProvider";
import { useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
    Text,
    TextInput,
    View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function NewPostScreen() {
    const [text, setText]  = useState('');
    const { user } = useAuth();
    const onSubmit = async () => {
        if (!text || !user) return;

 const { data, error } = await supabase
 .from('posts')
.insert({ content: text, user_id: user.id });

if (error) {
    console.error(error);
}
setText('');
  };
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
                <Pressable onPress={onSubmit}
                className="bg-white p-3 px-6 self-end rounded-full"
                
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