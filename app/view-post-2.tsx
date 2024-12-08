import { getPosts } from "@/service/postService";
import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, RefreshControl } from "react-native";
import Icon from "react-native-vector-icons/Ionicons"; // Import thư viện biểu tượng

type Post = {
    
        id: any;
        content: any;
        created_at: any;
        likeCount: any;
        commentCount: any;
        shareCount: any;
        image: any;
        object: any;
        userID: any;
        user: {
            name: any;
            clusterid: any;
            cluster: {
                name: any;
            }[];
        }[];
        serviceID: any;
        service: {
            name: any;
        }[];
        isDelete: any;
        isFeature: any;
        isModerate: any;
}

const PostItem = ({ post }: { post: any }) => (
  <View style={styles.postContainer}>
    {/* Header bài viết */}
    <View style={styles.postHeader}>
      <Image
        source={{ uri: "https://via.placeholder.com/50x50.png?text=Avatar" }}
        style={styles.avatar}
      />
      <View style={styles.postInfo}>
        <Text style={styles.postAuthor}>{post.user.name}</Text>
        <View style={styles.additionalInfoContainer}>
        {/* Dòng 1: Cư dân tòa */}
          <Text style={styles.additionalInfo}>Cư dân tòa {post.user.cluster.name}</Text>

        {/* Dòng 2: Loại dịch vụ + Thời gian + Visibility */}
          <View style={styles.row}>
              <Text style={styles.additionalInfo}>{post.service.name}</Text>
              <Text style={styles.dot}> • </Text>
              <Text style={styles.postTimestamp}>{post.timeAgo}</Text>
              <Text style={styles.dot}> </Text>
              {post.object === "Công khai" ? (
                <Icon name="earth" size={14} color="#888" style={styles.icon} />
              ) : (
                <Icon name="person" size={14} color="#888" style={styles.icon} />
              )}
          </View>
        </View>

      </View>
    </View>
    {/* Nội dung bài viết */}
    <Text style={styles.postContent}>{post.content}</Text>
    {post.image && (
      <Image source={{ uri: post.image }} style={styles.postImage} resizeMode="cover" />
    )}
    {/* Tương tác */}
    <View style={styles.postInteractions}>
  <TouchableOpacity>
    {post.likeCount > 0 ? (
      <Text style={styles.postAction}>👍 {post.likeCount}</Text>
    ) : (
      <Text style={styles.postAction}>👍</Text>
    )}
  </TouchableOpacity>
  <TouchableOpacity>
    {post.commentCount > 0 ? (
      <Text style={styles.postAction}>💬 {post.commentCount}</Text>
    ) : (
      <Text style={styles.postAction}>💬</Text>
    )}
  </TouchableOpacity>
  <TouchableOpacity>
    {post.shareCount > 0 ? (
      <Text style={styles.postAction}>🔄 {post.shareCount}</Text>
    ) : (
      <Text style={styles.postAction}>🔄</Text>
    )}
  </TouchableOpacity>
</View>
  </View>
);

const PostsList = () => {
    const [posts, setPosts] = useState<any[]>([]);
    const [isRefreshing, setIsRefreshing] = useState(false); // Trạng thái làm mới
  
    useEffect(() => {
      // Lấy các bài viết khi màn hình được tải lần đầu
      loadPosts();
    }, []);
  
    const loadPosts = async () => {
      try {
        const fetchedPosts = await getPosts(); // Gọi API lấy dữ liệu
        setPosts(fetchedPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
  
    const onRefresh = async () => {
      setIsRefreshing(true); // Đặt trạng thái đang làm mới
      await loadPosts(); // Gọi lại API để làm mới bài viết
      setIsRefreshing(false); // Kết thúc trạng thái làm mới
    };
  
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={posts}
          renderItem={({ item }) => <PostItem post={item} />}
          contentContainerStyle={styles.listContainer}
          keyExtractor={(item) => item.id.toString()}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing} // Trạng thái đang làm mới
              onRefresh={onRefresh} // Hàm gọi lại khi người dùng vuốt xuống
            />
          }
        />
      </View>
    );
  };

const styles = StyleSheet.create({
  listContainer: {
    padding: 10,
  },
  postContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  postInfo: {
    flex: 1,
  },
  postAuthor: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#000",
  },
  postTimestamp: {
    fontSize: 12,
    color: "#666",
  },
  postContent: {
    fontSize: 14,
    color: "#333",
    marginBottom: 10,
  },
  postImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  postInteractions: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 10,
  },
  postAction: {
    fontSize: 14,
    color: "#666",
  },
  additionalInfoContainer: {
    flexDirection: "column",
    alignItems: "flex-start", // Căn trái tất cả thông tin
    marginBottom: 4, // Khoảng cách dưới cho phần container
  },
  row: {
    flexDirection: "row", // Thông tin hiển thị theo hàng
    alignItems: "center",
    marginTop: 2, // Khoảng cách giữa dòng 1 và dòng 2
  },
  additionalInfo: {
    fontSize: 12,
    color: "#444", // Màu chữ trung tính
    marginBottom: 2, // Khoảng cách dưới dòng 1
  },
  visibilityText: {
    fontSize: 12,
    color: "#888",
    fontStyle: "italic",
  },
  dot: {
    fontSize: 12,
    color: "#888",
  },
  icon: {
    marginHorizontal: 2,
  },
});

export default PostsList;
