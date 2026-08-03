import PostListItem from "@/components/PostListItem";
import { posts } from "@/dummyData";
import { Link } from "expo-router";
import { FlatList } from "react-native";

export default function HomeScreen() {
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