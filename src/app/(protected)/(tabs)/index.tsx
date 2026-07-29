import { FlatList, View } from "react-native";
import { posts } from "../../../dummyData";
import PostListItem from "../../../components/PostListItem";
import { Link } from "expo-router";

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: '#1a1a1a' }}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PostListItem post={item} />
        )}
        scrollEnabled={true}
        nestedScrollEnabled={true}
        ListHeaderComponent={() =>(
          <Link href="/new" className="text-blue-500 p-4 text-center text-3xl">
            New Post
          </Link>
        )}
      />
    </View>
  );
}