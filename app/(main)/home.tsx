import React, { useState } from "react";
import {
  Alert,
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Image,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { useUser } from "../../contexts/UserContext"; // Import UserContext
import { supabase } from "../../lib/supabase";

const Home = () => {
  const router = useRouter();

  // Định nghĩa kiểu dữ liệu cho email và password
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // Định nghĩa kiểu dữ liệu cho trạng thái ẩn/hiện mật khẩu
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  // Định nghĩa kiểu dữ liệu cho trạng thái loading
  const [loading, setLoading] = useState<boolean>(false);




  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>HOME</Text>
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
    marginBottom: 30,
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
  loginButton: {
    backgroundColor: "black",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#d9d9d9",
  },
  orText: {
    marginHorizontal: 10,
    fontSize: 14,
    color: "#8c8c8c",
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  socialButton: {
    marginHorizontal: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#d9d9d9",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
  },
  socialIcon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  signupContainer: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "center",
  },
  signupText: {
    fontSize: 14,
    color: "#8c8c8c",
  },
  signupLink: {
    fontSize: 14,
    color: "#007aff",
    fontWeight: "600",
  },
});

export default Home;
