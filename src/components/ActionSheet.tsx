import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export interface ActionSheetOption {
  label: string;
  icon?: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  isDestructive?: boolean;
}

interface ActionSheetProps {
  visible: boolean;
  onClose: () => void;
  options: ActionSheetOption[];
  title?: string;
}

export const ActionSheet: React.FC<ActionSheetProps> = ({
  visible,
  onClose,
  options,
  title,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <View style={styles.container}>
          {title && (
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{title}</Text>
            </View>
          )}

          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.option,
                index === 0 && title && styles.firstOption,
                index === options.length - 1 && styles.lastOption,
              ]}
              onPress={() => {
                option.onPress();
                onClose();
              }}
            >
              {option.icon && (
                <Ionicons
                  name={option.icon}
                  size={24}
                  color={option.isDestructive ? '#ff3b30' : '#000'}
                  style={styles.icon}
                />
              )}
              <Text
                style={[
                  styles.optionText,
                  option.isDestructive && styles.destructiveText,
                ]}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}

          <TouchableOpacity
            style={[styles.option, styles.cancelOption]}
            onPress={onClose}
          >
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
    padding: 10,
  },
  container: {
    backgroundColor: '#fff',
    borderRadius: 14,
    marginBottom: 10,
  },
  titleContainer: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  firstOption: {
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },
  lastOption: {
    borderBottomWidth: 0,
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
  },
  icon: {
    marginRight: 12,
  },
  optionText: {
    fontSize: 17,
    color: '#000',
  },
  destructiveText: {
    color: '#ff3b30',
  },
  cancelOption: {
    marginTop: 10,
    borderRadius: 14,
    borderBottomWidth: 0,
    justifyContent: 'center',
  },
  cancelText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#007AFF',
    textAlign: 'center',
  },
});
