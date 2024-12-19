import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Pressable,
  Alert,
} from "react-native";
import { useRouter } from "expo-router"; // Thay bằng @react-navigation nếu cần
import { useUser } from "../contexts/UserContext"; // Import UserContext
import { supabase } from "../lib/supabase";


const SignUp = () => {
  const { name, birthdate, gender, clusterid } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleBack = () => {
    router.push("/signUpInfo"); // Điều hướng về trang đăng ký trước đó
  };
  console.log({ name, birthdate, gender, clusterid });
  const handleSignUp = async () => {
    console.log({ name, birthdate, gender, clusterid });
    
    if (password !== confirmPassword) {
      Alert.alert("Lỗi", "Mật khẩu không khớp!");
      return;
    }
    
    setLoading(true);

    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });
      if (authError) {
        setLoading(false);
        console.error("Error signing up:", authError);
        Alert.alert("Đăng ký thất bại", authError.message);
        return;
      }
      // The profileID is now the user.auth.id (the user ID from Supabase)
      const accountid = authData?.user?.id;
      console.log({ accountid, email, password, confirmPassword });
      // Step 2: Create the profile with profileID set to user.auth.id
      const { data: accountData, error: accountError } = await supabase
      .from("account")
      .update({
        email,           // Cập nhật email
        password,        // Cập nhật mật khẩu (nên mã hóa mật khẩu trước khi lưu)
        roleid: 2,       // Cập nhật roleID, mặc định là 2
      })
      .eq('accountid', accountid); // Điều kiện để cập nhật theo accountid
        if (accountError) {
          setLoading(false);
          Alert.alert("Lỗi tạo account", accountError.message);
          return;
        }
        // Step 3: Create the user entry in the 'user' table
      const { error: userError } = await supabase
      .from("user")
      .insert([
        {
          accountid: accountid, // Link to the profileID
          name: name,
          dateofbirth: birthdate,
          gender: gender,
          clusterid: clusterid,
        },
      ]);

    setLoading(false);

    if (userError) {
      Alert.alert("Lỗi tạo người dùng User", userError.message);
      return;
    }

    console.log("User created with profileID:", accountid);

    // Navigate to the next screen
    router.push("/signIn");
  } catch (error) {
    setLoading(false);
    console.error("Unexpected error:", error);
    Alert.alert("Đăng ký thất bại", "Đã xảy ra lỗi ngoài ý muốn. Vui lòng thử lại.");
  }
};

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <Image
          source={require("../assets/images/back.png")} // Đặt icon quay lại trong thư mục assets/images
          style={styles.backIcon}
        />
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>Đăng ký</Text>

      {/* Input Fields */}
      <View style={styles.inputContainer}>
        <Image
          source={require("../assets/images/user.png")}
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#A0A0A0"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>

      <View style={styles.inputContainer}>
        <Image
          source={require("../assets/images/lock.png")}
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder="Mật khẩu"
          placeholderTextColor="#A0A0A0"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Image
          source={require("../assets/images/eye_hide.png")}
          style={styles.eyeIcon}
        />
      </View>

      <View style={styles.inputContainer}>
        <Image
          source={require("../assets/images/lock.png")}
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder="Xác nhận mật khẩu"
          placeholderTextColor="#A0A0A0"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
        <Image
          source={require("../assets/images/eye_hide.png")}
          style={styles.eyeIcon}
        />
      </View>

      {/* Button */}
      <Pressable style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Tiếp tục</Text>
      </Pressable>

      {/* Login Redirect */}
      <TouchableOpacity onPress={() => router.push("/signIn")}>
        <Text style={styles.loginText}>Bạn đã có tài khoản? Đăng nhập</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D3D3D3",
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 10,
    height: 50,
    width: "100%",
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  eyeIcon: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    width: "100%",
  },
  checkboxText: {
    fontSize: 14,
    marginLeft: 10,
    color: "#000",
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  loginText: {
    fontSize: 14,
    color: "#A0A0A0",
  },
});
