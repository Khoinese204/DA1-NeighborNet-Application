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
import { useUser } from "../contexts/UserContext"; // Import UserContext
import { supabase } from "../lib/supabase";

const signIn = () => {
  const router = useRouter();

  // Định nghĩa kiểu dữ liệu cho email và password
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // Định nghĩa kiểu dữ liệu cho trạng thái ẩn/hiện mật khẩu
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  // Định nghĩa kiểu dữ liệu cho trạng thái loading
  const [loading, setLoading] = useState<boolean>(false);




  const onSubmit = async () => {
    if(!email || !password){
        Alert.alert('Login', "please fill all the fields!");
        return;
    }
    setLoading(true);
    const {data, error} = await supabase.auth.signInWithPassword({
        email, 
        password
    });
    setLoading(false);

    console.log('error: ', error);
    if(error){
        Alert.alert('Login', error.message);
    }
    console.log('Login success: ', data);
        // Điều hướng đến màn hình Home sau khi đăng nhập thành công
        router.push('/(main)/home');  // Điều hướng đến trang "home"
}







  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Đăng nhập</Text>

      {/* Input email */}
      <View style={styles.inputContainer}>
        <Image
          source={require("../assets/images/user.png")} // Thay đổi icon email của bạn
          style={styles.icon}
        />
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Nhập email"
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      {/* Input password */}
      <View style={styles.inputContainer}>
        <Image
          source={require("../assets/images/lock.png")} // Thay đổi icon mật khẩu của bạn
          style={styles.icon}
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Nhập mật khẩu"
          style={styles.input}
          secureTextEntry={!passwordVisible}
          autoCapitalize="none"
        />
        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
          <Image
            source={
              passwordVisible
                ? require("../assets/images/eye_open.png") // Biểu tượng mắt mở
                : require("../assets/images/eye_hide.png") // Biểu tượng mắt đóng
            }
            style={styles.icon}
          />
        </TouchableOpacity>
        
      </View>
      <Pressable onPress={() => router.push("/findEmail")}>
        <Text style={styles.description}>Quên mật khẩu?</Text>
      </Pressable>
      
      {/* Button login */}
      <TouchableOpacity style={styles.loginButton} onPress={onSubmit}>
        <Text style={styles.loginButtonText}>Đăng nhập</Text>
      </TouchableOpacity>

      {/* Divider and social login options */}
      <View style={styles.dividerContainer}>
        <View style={styles.line} />
        <Text style={styles.orText}>Hoặc</Text>
        <View style={styles.line} />
      </View>

      <View style={styles.socialContainer}>
        {/* Facebook */}
        <TouchableOpacity style={styles.socialButton}>
          <Image
            source={require("../assets/images/facebook.png")}
            style={styles.socialIcon}
          />
        </TouchableOpacity>

        {/* Google */}
        <TouchableOpacity style={styles.socialButton}>
          <Image
            source={require("../assets/images/google.png")}
            style={styles.socialIcon}
          />
        </TouchableOpacity>

        {/* Apple */}
        <TouchableOpacity style={styles.socialButton}>
          <Image
            source={require("../assets/images/apple.png")}
            style={styles.socialIcon}
          />
        </TouchableOpacity>
      </View>

      {/* Sign up link */}
      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Bạn chưa có tài khoản?</Text>
        <Pressable onPress={() => router.push("/signUpInfo")}>
          <Text style={styles.signupLink}> Đăng ký</Text>
        </Pressable>
      </View>
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
  description: {
    fontSize: 14,
    color: "#666",
    textAlign: "right",
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

export default signIn;
