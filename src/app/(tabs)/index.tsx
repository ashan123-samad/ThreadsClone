import { FlatList, View } from "react-native";
import { posts } from "../../dummyData";
import PostListItem from "../../components/PostListItem";

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
      />
    </View>
  );
}