import { useAuth } from "@/providers/AuthProvider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as ImagePicker from 'expo-image-picker';
import { router } from "expo-router";
import { useState } from "react";

import { createPost } from "@/services/posts";
import { Entypo } from "@expo/vector-icons";
import {
    Image,
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
    const [image, setImage] = useState<string | null>(null);
    const { user } = useAuth();
 
    const queryClient = useQueryClient();

    const { mutate, isPending, error } = useMutation({
    mutationFn: () => createPost({content: text, user_id: user!.id}),
    onSuccess: (data) => {
        setText('');
        router.back();
        queryClient.invalidateQueries({ queryKey: ['posts']});
    },
    onError: (error) => {
        console.error(error);
        //Alert.alert('Error', error.message);
    },
});

const pickImage = async () => {
    let result  = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        quality: 1,
})
    console.log(result);
    if(!result.canceled) {
        setImage(result.assets[0].uri);
    }
}

 
  
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
            onChangeText={setText}
            placeholder="What is in your mind?"
            placeholderTextColor="gray"
            className="text-white text-lg"
            multiline
            numberOfLines={4}
            /> 
           {image && (
            <Image 
            source={{ uri: image}}
            className='w-1/2 aspect-square rounded-lg my-4'
            />
           )}


            {error && ( <Text className="text-red-500 text-sm mt-4">{error.message}</Text>)}
            <View className="flex-row items-center gap-2 mt-4">
                <Entypo onPress={pickImage} name="images" size={20} color='gray' />
            </View>

            <View className="mt-auto">
                <Pressable onPress={() => mutate()}
                className={`${isPending ? 'bg-white/50' : 'bg-white'} p-3 px-6 self-end rounded-full`}
                disabled={isPending}              
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