import { FlatList, Pressable, Text, View } from "react-native";
import { SafeAreaView  } from "react-native-safe-area-context";
import { posts } from "../../../dummyData";
import PostListItem from "../../../components/PostListItem";
import { Link } from "expo-router";

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: "#000" }}>
  <FlatList
    data={posts}
    keyExtractor={(item) => item.id}
    renderItem={({ item }) => <PostListItem post={item} />}
    ListHeaderComponent={() => (
         <><Link href="/new" asChild>
        <Pressable
          style={{
            backgroundColor: "black",
            padding: 10,
            margin: 10,
          }}
        >
          <Text style={{ color: "white", textAlign: "center" }}>
            New Post
          </Text>
        </Pressable>
      </Link>
      <Link   style={{
            backgroundColor: "black",
            padding: 10,
            margin: 10,
          }} href="/login">
 <Text style={{ color: "white", textAlign: "center" }}>
            login
          </Text>
     </Link></>


    
      
    )}
  />
</View>
  );
}