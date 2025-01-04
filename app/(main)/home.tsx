import { supabase } from "@/lib/supabase";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const { data: session, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) throw sessionError;

        const userId = session?.session?.user?.id;
        if (!userId) {
          throw new Error("Người dùng chưa đăng nhập");
        }

        const { data: accountData, error: accountError } = await supabase
          .from("account")
          .select("accountid, email")
          .eq("accountid", userId)
          .single();

        if (accountError) throw accountError;

        const { data: userData, error: userError } = await supabase
          .from("user")
          .select("name, dateofbirth, gender, clusterid")
          .eq("accountid", accountData.accountid)
          .single();

        if (userError) throw userError;
        console.log('User login: ' + 'Email: ' + accountData.email + ', Name: ' +  userData.name)
        // Sau khi lấy thông tin thành công, điều hướng tới MainPage
        navigation.navigate("MainPage");
      } catch (error: any) {
        console.error("Lỗi:", error.message);
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

  return null;
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default Home;