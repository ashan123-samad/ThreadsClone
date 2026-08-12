import { useAuth } from "@/providers/AuthProvider";
import { getProfileById } from "@/services/profile";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";


export default function ProfileEditScreen() {
    const [fullname, setFullName] = useState('');
    const [bio, setBio] = useState('');

    const  {user} = useAuth();
    const queryClient = useQueryClient();

    const {data: profile, isLoading , error}  = useQuery({
        queryKey: ['profile', user?.id],
        queryFn: () => getProfileById(user!.id),
      
    });

    const {mutate, isPending} = useMutation({
        mutationFn: () => updateProfile(user!.id, { full_name: fullname, bio}),
        onSuccess: () => {
            router.back();
            queryClient.invalidateQueries({ queryKey: {'profile', user?.id} });
        },
    })


    useEffect(() => {
        setFullName(profile?.full_name);
        setBio(profile?.bio)
        }, [profile?.id]);

    return (
    <View className="flex-1 p-4 gap-4">
    

        <TextInput
        value={fullname}
        onChangeText={setFullName}
         placeholder="Full Name"
         className="text-white  border-2 border-neutral border-gray-800 rounded-md p-4"
        />
        
        <TextInput
        value={bio}
        onChangeText={setBio}
         placeholder="Bio"
         className="text-white border-2 border-neutral border-gray-800 rounded-md p-4"
         multiline
         numberOfLines={5}
        />

        
         <View className="mt-auto">
          <Pressable 
          onPress={() => mutate()}
           className={`${
            isPending ? 'bg-white/50' : 'bg-white'
        } p-4  items-center rounded-full`}
            disabled={isPending}              
         >
        <Text className='text-black font-bold'>Save </Text>
        </Pressable>
         </View>
        
      
    </View>
    )
}