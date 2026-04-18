import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { RootStackParamList, Comment } from '../types';
import { posts, currentUser } from '../data/mockData';
import { timeAgo } from '../utils/timeAgo';

type CommentsRouteProp = RouteProp<RootStackParamList, 'Comments'>;

export const CommentsScreen = () => {
  const route = useRoute<CommentsRouteProp>();
  const navigation = useNavigation();
  const { postId } = route.params;

  const post = posts.find((p) => p.id === postId);
  const [comments, setComments] = useState<Comment[]>(post?.comments || []);
  const [commentText, setCommentText] = useState('');

  const handleAddComment = () => {
    if (commentText.trim() === '') return;

    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      userId: currentUser.id,
      username: currentUser.username,
      avatar: currentUser.avatar,
      text: commentText,
      timestamp: new Date(),
    };

    setComments([...comments, newComment]);
    setCommentText('');
  };

  const renderComment = ({ item }: { item: Comment }) => (
    <View style={styles.commentItem}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.commentContent}>
        <Text style={styles.commentText}>
          <Text style={styles.username}>{item.username}</Text> {item.text}
        </Text>
        <View style={styles.commentFooter}>
          <Text style={styles.timestamp}>{timeAgo(item.timestamp)}</Text>
          <TouchableOpacity>
            <Text style={styles.replyButton}>Reply</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity>
        <Ionicons name="heart-outline" size={16} color="#666" />
      </TouchableOpacity>
    </View>
  );

  const renderHeader = () => {
    if (!post) return null;

    return (
      <View style={styles.postHeader}>
        <View style={styles.postInfo}>
          <Image source={{ uri: post.avatar }} style={styles.postAvatar} />
          <View style={styles.postTextContainer}>
            <Text style={styles.postCaption}>
              <Text style={styles.username}>{post.username}</Text> {post.caption}
            </Text>
            <Text style={styles.timestamp}>{timeAgo(post.timestamp)}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Comments</Text>
        <TouchableOpacity>
          <Ionicons name="paper-plane-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
        keyboardVerticalOffset={0}
      >
        <FlatList
          data={comments}
          keyExtractor={(item) => item.id}
          renderItem={renderComment}
          ListHeaderComponent={renderHeader}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />

        <View style={styles.inputContainer}>
          <Image source={{ uri: currentUser.avatar }} style={styles.inputAvatar} />
          <TextInput
            style={styles.input}
            placeholder="Add a comment..."
            value={commentText}
            onChangeText={setCommentText}
            multiline
          />
          <TouchableOpacity
            onPress={handleAddComment}
            disabled={commentText.trim() === ''}
          >
            <Text
              style={[
                styles.postButton,
                commentText.trim() === '' && styles.postButtonDisabled,
              ]}
            >
              Post
            </Text>
          </TouchableOpacity>
        </View>
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
  keyboardView: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 10,
  },
  postHeader: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#efefef',
  },
  postInfo: {
    flexDirection: 'row',
  },
  postAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  postTextContainer: {
    flex: 1,
  },
  postCaption: {
    fontSize: 14,
    lineHeight: 18,
    marginBottom: 4,
  },
  commentItem: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 12,
  },
  commentContent: {
    flex: 1,
  },
  commentText: {
    fontSize: 14,
    lineHeight: 18,
    marginBottom: 4,
  },
  username: {
    fontWeight: '600',
  },
  commentFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  timestamp: {
    fontSize: 12,
    color: '#999',
  },
  replyButton: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#efefef',
    backgroundColor: '#fff',
  },
  inputAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 14,
    maxHeight: 100,
  },
  postButton: {
    color: '#0095f6',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 12,
  },
  postButtonDisabled: {
    opacity: 0.3,
  },
});
