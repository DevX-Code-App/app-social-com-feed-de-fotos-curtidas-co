import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Colors } from '../utils/constants';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
  textStyle,
  fullWidth = false,
}) => {
  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      ...styles.button,
      ...(fullWidth && { width: '100%' }),
    };

    switch (variant) {
      case 'primary':
        return { ...baseStyle, ...styles.primaryButton };
      case 'secondary':
        return { ...baseStyle, ...styles.secondaryButton };
      case 'outline':
        return { ...baseStyle, ...styles.outlineButton };
      case 'text':
        return { ...baseStyle, ...styles.textButton };
      default:
        return baseStyle;
    }
  };

  const getTextStyle = (): TextStyle => {
    const baseStyle: TextStyle = styles.buttonText;

    switch (variant) {
      case 'primary':
        return { ...baseStyle, ...styles.primaryText };
      case 'secondary':
        return { ...baseStyle, ...styles.secondaryText };
      case 'outline':
        return { ...baseStyle, ...styles.outlineText };
      case 'text':
        return { ...baseStyle, ...styles.textText };
      default:
        return baseStyle;
    }
  };

  const getSizeStyle = (): ViewStyle => {
    switch (size) {
      case 'small':
        return styles.smallButton;
      case 'large':
        return styles.largeButton;
      default:
        return styles.mediumButton;
    }
  };

  return (
    <TouchableOpacity
      style={[
        getButtonStyle(),
        getSizeStyle(),
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'primary' ? Colors.white : Colors.primary}
        />
      ) : (
        <Text style={[getTextStyle(), textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  primaryButton: {
    backgroundColor: Colors.primary,
  },
  primaryText: {
    color: Colors.white,
  },
  secondaryButton: {
    backgroundColor: Colors.secondary,
  },
  secondaryText: {
    color: Colors.white,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  outlineText: {
    color: Colors.black,
  },
  textButton: {
    backgroundColor: 'transparent',
  },
  textText: {
    color: Colors.primary,
  },
  smallButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  mediumButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  largeButton: {
    paddingVertical: 14,
    paddingHorizontal: 24,
  },
  disabled: {
    opacity: 0.5,
  },
});
