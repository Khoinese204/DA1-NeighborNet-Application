import BubbleChatIcon from "@/assets/icons/ChatButton";
import FilterIcon from "@/assets/icons/FilterButton";
import BackButton from "@/components/BackButton"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, NavigationIndependentTree } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { View, Text, StyleSheet, StatusBar, TextInput, TouchableOpacity, FlatList } from "react-native"
import Icon from 'react-native-vector-icons/Ionicons';

const HomeScreen = () => (
  <View style={styles.screen}>
    <Text>Trang chủ</Text>
  </View>
);

const EventScreen = () => (
  <View style={styles.screen}>
    <Text>Sự kiện</Text>
  </View>
);

const PostScreen = () => (
  <View style={styles.screen}>
    <Text>Bài viết</Text>
  </View>
);

const NotificationScreen = () => (
  <View style={styles.screen}>
    <Text>Thông báo</Text>
  </View>
);

const ProfileScreen = () => (
  <View style={styles.screen}>
    <Text>Cá nhân</Text>
  </View>
);

const Tab = createBottomTabNavigator();


const Newsfeed = () => {
  const router = useRouter();
  return (
    <View>
      <StatusBar barStyle={"dark-content"}></StatusBar>
      <View>
        <BackButton router={router}></BackButton>
      </View>
      <View style={styles.header}>
      {/* Search Bar */}
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Tìm kiếm"
          placeholderTextColor="#aaa"
        />
      </View>

      {/* Icons */}
      <View style={styles.iconContainer}>
        <TouchableOpacity style={styles.iconButton}>
          <BubbleChatIcon></BubbleChatIcon>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <FilterIcon></FilterIcon>
        </TouchableOpacity>
      </View>
    </View>
    {/* Post View */}
    <View>
       {/* Khoảng trống để hiển thị post sau này*/}
    </View>
    {/* Bottom Tab */}
    <NavigationIndependentTree>
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: string;

            switch (route.name) {
              case 'Trang chủ':
                iconName = focused ? 'home' : 'home-outline';
                break;
              case 'Sự kiện':
                iconName = focused ? 'calendar' : 'calendar-outline';
                break;
              case 'Bài viết':
                iconName = focused ? 'add-circle' : 'add-circle-outline';
                break;
              case 'Thông báo':
                iconName = focused ? 'notifications' : 'notifications-outline';
                break;
              case 'Cá nhân':
                iconName = focused ? 'person' : 'person-outline';
                break;
              default:
                iconName = 'ellipse';
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: { height: 60 },
          tabBarLabelStyle: { fontSize: 12 },
        })}
      >
        <Tab.Screen name="Trang chủ" component={HomeScreen} />
        <Tab.Screen name="Sự kiện" component={EventScreen} />
        <Tab.Screen name="Bài viết" component={PostScreen} />
        <Tab.Screen name="Thông báo" component={NotificationScreen} />
        <Tab.Screen name="Cá nhân" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
    </NavigationIndependentTree>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#000',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  searchBarContainer: {
    flex: 1,
    marginRight: 10,
  },
  searchBar: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    fontSize: 14,
    color: '#000',
  },
  iconContainer: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 10,
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: '#fff', // Đặt màu biểu tượng thành trắng
  },
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Newsfeed;