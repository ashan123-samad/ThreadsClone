import { useAuth } from "@/providers/AuthProvider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as ImagePicker from 'expo-image-picker';
import { router } from "expo-router";
import { useState } from "react";

import { supabase } from "@/lib/supabase";
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
    const [image, setImage] = useState<ImagePicker.ImagePickerAsset | null>(null);
    const { user } = useAuth();
 
    const queryClient = useQueryClient();

    const { mutate, isPending, error } = useMutation({
    mutationFn: async() => {
        let imagePath = null;
        if (image) {
         imagePath= await uploadImage();
        }
     return createPost({
        content: text,
        user_id: user!.id,
         images: [imagePath],
        
         });
    },
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
        setImage(result.assets[0]);
    }
}

const uploadImage = async () => {
    if (!image) return;
    const arraybuffer = await fetch(image.uri).then((res) => res.arrayBuffer());
    const fileExit = image.uri?.split('.').pop()?.toLowerCase() ?? 'jpeg';
    const filePath = `${Date.now()}.${fileExit}`;
    const {data, error: uploadError } = await supabase.storage
    .from ('media')
    .upload(filePath, arraybuffer, {
        contentType: image.mimeType ?? 'image/jpeg',
    });
   if(uploadError){
    throw uploadError;
   }
   return data.path;

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
            onChangeText={setText}
            placeholder="What is in your mind?"
            placeholderTextColor="gray"
            className="text-white text-lg"
            multiline
            numberOfLines={4}
            /> 
           {image && (
            <Image 
            source={{ uri: image.uri}}
            className='w-1/2  rounded-lg my-4'
            style={{aspectRatio: image.width / image.height}}
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