import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

export const NewPostScreen = () => {
  const navigation = useNavigation();
  const [caption, setCaption] = useState('');
  const [location, setLocation] = useState('');
  
  // Em um app real, você receberia a imagem da tela anterior
  const imageUri = 'https://picsum.photos/seed/new/1080/1080';

  const handlePost = () => {
    if (caption.trim() === '') {
      Alert.alert('Error', 'Please add a caption');
      return;
    }

    // Aqui você enviaria o post para o backend
    Alert.alert('Success', 'Post created successfully!', [
      {
        text: 'OK',
        onPress: () => navigation.navigate('MainTabs' as never),
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New Post</Text>
        <TouchableOpacity onPress={handlePost}>
          <Text style={styles.shareButton}>Share</Text>
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <View style={styles.imageSection}>
              <Image source={{ uri: imageUri }} style={styles.image} />
            </View>

            <View style={styles.inputSection}>
              <TextInput
                style={styles.captionInput}
                placeholder="Write a caption..."
                value={caption}
                onChangeText={setCaption}
                multiline
                maxLength={2200}
              />
              <Text style={styles.charCount}>{caption.length}/2200</Text>
            </View>

            <View style={styles.optionRow}>
              <Text style={styles.optionLabel}>Add Location</Text>
              <TextInput
                style={styles.locationInput}
                placeholder="Where was this taken?"
                value={location}
                onChangeText={setLocation}
              />
            </View>

            <TouchableOpacity style={styles.optionRow}>
              <Text style={styles.optionLabel}>Tag People</Text>
              <Ionicons name="chevron-forward" size={20} color="#999" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.optionRow}>
              <Text style={styles.optionLabel}>Add Music</Text>
              <Ionicons name="chevron-forward" size={20} color="#999" />
            </TouchableOpacity>

            <View style={styles.advancedSettings}>
              <Text style={styles.sectionTitle}>Advanced Settings</Text>

              <TouchableOpacity style={styles.settingRow}>
                <Text style={styles.settingLabel}>Accessibility</Text>
                <Ionicons name="chevron-forward" size={20} color="#999" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.settingRow}>
                <Text style={styles.settingLabel}>Advanced Settings</Text>
                <Ionicons name="chevron-forward" size={20} color="#999" />
              </TouchableOpacity>

              <View style={styles.settingRow}>
                <View>
                  <Text style={styles.settingLabel}>Also post to Facebook</Text>
                  <Text style={styles.settingSubtext}>Share to Facebook</Text>
                </View>
              </View>

              <View style={styles.settingRow}>
                <View>
                  <Text style={styles.settingLabel}>Also post to Twitter</Text>
                  <Text style={styles.settingSubtext}>Share to Twitter</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#efefef',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  shareButton: {
    color: '#0095f6',
    fontSize: 16,
    fontWeight: '600',
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  imageSection: {
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#efefef',
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 8,
  },
  inputSection: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#efefef',
  },
  captionInput: {
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  charCount: {
    fontSize: 12,
    color: '#999',
    textAlign: 'right',
    marginTop: 8,
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#efefef',
  },
  optionLabel: {
    fontSize: 16,
  },
  locationInput: {
    flex: 1,
    fontSize: 16,
    textAlign: 'right',
    marginLeft: 12,
    color: '#999',
  },
  advancedSettings: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    paddingHorizontal: 16,
    paddingVertical: 8,
    color: '#666',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#efefef',
  },
  settingLabel: {
    fontSize: 16,
  },
  settingSubtext: {
    fontSize: 13,
    color: '#999',
    marginTop: 2,
  },
});
