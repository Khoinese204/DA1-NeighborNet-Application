import React, { useState } from 'react';
import {
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

const PostScreen = () => {
  const [serviceModalVisible, setServiceModalVisible] = useState(false);
  const [audienceModalVisible, setAudienceModalVisible] = useState(false);
  const [selectedService, setSelectedService] = useState('Dịch vụ');
  const [selectedAudience, setSelectedAudience] = useState('Đối tượng');
  const [image, setImage] = useState<string | null>(null);

  const services = [
    'Sửa chữa nhà cửa',
    'Vệ sinh',
    'Giao hàng và vận chuyển',
    'Cây cảnh và thú cưng',
    'Giáo dục',
    'Chăm sóc sức khỏe',
    'Mua bán',
  ];

  const audiences = ['Mọi người', 'Chỉ mình tôi'];

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
        <TouchableOpacity style={styles.postButton}>
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
        {image && <Image source={{ uri: image }} style={styles.previewImage} />}
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
                      setSelectedService(item);
                      setServiceModalVisible(false);
                    }}
                  >
                    <Text style={styles.modalText}>{item}</Text>
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

export default PostScreen;

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
  previewImage: {
    width: 200,
    height: 200,
    marginTop: 16,
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
});
