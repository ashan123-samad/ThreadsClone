import PostListItem from "@/components/PostListItem";
import PostReplyInput from "@/components/PostReplyInput";
import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

const getPostById = async (id: string) =>{
    console.log('Fetching post by id:', id);
    const {data, error} = await supabase
    .from('posts')
    .select('*, user:profiles(*)')
    .eq('id', id)
    .single()
    .throwOnError();
    return data;
};

export default function PostDetails() {
    const { id } = useLocalSearchParams<{id: string}>();
    const {data, isLoading, error} = useQuery ({
        queryKey: ['post', id],
        queryFn: () => getPostById(id),
        staleTime: 1000 * 68 * 5,
    });


    if(isLoading) {
        return<ActivityIndicator />;
    }

    if(error) {
        return <Text className="text-white">{error.message}</Text>
    }

    if (!data) {
        return <Text className="text-white">Post not found</Text>;
    }

    return (
        <View className="flex-1">
            <FlatList
            data={[]}
            renderItem={({ item }) => <PostListItem post={item} />}
            ListHeaderComponent={<PostListItem post={data} />}
               />

            <PostReplyInput postID={id} />
        </View>
    )
}