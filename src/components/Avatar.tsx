import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface AvatarProps {
  uri: string;
  size?: number;
  hasStory?: boolean;
  isLive?: boolean;
  onPress?: () => void;
}

export const Avatar: React.FC<AvatarProps> = ({
  uri,
  size = 40,
  hasStory = false,
  isLive = false,
  onPress,
}) => {
  const borderWidth = size * 0.05;
  const innerSize = size - borderWidth * 2;

  const AvatarContent = (
    <View
      style={[
        styles.container,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth: hasStory ? 2 : 0,
          borderColor: hasStory ? '#e1306c' : 'transparent',
        },
      ]}
    >
      <Image
        source={{ uri }}
        style={[
          styles.image,
          {
            width: innerSize,
            height: innerSize,
            borderRadius: innerSize / 2,
          },
        ]}
      />
      {isLive && (
        <View style={[styles.liveBadge, { bottom: -2 }]}>
          <Ionicons name="play" size={8} color="#fff" />
        </View>
      )}
    </View>
  );

  if (onPress) {
    return <TouchableOpacity onPress={onPress}>{AvatarContent}</TouchableOpacity>;
  }

  return AvatarContent;
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    resizeMode: 'cover',
  },
  liveBadge: {
    position: 'absolute',
    backgroundColor: '#e1306c',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#fff',
  },
});
