import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { AppProvider } from './src/context/AppContext';
import { FeedScreen } from './src/screens/FeedScreen';
import { SearchScreen } from './src/screens/SearchScreen';
import { CameraScreen } from './src/screens/CameraScreen';
import { NotificationsScreen } from './src/screens/NotificationsScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { CommentsScreen } from './src/screens/CommentsScreen';
import { NewPostScreen } from './src/screens/NewPostScreen';
import { EditProfileScreen } from './src/screens/EditProfileScreen';
import { RootStackParamList, MainTabParamList } from './src/types';

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'Feed') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Search') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'Camera') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
          } else if (route.name === 'Notifications') {
            iconName = focused ? 'heart' : 'heart-outline';
          } else if (route.name === 'MyProfile') {
            iconName = focused ? 'person' : 'person-outline';
          } else {
            iconName = 'help-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: '#666',
        tabBarShowLabel: false,
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: '#efefef',
          backgroundColor: '#fff',
          height: 50,
        },
      })}
    >
      <Tab.Screen name="Feed" component={FeedScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen
        name="Camera"
        component={CameraScreen}
        options={{
          tabBarButton: () => null, // Esconde do tab bar pois será uma modal
        }}
      />
      <Tab.Screen name="Notifications" component={NotificationsScreen} />
      <Tab.Screen
        name="MyProfile"
        component={ProfileScreen}
        options={{ title: 'Profile' }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppProvider>
        <NavigationContainer>
          <StatusBar style="dark" />
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              presentation: 'card',
            }}
          >
            <Stack.Screen name="MainTabs" component={MainTabs} />
            <Stack.Screen
              name="Profile"
              component={ProfileScreen}
              options={{
                presentation: 'card',
              }}
            />
            <Stack.Screen
              name="Comments"
              component={CommentsScreen}
              options={{
                presentation: 'modal',
              }}
            />
            <Stack.Screen
              name="Camera"
              component={CameraScreen}
              options={{
                presentation: 'fullScreenModal',
              }}
            />
            <Stack.Screen
              name="NewPost"
              component={NewPostScreen}
              options={{
                presentation: 'card',
              }}
            />
            <Stack.Screen
              name="EditProfile"
              component={EditProfileScreen}
              options={{
                presentation: 'card',
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </AppProvider>
    </GestureHandlerRootView>
  );
}
