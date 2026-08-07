import PostDetails from "@/components/PostDetails";
import PostListItem from "@/components/PostListItem";
import PostReplyInput from "@/components/PostReplyInput";
import { getPostbyId, getPostsReplies } from "@/services/posts";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

export default function PostDetailsScreen() {
    const { id } = useLocalSearchParams<{id: string}>();
    
    const {data: post, isLoading, error} = useQuery ({
        queryKey: ['posts', id],
        queryFn: () => getPostbyId(id),
        staleTime: 1000 * 68 * 5,
    });

    const {} = useQuery({
        queryKey:['posts' ,post?.parent_id],
        queryFn: () => getPostbyId(post?.parent_id || ''),
        enabled: !!post?.parent_id,
    })

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

    if (!post) {
        return <Text className="text-white">Post not found</Text>;
    }

    return (
        <View className="flex-1">
            <FlatList
            data={replies || []}
            renderItem={({ item} ) =>( 
            <PostListItem
             post={item} 
             isLastInGroup={true}
              />
    )}
            
            ListHeaderComponent={
            <>
            {parent && <PostListItem post={parent} isLastInGroup={false} />}
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