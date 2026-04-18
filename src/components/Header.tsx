import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface HeaderProps {
  title?: string;
  leftIcon?: keyof typeof Ionicons.glyphMap;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  onLeftPress?: () => void;
  onRightPress?: () => void;
  showBackButton?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  leftIcon,
  rightIcon,
  onLeftPress,
  onRightPress,
  showBackButton = false,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.iconButton}
        onPress={onLeftPress}
        disabled={!onLeftPress}
      >
        {leftIcon && <Ionicons name={leftIcon} size={28} color="#000" />}
        {showBackButton && <Ionicons name="arrow-back" size={28} color="#000" />}
      </TouchableOpacity>

      {title && <Text style={styles.title}>{title}</Text>}

      <TouchableOpacity
        style={styles.iconButton}
        onPress={onRightPress}
        disabled={!onRightPress}
      >
        {rightIcon && <Ionicons name={rightIcon} size={28} color="#000" />}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#efefef',
    backgroundColor: '#fff',
  },
  iconButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
});
