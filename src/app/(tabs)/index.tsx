import { FlatList, Pressable, Text, View } from "react-native";
import { Link } from "expo-router";
import { posts } from "../../dummyData";
import PostListItem from "../../components/PostListItem";

export default function HomeScreen() {
  return (
    
      <FlatList
      
  data={posts}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => <PostListItem post={item} />}
  ListHeaderComponent={() => (
  
     <Link href="/new" asChild>
    <Pressable
      style={{
        margin: 16,
        padding: 16,
        backgroundColor: "white",
        borderRadius: 10,
      }}
    >
      <Text
        style={{
          color: "black",
          fontSize: 18,
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        New Post
      </Text>
    </Pressable>
  </Link>
  )}
/>
    
  );
}