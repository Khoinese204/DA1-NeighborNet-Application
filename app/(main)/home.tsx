import { supabase } from "@/lib/supabase";
import React from "react";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";

const Home = () => {
  const [userInfo, setUserInfo] = useState<{
    name: string;
    email: string;
    dateofbirth: string;
    gender: string;
    clusterid: string;
  } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  console.log('User login: ' + 'Email: ' + userInfo?.email + ', Name: ' +  userInfo?.name)
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        // Lấy thông tin session hiện tại
        const { data: session, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) throw sessionError;

        const userId = session?.session?.user?.id;
        if (!userId) {
          throw new Error("Người dùng chưa đăng nhập");
        }

        // Truy xuất thông tin từ bảng public.account
        const { data: accountData, error: accountError } = await supabase
          .from("account")
          .select("accountid, email")
          .eq("accountid", userId)
          .single();

        if (accountError) throw accountError;

        const accountId = accountData.accountid;

        // Truy xuất thông tin từ bảng public.user
        const { data: userData, error: userError } = await supabase
          .from("user")
          .select("name, dateofbirth, gender, clusterid")
          .eq("accountid", accountId)
          .single();

        if (userError) throw userError;

        setUserInfo({
          name: userData.name,
          email: accountData.email, // Email lấy từ bảng public.account
          dateofbirth: userData.dateofbirth,
          gender: userData.gender,
          clusterid: userData.clusterid,
        });
        // check user infor
        
      } catch (error: any) {
        console.error("Lỗi:", error.message);
        setUserInfo(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    
    <View style={styles.container}>
      <Text style={styles.title}>HOME</Text>
      {userInfo ? (
        <>
          <Text style={styles.info}>Tên: {userInfo.name}</Text>
          <Text style={styles.info}>Email: {userInfo.email}</Text>
          <Text style={styles.info}>Ngày sinh: {userInfo.dateofbirth}</Text>
          <Text style={styles.info}>Giới tính: {userInfo.gender}</Text>
          <Text style={styles.info}>Cụm: {userInfo.clusterid}</Text>
        </>
      ) : (
        <Text style={styles.info}>Không tìm thấy thông tin người dùng</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  info: { fontSize: 16, marginVertical: 5 },
});

export default Home;