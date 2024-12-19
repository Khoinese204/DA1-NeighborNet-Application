import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

const ResetPasswordSuccessScreen = () => {
  const router = useRouter();

  const handleContinue = () => {
    router.push("/signIn"); // Điều hướng đến màn hình đăng nhập
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đặt lại mật khẩu thành công!</Text>
      <Text style={styles.subtitle}>
        Chúc mừng bạn đã đặt lại mật khẩu thành công.
      </Text>
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
    alignItems: "center",
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
    marginBottom: 30,
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

export default ResetPasswordSuccessScreen;
