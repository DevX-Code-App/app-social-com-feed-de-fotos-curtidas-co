import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

type NavigationProp = StackNavigationProp<RootStackParamList>;

export const CameraScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert(
        'Permission Required',
        'Sorry, we need camera roll permissions to make this work!'
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert(
        'Permission Required',
        'Sorry, we need camera permissions to make this work!'
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleNext = () => {
    if (image) {
      navigation.navigate('NewPost');
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={32} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New Post</Text>
        <TouchableOpacity onPress={handleNext} disabled={!image}>
          <Text style={[styles.nextButton, !image && styles.nextButtonDisabled]}>
            Next
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {image ? (
          <Image source={{ uri: image }} style={styles.preview} />
        ) : (
          <View style={styles.placeholder}>
            <Ionicons name="image-outline" size={80} color="#ccc" />
            <Text style={styles.placeholderText}>
              No image selected
            </Text>
          </View>
        )}
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton} onPress={takePhoto}>
          <View style={styles.actionIconContainer}>
            <Ionicons name="camera" size={32} color="#fff" />
          </View>
          <Text style={styles.actionText}>Take Photo</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={pickImage}>
          <View style={styles.actionIconContainer}>
            <Ionicons name="images" size={32} color="#fff" />
          </View>
          <Text style={styles.actionText}>Choose from Library</Text>
        </TouchableOpacity>
      </View>

      {image && (
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => setImage(null)}
        >
          <Ionicons name="trash-outline" size={24} color="#ff3b30" />
          <Text style={styles.removeText}>Remove Image</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  nextButton: {
    color: '#0095f6',
    fontSize: 16,
    fontWeight: '600',
  },
  nextButtonDisabled: {
    opacity: 0.3,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  preview: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  placeholder: {
    alignItems: 'center',
  },
  placeholderText: {
    color: '#ccc',
    fontSize: 16,
    marginTop: 16,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: '#000',
  },
  actionButton: {
    alignItems: 'center',
  },
  actionIconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionText: {
    color: '#fff',
    fontSize: 12,
  },
  removeButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    backgroundColor: '#1a1a1a',
    gap: 8,
  },
  removeText: {
    color: '#ff3b30',
    fontSize: 16,
    fontWeight: '600',
  },
});
