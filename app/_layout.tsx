import React, { useEffect } from "react";
import { Stack, useRouter } from "expo-router"; // Expo Router
import { View, ActivityIndicator } from "react-native"; // Loading UI
import { supabase } from "../lib/supabase"; // Supabase connection
import { UserProvider } from "../contexts/UserContext"; // Context quản lý người dùng

const Layout = () => {
  const router = useRouter(); // Điều hướng giữa các màn hình

  useEffect(() => {
    // Kiểm tra trạng thái người dùng
    const checkUser = async () => {
      const { data: user } = await supabase.auth.getUser();
      if (user) {
        router.replace("/signIn"); // Điều hướng đến Home nếu đã đăng nhập
      } else {
        router.replace("/signIn"); // Điều hướng đến SignIn nếu chưa đăng nhập
      }
    };

    checkUser();
  }, []);

  return (
    <UserProvider>
      {/* Stack để tổ chức các màn hình */}
      <Stack screenOptions={{ headerShown: false }}> {/* Ẩn header toàn bộ stack */}
        {/* Hiển thị vòng xoay loading tạm thời */}
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      </Stack>
    </UserProvider>
  );
};

export default Layout;
