import React, { useState } from "react";
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
import { TabView, TabBar } from "react-native-tab-view";  // Import TabView
import { Route } from 'react-native-tab-view';
import PostScreen from "./create-post-v3";
import ProfileScreen from "./profile";


// Màn hình Trang chủ
const ViewNewsfeedScreen = () => {
  const [index, setIndex] = useState(0);  // Quản lý tab hiện tại
  const [routes] = useState([
    { key: "posts", title: "Bài viết" },
    { key: "highlights", title: "Đáng chú ý" },
  ]);

  // Các màn hình hiển thị cho từng tab
  const renderScene = ({ route }: { route: Route }) => { // Binding element 'route' implicitly has an 'any' type.
    switch (route.key) {
      case "posts":
        return (
          <View style={styles.scene}>
            <Text style={styles.tabContent}>Danh sách bài viết</Text>
          </View>
        );
      case "highlights":
        return (
          <View style={styles.scene}>
            <Text style={styles.tabContent}>Nội dung đáng chú ý</Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
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
            <BubbleChatIcon />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <FilterIcon />
          </TouchableOpacity>
        </View>
      </View>

      {/* TabView */}
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}  // Thay đổi tab khi chọn
        renderTabBar={(props) => (
          <TabBar
            {...props}
            style={styles.tabBar}
            indicatorStyle={styles.indicator}
          />
        )}
      />
    </View>
  );
};

const EventScreen = () => (
  <View>
    <Text>Sự kiện</Text>
  </View>
);

const CreatePostScreen = () => ( 
  <PostScreen></PostScreen>
);

const NotificationScreen = () => (
  <View>
    <Text>Thông báo</Text>
  </View>
);

const ViewProfileScreen = () => (
  <ProfileScreen></ProfileScreen>
);

const Tab = createBottomTabNavigator();

const MainPage = () => {
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
        <Tab.Screen name="Trang chủ" component={ViewNewsfeedScreen} />
        <Tab.Screen name="Sự kiện" component={EventScreen} />
        <Tab.Screen name="Bài viết" component={CreatePostScreen} />
        <Tab.Screen name="Thông báo" component={NotificationScreen} />
        <Tab.Screen name="Cá nhân" component={ViewProfileScreen} />
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
  tabBar: {
    backgroundColor: "#000",
  },
  tabLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },
  indicator: {
    backgroundColor: "#000",
    height: 2,
  },
  scene: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
  },
  tabContent: {
    fontSize: 16,
    color: "#aaa",
  },
});

export default MainPage;
