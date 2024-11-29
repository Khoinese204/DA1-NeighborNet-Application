import React, { useState } from "react";
import {
  Alert,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";

const OTPScreen = () => {
  const router = useRouter();
  const [otp, setOtp] = useState(["", "", "", ""]);



  const handleSubmit = () => {


    // Thực hiện xác minh OTP (logic backend)
    const otpCode = otp.join("");
    console.log("Mã OTP đã nhập:", otpCode);

    // Nếu thành công, điều hướng đến màn hình đặt lại mật khẩu hoặc home
    router.push("/resetPassword"); // Điều hướng đến trang home
  };

  const resendCode = () => {
    // Logic gửi lại mã OTP
    console.log("Mã OTP được gửi lại!");
    Alert.alert("Xác minh OTP", "Mã OTP đã được gửi lại!");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Xác minh OTP</Text>
      <Text style={styles.subtitle}>
        Nhập mã xác minh chúng tôi gửi vào email của bạn.
      </Text>
      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.otpInput}
            keyboardType="numeric"
            maxLength={1}
            value={digit}
          />
        ))}
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Tiếp tục</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={resendCode}>
        <Text style={styles.resendText}>Không nhận được mã? Gửi lại (30s)</Text>
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
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
    textAlign: "center",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    textAlign: "center",
    fontSize: 18,
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
  resendText: {
    marginTop: 20,
    fontSize: 14,
    color: "#007aff",
    textAlign: "center",
    fontWeight: "600",
  },
});

export default OTPScreen;
