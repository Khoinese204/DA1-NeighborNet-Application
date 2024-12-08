import { getPosts } from "@/service/postService";
import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, RefreshControl, Modal } from "react-native";
import Icon from "react-native-vector-icons/Ionicons"; // Import thư viện biểu tượng
import UpdatePostScreen from "./update-post";

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

const PostItem = ({ post }: { post: any }) => {
    const [isLiked, setIsLiked] = useState(false); // Trạng thái Like

    const handleLikePress = () => {
      setIsLiked(!isLiked); // Đổi trạng thái khi nhấn
    };

     const [menuVisible, setMenuVisible] = useState(false); // Hiển thị menu

    const toggleMenu = () => {
      setMenuVisible(!menuVisible); // Đóng/mở menu
    };
  
    const handleEdit = () => {
      setMenuVisible(false);
      console.log("Chỉnh sửa bài viết:");
      <UpdatePostScreen></UpdatePostScreen>
    };
  
    const handleDelete = () => {
      setMenuVisible(false);
      console.log("Xóa bài viết:");
      // Thêm logic xóa bài viết ở đây
    };
return (
    post.object === "Mọi người" ? ( 
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
                <Text style={styles.postTimestamp}>{post.timeAgo} </Text>
                {post.object === "Mọi người" ? (
                    <Icon name="earth" size={14} color="#888" style={styles.icon} />
                ) : (
                    <Icon name="person" size={14} color="#888" style={styles.icon} />
                )}
            </View>
            </View>

        </View>
        </View>
        <TouchableOpacity onPress={toggleMenu} style={styles.moreButton}>
            <Icon name="ellipsis-horizontal" size={20} color="#666" />
            </TouchableOpacity>
        {/* Nội dung bài viết */}
        <Text style={styles.postContent}>{post.content}</Text>
        {post.image && (
        <Image source={{ uri: post.image }} style={styles.postImage} resizeMode="cover" />
        )}
        {/* Menu Tùy chọn */}
           {/* Menu Tùy chọn */}
           {menuVisible && (
        <Modal transparent={true} animationType="fade" visible={menuVisible}>
          <TouchableOpacity
            style={styles.menuOverlay}
            onPress={() => setMenuVisible(false)} // Đóng menu khi nhấn ngoài
          >
            <View style={[styles.menuContainer, styles.menuPosition]}>
              <TouchableOpacity style={styles.menuOption} onPress={handleEdit}>
                <View style={styles.menuItem}>
                  <Icon name="create-outline" size={18} color="#000" style={styles.menuIcon} />
                  <Text style={styles.menuText}>Chỉnh sửa bài viết</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuOption} onPress={handleDelete}>
                <View style={styles.menuItem}>
                  <Icon name="trash-outline" size={18} color="#000" style={styles.menuIcon} />
                  <Text style={styles.menuText}>Xóa bài viết</Text>
                </View>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
      )}
      
      {/* Tương tác */}
      <View style={styles.postInteractionContainer}>
        {/* Lượt thích, bình luận, chia sẻ */}
        <View style={styles.interactionStats}>
          <Text style={styles.statsText}>{post.likeCount + (isLiked ? 1 : 0)} lượt thích</Text>
          <View style={styles.rightStats}>
            <Text style={styles.statsText}>{post.commentCount} bình luận</Text>
            <Text style={styles.statsText}>{post.shareCount} lượt chia sẻ</Text>
          </View>
        </View>

        {/* Nút Thích, Bình luận, Chia sẻ */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton} onPress={handleLikePress}>
            <Icon 
              name="thumbs-up-outline" 
              size={20} 
              color={isLiked ? "#007BFF" : "#888"} // Màu xanh khi đã thích
            />
            <Text style={[styles.actionText, isLiked && { color: "#007BFF" }]}>
              Thích
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="chatbubble-outline" size={20} color="#888" />
            <Text style={styles.actionText}>Bình luận</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="arrow-redo-outline" size={20} color="#888" />
            <Text style={styles.actionText}>Chia sẻ</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
    ) : null
  );
}

const PostsListScreen = () => {
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
    position: 'relative',
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
  icon: {
    marginHorizontal: 2,
  },
  dot: {
    marginHorizontal: 5,
    color: "#666",
  },
  postInteractionContainer: {
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 10,
    paddingBottom: 5,
  },
  interactionStats: {
    flexDirection: "row",
    justifyContent: "space-between", // Tách "thích" và "bình luận/chia sẻ"
    alignItems: "center",
    marginBottom: 8,
  },
  rightStats: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end", // Đưa các số liệu sang bên phải
  },
  statsText: {
    fontSize: 13,
    color: "#666",
    marginLeft: 10, // Khoảng cách giữa "bình luận" và "chia sẻ"
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionText: {
    marginLeft: 6,
    fontSize: 14,
    color: "#666",
  },
  menuOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-start", // Hiển thị menu ở vị trí gần nút ba chấm
    alignItems: "flex-end", // Menu căn chỉnh theo chiều ngang bên phải
  },
  menuContainer: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    width: 220,
    marginTop: 40, // Đẩy menu xuống dưới một chút
    marginRight: 10, // Cách lề phải màn hình
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  menuOption: {
    paddingVertical: 10,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuIcon: {
    marginRight: 10,
  },
  menuText: {
    fontSize: 16,
    color: "#000",
  },
  moreButton: {
    position: "absolute", // Định vị nút ba chấm
    top: 10, // Khoảng cách từ mép trên của `postHeader`
    right: 10, // Khoảng cách từ mép phải của `postHeader`
    zIndex: 1, // Đảm bảo hiển thị lên trên các thành phần khác
  },
  menuPosition: {
    position: "absolute",
    top: 40, // Đặt khoảng cách từ đỉnh màn hình
    right: 10, // Đặt khoảng cách từ cạnh phải màn hình
  }
});

export default PostsListScreen;
