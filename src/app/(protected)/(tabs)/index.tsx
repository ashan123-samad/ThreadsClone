import PostListItem from "@/components/PostListItem";
import { supabase } from "@/lib/supabase";
import { Post } from "@/types";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList } from "react-native";
export default function HomeScreen() {
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
      .from('posts')
      .select('*, user:Profiles(*)');
      if (error) {
        console.error(error);
      }
      setPosts(data as Post[]);
    };
    fetchPosts();
  }, []) 
console.log(JSON.stringify(posts, null, 2));

  return (
    <FlatList
    data={posts}
    renderItem={({ item }) => <PostListItem post={item} />}
    ListHeaderComponent={() => (
      <>
      <Link href="/new" className="text-blue-500 p-4 text-center text-3xl">
      New Post
      </Link>
      </>
    )}
    />
  );
}