import PostListItem from "@/components/PostListItem";
import ProfileHeader from "@/components/ProfileHeader";
import { useAuth } from "@/providers/AuthProvider";
import { getPostsbyUserId } from "@/services/posts";
import { getProfileById } from "@/services/profile";
import { useQuery } from "@tanstack/react-query";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

export default function PofileScreen() {
  const {user} = useAuth();
  const {
    data: posts,
    isLoading,
    error} = useQuery({
    queryKey: ['posts', {user_id: user?.id}],
    queryFn: () => getPostsbyUserId(user!.id),
  });
 
  const {data: profile} = useQuery ({
    queryKey: ['profile', user?.id],
    queryFn: () => getProfileById(user!.id),
});

  if (isLoading) return <ActivityIndicator/>;
  if (error)  return <Text className="text-white">Error: {error.message}</Text>


  return (
  <View className="flex-1  justify-center">
    <FlatList 
     data= {posts}
      renderItem={({item}) => <PostListItem post={item}/>}
      ListHeaderComponent={() => (<>
      <ProfileHeader />
      <Text className="text-white text-lg  font-bold mt-4 mb-2">Threads</Text>
      </>
  )}
   
     
    
    
    />
  

      
  </View>
  )
}