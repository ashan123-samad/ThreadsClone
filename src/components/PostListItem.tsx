import { Feather } from "@expo/vector-icons";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Image, Pressable, Text, View } from "react-native";
import type { Post } from "../types";

dayjs.extend(relativeTime);

function formatDate(value: string) {
  return dayjs(value).fromNow();
}

export default function PostListItem({ post }: { post: Post }) {
  const replyCount = post.replose?.length ?? 0;

  return (
   <Pressable style={{ borderBottomWidth: 1, borderBottomColor: '#333', backgroundColor: '#252525', paddingHorizontal: 16, paddingVertical: 16 }}>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ justifyContent: 'center',alignItems: 'center' }}>
        <Image
          source={{ uri: post.user.image }}
          style={{ width:44, height: 44,  borderRadius: 9999 ,marginRight: 10}}
        />
</View>
        <View style={{ flex: 1 }}>
          <View style={{ marginBottom: 4, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' }}>
            <Text style={{ marginRight: 8, fontWeight: '600', color: 'white' }}>
              {post.user.name}
            </Text>

            <Text style={{ marginRight: 8, fontSize: 14, color: '#999' }}>
                
            </Text>

            <Text style={{ marginRight: 8, fontSize: 14, color: '#999' }}>•</Text>

            <Text style={{ fontSize: 14, color: '#999' }}>
              {formatDate(post.createdAt)}
            </Text>
          </View>

          {post.parent_id && post.parent?.user ? (
            <Text style={{ marginBottom: 8, fontSize: 14, color: '#0ea5e9' }}>
              Replying to @{post.parent.user.username}
            </Text>
          ) : null}

          <Text style={{ marginBottom: 12, fontSize: 15, lineHeight: 24, color: '#e5e5e5' }}>
            {post.content}
          </Text>

          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ marginRight: 16, flexDirection: 'row', alignItems: 'center' }}>
              <Feather name="message-circle" size={18} color="#999" style={{ marginRight: 6 }} />
              <Text style={{ fontSize: 14, color: '#999' }}>
                {replyCount}
              </Text>
            </View>

            <View style={{ marginRight: 16, flexDirection: 'row', alignItems: 'center' }}>
              <Feather name="repeat" size={18} color="#999" style={{ marginRight: 6 }} />
              <Text style={{ fontSize: 14, color: '#999' }}>
                {replyCount}
              </Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Feather name="heart" size={18} color="#999" style={{ marginRight: 6 }} />
              <Text style={{ fontSize: 14, color: '#999' }}>
                {replyCount + 2}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
}