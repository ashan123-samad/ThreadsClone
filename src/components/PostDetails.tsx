import { supabase } from "@/lib/supabase";
import { Tables } from "@/types/database.types";
import { Feather } from "@expo/vector-icons";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Link } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";
import SupabaseImage from "./SupabaseImage";

dayjs.extend(relativeTime);

type PostWithUser= Tables<"posts"> & {
  user: Tables<"profiles">;
  replies?: {
    count: number;
  }[];
};

function formatDate(value: string) {
  return dayjs(value).fromNow();
}

export default function PostDetails({
  post,
}: {
  post: PostWithUser;
}) {
  return (
    <Link href={`/posts/${post.id}`} asChild>
      <Pressable
        style={{
          borderBottomWidth: 1,
          borderBottomColor: "#333",
          backgroundColor: "#252525",
          paddingHorizontal: 16,
          paddingVertical: 16,
        }}
      >
        <View style={{ flexDirection: "row" }}>
          
           <SupabaseImage 
           bucket="avatars"
           path={post.user.avatar_url ?? ''}
           className="w-12 h-12 rounded-full"
          />

          <View style={{ flex: 1 }}>
            <View
              style={{
                marginBottom: 4,
                flexDirection: "row",
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  marginRight: 8,
                  fontWeight: "600",
                  color: "white",
                }}
              >
                {post.user.full_name ?? post.user.username ?? "User"}
              </Text>

              <Text
                style={{
                  marginRight: 8,
                  fontSize: 14,
                  color: "#999",
                }}
              >
                •
              </Text>

              <Text
                style={{
                  fontSize: 14,
                  color: "#999",
                }}
              >
                {formatDate(post.created_at)}
              </Text>
            </View>

            <Text
              style={{
                marginBottom: 12,
                fontSize: 15,
                lineHeight: 24,
                color: "#e5e5e5",
              }}
            >
              {post.content}
            </Text>



            {post.images && (

        <View className="flex-row gap-2 mt-2">
          {post.images.map((image) =>(
             <Image key={image}
            source={{uri: supabase.storage
                .from('media')
             .getPublicUrl(image).data.publicUrl,
           }} 
            className="w-full aspect-square  rounded-lg" />
              ))}
           </View>
              )}

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Feather
                  name="message-circle"
                  size={18}
                  color="#999"
                  style={{ marginRight: 6 }}
                />

                <Text style={{ fontSize: 14, color: "#999" }}>
                  0
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Feather
                  name="repeat"
                  size={18}
                  color="#999"
                  style={{ marginRight: 6 }}
                />

                <Text style={{ fontSize: 14, color: "#999" }}>
                  0
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Feather
                  name="heart"
                  size={18}
                  color="#999"
                  style={{ marginRight: 6 }}
                />

                <Text style={{ fontSize: 14, color: "#999" }}>
                  0
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Pressable>
    </Link>
  );
}