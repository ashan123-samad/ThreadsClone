import { useAuth } from "@/providers/AuthProvider";
import { createPost } from "@/services/posts";
import { AntDesign } from "@expo/vector-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from 'react';
import { TextInput, View } from "react-native";



export default function PostReplyInput ({postID}: { postID: string}){
    const [text, setText] = useState('');


    const { user } = useAuth();
 
    const queryClient = useQueryClient();

    const { mutate, isPending, error } = useMutation({
    mutationFn: () => 
        createPost({content: text,user_id: user!.id, parent_id: postID}),
    onSuccess: (data) => {
        setText('');
        //queryClient.invalidateQueries({ queryKey: ['posts',postID, 'replies']});
        queryClient.invalidateQueries({ queryKey: ['posts']});
    },
    onError: (error) => {
        console.error(error);
        //Alert.alert('Error', error.message);
    },
});

    return (
        <View className="p-4">
            <View className="flex-row items-center gap-2 bg-neutral-800 shadow-md p-4 rounded-xl">
            <TextInput 
            value={text}
            onChangeText={setText}
             placeholder="Add to thread..."
             className="flex-1 text-white "
             multiline
             />
             
            <AntDesign 
            onPress={() => mutate()} 
            disabled= {isPending || text.length === 0}
            name='plus'
             size={24}
            color={text.length === 0 ? "gray" : 'gainsboro'}
             />
            
            </View>
           
        </View>
    );
}