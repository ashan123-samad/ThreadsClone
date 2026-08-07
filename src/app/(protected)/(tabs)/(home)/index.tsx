import PostListItem from "@/components/PostListItem";
import { fetchPosts } from "@/services/posts";
import { useQuery } from '@tanstack/react-query';
import { ActivityIndicator, FlatList, Text } from "react-native";


 
  


export default function HomeScreen() {
  const {data, isLoading, error} = useQuery({
    queryKey: ['posts'],  
    queryFn: fetchPosts,
  });
 console.log(data)
if(isLoading){
return <ActivityIndicator />;
} 
if(error) { 
  return <Text className="text-red-500">{error.message}</Text>
}

  return (
    <FlatList
    data={data ?? []}
    keyExtractor={(item) => item.id}
    renderItem={({ item }) => (
       <PostListItem post={item} 
       isLastInGroup
       />
  )}
  
    />
  );
}