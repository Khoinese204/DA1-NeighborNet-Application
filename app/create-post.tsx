import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';

const PostScreen = () => {
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
        <TouchableOpacity style={styles.dropdown}>
          <Text style={styles.dropdownText}>Dịch vụ</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.dropdown}>
          <Text style={styles.dropdownText}>Đối tượng</Text>
        </TouchableOpacity>
      </View>

      {/* Input */}
      <TextInput
        style={styles.input}
        placeholder="Bạn đang nghĩ gì?"
        placeholderTextColor="#b0b0b0"
        multiline
      />

      {/* Image Picker */}
      <TouchableOpacity style={styles.imagePicker}>
        <Image
          source={{ uri: 'https://via.placeholder.com/50' }}
          style={styles.imageIcon}
        />
        <Text style={styles.imagePickerText}>Hình ảnh</Text>
      </TouchableOpacity>
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
    marginBottom: 0,
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
    marginBottom: 100,
    textAlignVertical: 'top', // Đảm bảo văn bản nhập bắt đầu từ trên cùng
    padding: 8,
    maxHeight: 350
  },
  imagePicker: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100
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
});
