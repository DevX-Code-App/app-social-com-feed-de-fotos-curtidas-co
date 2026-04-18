import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Text,
  RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { PostCard } from '../components/PostCard';
import { posts as initialPosts, users } from '../data/mockData';
import { Post, RootStackParamList } from '../types';

type NavigationProp = StackNavigationProp<RootStackParamList>;

export const FeedScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [refreshing, setRefreshing] = useState(false);

  const handleLike = (postId: string) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            isLiked: !post.isLiked,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          };
        }
        return post;
      })
    );
  };

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.logo}>SocialApp</Text>
      <View style={styles.headerIcons}>
        <TouchableOpacity
          style={styles.headerIcon}
          onPress={() => navigation.navigate('Camera')}
        >
          <Ionicons name="add-circle-outline" size={28} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerIcon}>
          <Ionicons name="heart-outline" size={28} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerIcon}>
          <Ionicons name="paper-plane-outline" size={28} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderStories = () => (
    <View style={styles.storiesContainer}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={users}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.stories}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.story}>
            <View style={styles.storyImageContainer}>
              <Image source={{ uri: item.avatar }} style={styles.storyImage} />
            </View>
            <Text style={styles.storyUsername} numberOfLines={1}>
              {item.username}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {renderHeader()}
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PostCard post={item} onLike={handleLike} />
        )}
        ListHeaderComponent={renderStories}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      />
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
  logo: {
    fontSize: 26,
    fontWeight: '700',
    fontFamily: 'System',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  headerIcon: {
    marginLeft: 20,
  },
  storiesContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#efefef',
    paddingVertical: 10,
  },
  stories: {
    paddingHorizontal: 10,
  },
  story: {
    alignItems: 'center',
    marginHorizontal: 6,
    width: 70,
  },
  storyImageContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 3,
    borderColor: '#e1306c',
    padding: 2,
    marginBottom: 5,
  },
  storyImage: {
    width: '100%',
    height: '100%',
    borderRadius: 32,
  },
  storyUsername: {
    fontSize: 12,
    textAlign: 'center',
  },
});
