
import { NavigationContainer, NavigationIndependentTree } from "@react-navigation/native"
import { useRouter } from "expo-router"
import { Button, View, Text } from "react-native"
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainPage from "./mainpagev2";
import PostsListScreen from "./view-post-3";
import UpdatePostScreen from "./update-post";
import Home from "./(main)/home";

const Stack = createNativeStackNavigator();

/*
const App = () => {
    return (
        <NavigationIndependentTree>
        <NavigationContainer>
            <Stack.Navigator>
                 <Stack.Screen
                name="Home"
                component={Home}
                options={{ headerShown: false }}
                 />
                <Stack.Screen
                    name="MainPage"
                    component={MainPage}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="PostList"
                    component={PostsListScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="UpdatePost"
                    component={UpdatePostScreen}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
        </NavigationIndependentTree>
    );
}

export default App
*/

const App = () => {
    return (
        <NavigationIndependentTree>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="MainPage" // Tên route "MainPage" khớp với navigation.navigate("MainPage")
            component={MainPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PostList"
            component={PostsListScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="UpdatePost"
            component={UpdatePostScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      </NavigationIndependentTree>
    );
  };
  
  export default App;