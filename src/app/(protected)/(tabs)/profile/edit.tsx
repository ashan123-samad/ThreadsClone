import UserAvatarPicker from "@/components/UserAvatarPicker";
import { useAuth } from "@/providers/AuthProvider";
import { getProfileById, updateProfile } from "@/services/profile";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";


export default function ProfileEditScreen() {
    const [fullname, setFullName] = useState('');
    const [bio, setBio] = useState('');
    const [avatar_url, setAvatarUrl] = useState('');


    const  {user} = useAuth();
    const queryClient = useQueryClient();

    const {data: profile, isLoading , error}  = useQuery({
        queryKey: ['profile', user?.id],
        queryFn: () => getProfileById(user!.id),
      
    });

    const {mutate, isPending} = useMutation({
        mutationFn: () => 
        updateProfile(user!.id,
         { id:user!.id,username:fullname,full_name:fullname,
          bio:bio,
         avatar_url
    }),
        onSuccess: () => {
            router.back();
            queryClient.invalidateQueries({ queryKey: ['profile', user?.id] });
        },
    })


    useEffect(() => {
        setFullName(profile?.full_name ?? "");
        setBio(profile?.bio ?? "")
        setAvatarUrl(profile?.avatar_url ?? "")
        }, [profile?.id]);

    return (
    <View className="flex-1 p-4 gap-4">
        <UserAvatarPicker
         currentAvatar={profile?.avatar_url ?? ""}
          onUpload={setAvatarUrl } />
    

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