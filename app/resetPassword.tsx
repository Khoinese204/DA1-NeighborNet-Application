import React, { useState } from "react";
import {
  Alert,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { useRouter } from "expo-router";

const ResetPasswordScreen = () => {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const handleContinue = () => {
    if (!newPassword || !confirmPassword) {
      Alert.alert("Đặt lại mật khẩu", "Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert("Đặt lại mật khẩu", "Mật khẩu xác nhận không khớp!");
      return;
    }

    // Logic xử lý đặt lại mật khẩu (gửi API)
    console.log("Mật khẩu mới:", newPassword);
    router.push("/resetPasswordSuccess"); // Điều hướng đến trang thông báo thành công
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đặt lại mật khẩu</Text>
      <Text style={styles.subtitle}>Tạo mật khẩu mới của bạn</Text>

      {/* Nhập mật khẩu mới */}
      <View style={styles.inputContainer}>
        <Image
          source={require("../assets/images/lock.png")} // Thay thế icon nếu cần
          style={styles.icon}
        />
        <TextInput
          value={newPassword}
          onChangeText={setNewPassword}
          placeholder="Mật khẩu mới"
          secureTextEntry={!passwordVisible}
          style={styles.input}
        />
        <TouchableOpacity
          onPress={() => setPasswordVisible(!passwordVisible)}
        >
          <Image
            source={
              passwordVisible
                ? require("../assets/images/eye_open.png")
                : require("../assets/images/eye_hide.png")
            }
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      {/* Nhập lại mật khẩu */}
      <View style={styles.inputContainer}>
        <Image
          source={require("../assets/images/lock.png")} // Thay thế icon nếu cần
          style={styles.icon}
        />
        <TextInput
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Xác nhận mật khẩu"
          secureTextEntry={!confirmPasswordVisible}
          style={styles.input}
        />
        <TouchableOpacity
          onPress={() =>
            setConfirmPasswordVisible(!confirmPasswordVisible)
          }
        >
          <Image
            source={
              confirmPasswordVisible
                ? require("../assets/images/eye_open.png")
                : require("../assets/images/eye_hide.png")
            }
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      {/* Nút tiếp tục */}
      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>Tiếp tục</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  button: {
    backgroundColor: "black",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ResetPasswordScreen;
