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
import { insertPost } from '../service/postService';

const UpdatePostScreen = () => {
  const [serviceModalVisible, setServiceModalVisible] = useState(false);
  const [audienceModalVisible, setAudienceModalVisible] = useState(false);
  const [selectedService, setSelectedService] = useState('Dịch vụ');
  const [selectedAudience, setSelectedAudience] = useState('Đối tượng');
  const [image, setImage] = useState<string | null>(null);
  const [content, setContent] = useState('');

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

  const handlePost = async () => {
    if (!content.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập nội dung bài viết.');
      return;
    }

    if (!serviceid) {
      Alert.alert('Lỗi', 'Vui lòng chọn một dịch vụ.');
      return;
    }

    if (scope === 'Đối tượng') {
        Alert.alert('Lỗi', 'Vui lòng chọn đối tượng xem')
        return
    }
    try {
      await insertPost(userid, serviceid, content, image, scope);
      Alert.alert('Thành công', 'Bài viết đã được đăng.');
      setContent('');
      setImage(null);
      setSelectedService('Dịch vụ');
      setSelectedAudience('Đối tượng');
    } catch (error) {
      Alert.alert('Lỗi', `Không thể đăng bài viết: ${error.message}`);
    }
  };




  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Image
            source={{ uri: 'https://via.placeholder.com/40' }}
            style={styles.avatar}
          />
          <View>
            <Text style={styles.userName}>Khánh Huy</Text>
            <Text style={styles.userLocation}>Cư dân tòa S1.01</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.postButton} onPress={handlePost}>
          <Text style={styles.postButtonText}>Đăng</Text>
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
});