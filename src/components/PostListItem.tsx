import { Tables } from "@/types/database.types";
import { Feather } from "@expo/vector-icons";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";
import SupabaseImage from "./SupabaseImage";

dayjs.extend(relativeTime);

type PostWithUser = Tables<"posts"> & {
  user: Tables<"profiles">;
  replies?: {
    count: number;
  }[];
};

function formatDate(value: string) {
  return dayjs(value).fromNow();
}

export default function PostListItem({
  post,
  isLastInGroup = true,
}: {
  post: PostWithUser;
  isLastInGroup?: boolean;
}) {
  return (
    <Link href={`/posts/${post.id}`} asChild>
      <Pressable
        className={`flex-row ${
          isLastInGroup ? "border-b border-gray-800/70" : ""
        }`}
      >
        {/* Avatar + thread line */}
        <View className="mr-3 items-center">
          <SupabaseImage 
           bucket="avatars"
           path={post.user.avatar_url ?? ''}
           className="w-12 h-12 rounded-full"
           transform={{width:50, height:50}}
          />

          {!isLastInGroup && (
            <View className="mt-2 w-[3px] flex-1 rounded-full bg-neutral-700" />
          )}
        </View>

        {/* Post content */}
        <View style={{ flex: 1 }}>
          {/* Username + time */}
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
              {post.user.full_name ??
                post.user.username ??
                "User"}
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

          {/* Post text */}
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

          {/* Post images */}
          {post.images && post.images.length > 0 && (
            <View className="mt-2 flex-row gap-2">
              {post.images.map((image : string) => (
                <SupabaseImage
                  key={image}
                  bucket="media"
                  path={image}
                  className="aspect-square w-full rounded-lg"
                  transform={{width:500, height:500}}
                />
              ))}
            </View>
          )}

          {/* Actions */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 8,
              marginBottom: 12,
            }}
          >
            {/* Comments */}
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

            {/* Reposts */}
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

            {/* Likes */}
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
      </Pressable>
    </Link>
  );
}