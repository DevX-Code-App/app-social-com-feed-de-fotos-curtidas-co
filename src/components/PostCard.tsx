import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Share,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Post } from '../types';
import { timeAgo } from '../utils/timeAgo';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import * as Sharing from 'expo-sharing';

const { width } = Dimensions.get('window');

type NavigationProp = StackNavigationProp<RootStackParamList>;

interface PostCardProps {
  post: Post;
  onLike: (postId: string) => void;
}

export const PostCard: React.FC<PostCardProps> = ({ post, onLike }) => {
  const navigation = useNavigation<NavigationProp>();
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleShare = async () => {
    try {
      const isAvailable = await Sharing.isAvailableAsync();
      
      if (isAvailable) {
        // Em um app real, você compartilharia a imagem
        await Share.share({
          message: `Check out this post by @${post.username}: ${post.caption}`,
          title: 'Share Post',
        });
      } else {
        await Share.share({
          message: `Check out this post by @${post.username}: ${post.caption}`,
          title: 'Share Post',
        });
      }
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  const navigateToProfile = () => {
    navigation.navigate('Profile', { userId: post.userId });
  };

  const navigateToComments = () => {
    navigation.navigate('Comments', { postId: post.id });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.userInfo}
          onPress={navigateToProfile}
        >
          <Image source={{ uri: post.avatar }} style={styles.avatar} />
          <View>
            <Text style={styles.username}>{post.username}</Text>
            {post.location && (
              <Text style={styles.location}>{post.location}</Text>
            )}
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="ellipsis-vertical" size={20} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Image */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: post.imageUri }}
          style={styles.image}
          onLoad={() => setImageLoaded(true)}
        />
        {!imageLoaded && (
          <View style={styles.imagePlaceholder}>
            <Ionicons name="image-outline" size={50} color="#ccc" />
          </View>
        )}
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        <View style={styles.leftActions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => onLike(post.id)}
          >
            <Ionicons
              name={post.isLiked ? 'heart' : 'heart-outline'}
              size={28}
              color={post.isLiked ? '#ff3b30' : '#000'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={navigateToComments}
          >
            <Ionicons name="chatbubble-outline" size={26} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
            <Ionicons name="paper-plane-outline" size={26} color="#000" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <Ionicons name="bookmark-outline" size={26} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Likes */}
      <TouchableOpacity style={styles.likesContainer}>
        <Text style={styles.likes}>
          {post.likes.toLocaleString()} {post.likes === 1 ? 'like' : 'likes'}
        </Text>
      </TouchableOpacity>

      {/* Caption */}
      <View style={styles.captionContainer}>
        <Text style={styles.caption}>
          <Text style={styles.username}>{post.username}</Text> {post.caption}
        </Text>
      </View>

      {/* Comments */}
      {post.comments.length > 0 && (
        <TouchableOpacity onPress={navigateToComments}>
          <Text style={styles.viewComments}>
            View all {post.comments.length} comments
          </Text>
        </TouchableOpacity>
      )}

      {/* Timestamp */}
      <Text style={styles.timestamp}>{timeAgo(post.timestamp)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    marginRight: 10,
  },
  username: {
    fontWeight: '600',
    fontSize: 14,
  },
  location: {
    fontSize: 12,
    color: '#666',
  },
  imageContainer: {
    width: width,
    height: width,
    backgroundColor: '#f0f0f0',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingTop: 8,
  },
  leftActions: {
    flexDirection: 'row',
  },
  actionButton: {
    marginRight: 15,
  },
  likesContainer: {
    paddingHorizontal: 12,
    paddingTop: 4,
  },
  likes: {
    fontWeight: '600',
    fontSize: 14,
  },
  captionContainer: {
    paddingHorizontal: 12,
    paddingTop: 4,
  },
  caption: {
    fontSize: 14,
    lineHeight: 18,
  },
  viewComments: {
    color: '#999',
    fontSize: 14,
    paddingHorizontal: 12,
    paddingTop: 4,
  },
  timestamp: {
    color: '#999',
    fontSize: 11,
    paddingHorizontal: 12,
    paddingTop: 4,
    paddingBottom: 12,
    textTransform: 'uppercase',
  },
});
