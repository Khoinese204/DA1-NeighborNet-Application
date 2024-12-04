import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";

type Post = {
  id: string;
  content: string;
  image: string;
  likes: number;
  comments: number;
};

const PostedTab = ({ posts }: { posts: Post[] }) => {
  return posts.length === 0 ? (
    <View style={styles.emptyTab}>
      <Text style={styles.noPostsText}>Chưa có bài đăng nào.</Text>
    </View>
  ) : (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.post}>
          <Text style={styles.postContent}>{item.content}</Text>
          <Image source={{ uri: item.image }} style={styles.postImage} />
          <View style={styles.postActions}>
            <Text>{item.likes} lượt thích</Text>
            <Text>{item.comments} bình luận</Text>
          </View>
        </View>
      )}
    />
  );
};

const PendingTab = () => {
  return (
    <View style={styles.emptyTab}>
      <Text style={styles.noPostsText}>Chưa có bài đang chờ nào.</Text>
    </View>
  );
};

const ProfileScreen: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "posted", title: "Đã đăng" },
    { key: "pending", title: "Đang chờ" },
  ]);

  const posts: Post[] = []; // Thay thế bằng dữ liệu thực tế.

  const renderScene = SceneMap({
    posted: () => <PostedTab posts={posts} />,
    pending: PendingTab,
  });

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={{ uri: "https://via.placeholder.com/150" }}
          style={styles.coverPhoto}
        />
        <View style={styles.profileInfo}>
          <Image
            source={{ uri: "https://via.placeholder.com/80" }}
            style={styles.profileImage}
          />
          <View>
            <Text style={styles.name}>Khánh Huy</Text>
            <Text style={styles.address}>Cư dân Tòa A</Text>
            <Text style={styles.bio}>
              But I can see us lost in the memory{"\n"}
              August slipped away into a moment in time.
            </Text>
          </View>
        </View>
      </View>

      {/* Tab View */}
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            tabStyle={styles.tabBar}
            indicatorStyle={styles.indicator}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: { marginBottom: 16 },
  coverPhoto: { width: "100%", height: 150 },
  profileInfo: { flexDirection: "row", alignItems: "center", padding: 16 },
  profileImage: { width: 80, height: 80, borderRadius: 40, marginRight: 16 },
  name: { fontSize: 18, fontWeight: "bold" },
  address: { fontSize: 14, color: "#666" },
  bio: { fontSize: 14, color: "#333", marginTop: 4 },
  tabBar: { backgroundColor: "#000", borderBottomWidth: 1, borderColor: "#ccc"},
  indicator: { backgroundColor: "#000", height: 2 },
  tabLabel: {  color: "#000", fontWeight: "bold" },
  emptyTab: { flex: 1, justifyContent: "center", alignItems: "center" },
  noPostsText: { fontSize: 16, color: "#999" },
  post: { marginBottom: 16 },
  postContent: { fontSize: 14, marginBottom: 8 },
  postImage: { width: "100%", height: 200, borderRadius: 8 },
  postActions: { flexDirection: "row", justifyContent: "space-between", marginTop: 8 },
});

export default ProfileScreen;
