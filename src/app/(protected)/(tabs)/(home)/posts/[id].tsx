import PostDetails from "@/components/PostDetails";
import PostListItem from "@/components/PostListItem";
import PostReplyInput from "@/components/PostReplyInput";
import { getPostsReplies } from "@/services/posts";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

export default function PostDetailsScreen() {
    const { id } = useLocalSearchParams<{id: string}>();
    
    const {data: post, isLoading, error} = useQuery ({
        queryKey: ['posts', id],
        queryFn: () => getPostById(id),
        staleTime: 1000 * 68 * 5,
    });

    const {data: replies } = useQuery ({
        queryKey: ['posts', id , 'replies'],
        queryFn: () => getPostsReplies(id),
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
            data={replies || []}
            renderItem={({ item }) => <PostListItem post={item} />}
            ListHeaderComponent={
            <>
            <PostDetails post={post} />
            <Text className="text-white text-lg font-bold p-4 border-b border-neutral-800">
                Replies
                </Text>
            </>
            }
               />

            <PostReplyInput postID={id} />
        </View>
    )
}