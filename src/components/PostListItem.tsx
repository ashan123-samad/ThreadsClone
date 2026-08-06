import { Tables } from "@/types/database.types";
import { Feather } from "@expo/vector-icons";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Link } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";

dayjs.extend(relativeTime);

type PostWithUser= Tables<"posts"> & {
  user: Tables<"profiles">;
  replies: {
    count: number;
  }[];
};

function formatDate(value: string) {
  return dayjs(value).fromNow();
}

export default function PostListItem({
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
          <Image
            source={{
              uri:
                post.user.avatar_url ??
                "https://i.pravatar.cc/150",
            }}
            style={{
              width: 44,
              height: 44,
              borderRadius: 9999,
              marginRight: 10,
            }}
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