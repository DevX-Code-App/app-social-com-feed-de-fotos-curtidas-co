import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Colors } from '../utils/constants';

export const CustomTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const getIconName = (routeName: string, isFocused: boolean) => {
    let iconName: keyof typeof Ionicons.glyphMap;

    switch (routeName) {
      case 'Feed':
        iconName = isFocused ? 'home' : 'home-outline';
        break;
      case 'Search':
        iconName = isFocused ? 'search' : 'search-outline';
        break;
      case 'Camera':
        iconName = isFocused ? 'add-circle' : 'add-circle-outline';
        break;
      case 'Notifications':
        iconName = isFocused ? 'heart' : 'heart-outline';
        break;
      case 'MyProfile':
        iconName = isFocused ? 'person' : 'person-outline';
        break;
      default:
        iconName = 'help-outline';
    }

    return iconName;
  };

  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        // Skip Camera tab (will be handled differently)
        if (route.name === 'Camera') {
          return null;
        }

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tab}
          >
            <Ionicons
              name={getIconName(route.name, isFocused)}
              size={26}
              color={isFocused ? Colors.black : Colors.gray}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    height: 50,
    paddingBottom: 0,
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
