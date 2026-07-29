import { FlatList, SafeAreaView, Text } from "react-native";
import { Link } from "expo-router";
import { posts } from "../../dummyData";
import PostListItem from "../../components/PostListItem";

export default function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#1a1a1a' }}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PostListItem post={item} />
        )}
        scrollEnabled={true}
        nestedScrollEnabled={true}
        ListHeaderComponent={() => (
          <Link
            href="/new"
            style={{ padding: 16, backgroundColor: '#111827', marginHorizontal: 16, marginBottom: 12, borderRadius: 14 }}
          >
            <Text style={{ color: '#fff', fontWeight: '700', textAlign: 'center', fontSize: 16 }}>
              New Post
            </Text>
          </Link>
        )}
      />
    </SafeAreaView>
  );
}