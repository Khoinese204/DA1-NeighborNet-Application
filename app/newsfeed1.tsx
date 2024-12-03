import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, NavigationIndependentTree } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import BubbleChatIcon from "@/assets/icons/ChatButton";
import FilterIcon from "@/assets/icons/FilterButton";

const HomeScreen = () => (
    <View style={styles.container}>
    <StatusBar barStyle={"dark-content"} />
    {/* Header */}
    <View style={styles.header}>
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Tìm kiếm"
          placeholderTextColor="#aaa"
        />
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity style={styles.iconButton}>
          <BubbleChatIcon></BubbleChatIcon>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <FilterIcon></FilterIcon>
        </TouchableOpacity>
      </View>
    </View>

    {/* Tab Options */}
    <View style={styles.tabOptions}>
      <Text style={[styles.tabOption, styles.activeTab]}>Bài viết</Text>
      <Text style={styles.tabOption}>Đáng chú ý</Text>
    </View>

    {/* Placeholder for Post Content */}
    <View style={styles.postPlaceholder}>
      <Text style={{ color: "#aaa" }}>Khoảng trống hiển thị bài viết</Text>
    </View>
    </View>
  );
  
  const EventScreen = () => (
    <View>
      <Text>Sự kiện</Text>
    </View>
  );
  
  const PostScreen = () => (
    <View>
      <Text>Bài viết</Text>
    </View>
  );
  
  const NotificationScreen = () => (
    <View>
      <Text>Thông báo</Text>
    </View>
  );
  
  const ProfileScreen = () => (
    <View>
      <Text>Cá nhân</Text>
    </View>
  );
  

const Tab = createBottomTabNavigator();

const Newsfeed = () => {
  return (
    <NavigationIndependentTree>
    <NavigationContainer>
   
        {/* Bottom Tab Navigator */}
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName: string;

              switch (route.name) {
                case "Trang chủ":
                  iconName = focused ? "home" : "home-outline";
                  break;
                case "Sự kiện":
                  iconName = focused ? "calendar" : "calendar-outline";
                  break;
                case "Bài viết":
                  iconName = focused ? "add-circle" : "add-circle-outline";
                  break;
                case "Thông báo":
                  iconName = focused ? "notifications" : "notifications-outline";
                  break;
                case "Cá nhân":
                  iconName = focused ? "person" : "person-outline";
                  break;
                default:
                  iconName = "ellipse";
              }

              return <Icon name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "black",
            tabBarInactiveTintColor: "gray",
            tabBarStyle: { height: 60 }, // Thanh điều hướng dưới
            tabBarLabelStyle: { fontSize: 12 }, // Kích thước chữ tab
          })}
        >
          {/* Các Tab không có nội dung */}
          <Tab.Screen name="Trang chủ" component={HomeScreen} />
          <Tab.Screen name="Sự kiện" component={EventScreen} />
          <Tab.Screen name="Bài viết" component={PostScreen} />
          <Tab.Screen name="Thông báo" component={NotificationScreen} />
          <Tab.Screen name="Cá nhân" component={ProfileScreen} />
        </Tab.Navigator>
      
    </NavigationContainer>
    </NavigationIndependentTree>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: "#000",
  },
  searchBarContainer: {
    flex: 1,
    marginRight: 10,
  },
  searchBar: {
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    fontSize: 14,
    color: "#000",
  },
  iconContainer: {
    flexDirection: "row",
  },
  iconButton: {
    marginLeft: 10,
  },
  tabOptions: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingVertical: 10,
    backgroundColor: "#f9f9f9",
  },
  tabOption: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#aaa",
  },
  activeTab: {
    color: "#000",
    borderBottomWidth: 2,
    borderBottomColor: "#000",
  },
  postPlaceholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
  },
});

export default Newsfeed;
