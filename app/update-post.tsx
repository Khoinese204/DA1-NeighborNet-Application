import React, { useState } from 'react';
import {
  Alert,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Modal,
  FlatList,
  Button,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { insertPost, updatePost } from '../service/postService';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useRoute } from '@react-navigation/native';

const UpdatePostScreen = ({ route, navigation }: { route: any, navigation: any }) => {
  
  const post = route.params.selectedPost;

  const [serviceModalVisible, setServiceModalVisible] = useState(false);
  const [audienceModalVisible, setAudienceModalVisible] = useState(false);
  const [selectedService, setSelectedService] = useState(post.service.name);
  const [selectedAudience, setSelectedAudience] = useState(post.object);
  const [image, setImage] = useState<string | null>(post.image);
  const [content, setContent] = useState(post.content);

  

  const services = [
      { id: 1, name: 'Sửa chữa nhà cửa' },
      { id: 2, name: 'Vệ sinh' },
      { id: 3, name: 'Giao hàng và vận chuyển' },
      { id: 4, name: 'Cây cảnh và thú cưng' },
      { id: 5, name: 'Giáo dục' },
      { id: 6, name: 'Chăm sóc sức khỏe' },
      { id: 7, name: 'Mua bán' },
    ];
    
  const audiences = ['Mọi người', 'Chỉ mình tôi'];
  const userid = 5; // ID người dùng giả định
  const scope = selectedAudience;
  const serviceid = services.find((s) => s.name === selectedService)?.id || null;
  
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    if (!content.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập nội dung bài viết.');
      return;
    }
    try {
      await updatePost(post.id, serviceid, content, image, scope);
      Alert.alert('Thành công', 'Bài viết đã được chỉnh sửa thành công.');
    } catch (error) {
      Alert.alert('Lỗi', `Không thể chỉnh sửa bài viết: ${error.message}`);
    }
  };


  const handleBack = () => {
    if (navigation.canGoBack()) {
        navigation.goBack(); // Quay lại nếu có lịch sử
    } else {
        navigation.navigate('MainPage'); // Quay về trang chính
    }
};

  return (
    <View style={styles.container}>
       <View style={styles.topBar}>
      {/* Nút X */}
      <TouchableOpacity style={styles.closeButtonWrapper} onPress={handleBack}>
        <Ionicons name="close" size={24} color="#000" />
      </TouchableOpacity>

      {/* Tiêu đề */}
      <Text style={styles.topBarTitle}>Chỉnh sửa bài viết</Text>
    </View>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Image
            source={{ uri: 'https://via.placeholder.com/40' }}
            style={styles.avatar}
          />
          <View>
            <Text style={styles.userName}>{post.user.name}</Text>
            <Text style={styles.userLocation}>Cư dân tòa {post.user.cluster.name}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.postButton} onPress={handleSave}>
          <Text style={styles.postButtonText}>Lưu</Text>
        </TouchableOpacity>
      </View>

      {/* Dropdowns */}
      <View style={styles.dropdownContainer}>
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => setServiceModalVisible(true)}
        >
          <Text style={styles.dropdownText}>{selectedService}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => setAudienceModalVisible(true)}
        >
          <Text style={styles.dropdownText}>{selectedAudience}</Text>
        </TouchableOpacity>
      </View>

      {/* Input */}
      <TextInput
        style={styles.input}
        placeholder="Bạn đang nghĩ gì?"
        placeholderTextColor="#b0b0b0"
        multiline={true}
        value={content}
        onChangeText={setContent}
      />

      {/* Image Picker */}
      <View style={styles.imagePicker}>
  <TouchableOpacity onPress={pickImage}>
    <Image
      source={{ uri: 'https://via.placeholder.com/50' }}
      style={styles.imageIcon}
    />
    <Text style={styles.imagePickerText}>Hình ảnh</Text>
  </TouchableOpacity>

  {/* Nếu có ảnh, hiển thị ảnh đã chọn với nút xóa */}
  {image && (
    <View style={styles.imagePreviewContainer}>
      <Image source={{ uri: image }} style={styles.previewImage} />
      <TouchableOpacity
        style={styles.removeImageButton}
        onPress={() => setImage(null)}
      >
        <Text style={styles.removeImageText}>✕</Text>
      </TouchableOpacity>
    </View>
  )}
</View>

      {/* Service Modal */}
      {serviceModalVisible && (
        <Modal
          visible={serviceModalVisible}
          transparent
          animationType="slide"
          onRequestClose={() => setServiceModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.bottomModal}>
              <FlatList
                data={services}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.modalItem}
                    onPress={() => {
                      setSelectedService(item.name);
                      setServiceModalVisible(false);
                    }}
                  >
                    <Text style={styles.modalText}>{item.name}</Text>
                  </TouchableOpacity>
                )}
              />
              <TouchableOpacity
                style={styles.closeModalButton}
                onPress={() => setServiceModalVisible(false)}
              >
                <Text style={styles.closeModalText}>Đóng</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}

      {/* Audience Modal */}
      {audienceModalVisible && (
        <Modal
          visible={audienceModalVisible}
          transparent
          animationType="slide"
          onRequestClose={() => setAudienceModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.bottomModal}>
              <FlatList
                data={audiences}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.modalItem}
                    onPress={() => {
                      setSelectedAudience(item);
                      setAudienceModalVisible(false);
                    }}
                  >
                    <Text style={styles.modalText}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
              <TouchableOpacity
                style={styles.closeModalButton}
                onPress={() => setAudienceModalVisible(false)}
              >
                <Text style={styles.closeModalText}>Đóng</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default UpdatePostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  userLocation: {
    fontSize: 12,
    color: '#888',
  },
  postButton: {
    backgroundColor: '#000',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  postButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  dropdownContainer: {
    flexDirection: 'row',
    marginTop: 16,
  },
  dropdown: {
    backgroundColor: '#e6f7e6',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
  },
  dropdownText: {
    fontSize: 14,
    color: '#4caf50',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    marginTop: 8,
    marginBottom: 16,
    textAlignVertical: 'top',
    padding: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    maxHeight: 300,
  },
  imagePicker: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageIcon: {
    width: 50,
    height: 50,
    tintColor: '#ccc',
  },
  imagePickerText: {
    fontSize: 14,
    color: '#888',
    marginTop: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  bottomModal: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
  },
  modalItem: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  modalText: {
    fontSize: 16,
    color: '#000',
  },
  closeModalButton: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#000',
    borderRadius: 8,
    alignSelf: 'center',
  },
  closeModalText: {
    color: '#fff',
    fontSize: 16,
  },
  imagePreviewContainer: {
    position: 'relative',
    marginTop: 16,
    alignItems: 'center',
  },
  previewImage: {
    width: 200,
    height: 200,
    borderRadius: 8,
  },
  removeImageButton: {
    position: 'absolute',
    top: 10, // Khoảng cách từ mép trên của ảnh
    right: 10, // Khoảng cách từ mép phải của ảnh
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 15,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeImageText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  closeButtonWrapper: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.1)', // Màu nền mờ
    justifyContent: 'center',
    alignItems: 'center',
  },
  topBarTitle: {
    fontSize: 20,
    color: '#000',
    marginLeft: 8, // Khoảng cách giữa nút "X" và tiêu đề
  },
});