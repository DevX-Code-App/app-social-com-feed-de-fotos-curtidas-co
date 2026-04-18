import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { timeAgo } from '../utils/timeAgo';
import { users } from '../data/mockData';

interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'mention';
  user: typeof users[0];
  postImage?: string;
  text: string;
  timestamp: Date;
  isRead: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: 'notif-1',
    type: 'like',
    user: users[1],
    postImage: 'https://picsum.photos/seed/8/1080/1080',
    text: 'liked your post',
    timestamp: new Date(Date.now() - 3600000),
    isRead: false,
  },
  {
    id: 'notif-2',
    type: 'follow',
    user: users[2],
    text: 'started following you',
    timestamp: new Date(Date.now() - 7200000),
    isRead: false,
  },
  {
    id: 'notif-3',
    type: 'comment',
    user: users[3],
    postImage: 'https://picsum.photos/seed/8/1080/1080',
    text: 'commented: "Amazing shot! 😍"',
    timestamp: new Date(Date.now() - 10800000),
    isRead: true,
  },
  {
    id: 'notif-4',
    type: 'like',
    user: users[4],
    postImage: 'https://picsum.photos/seed/8/1080/1080',
    text: 'liked your post',
    timestamp: new Date(Date.now() - 14400000),
    isRead: true,
  },
  {
    id: 'notif-5',
    type: 'mention',
    user: users[1],
    postImage: 'https://picsum.photos/seed/9/1080/1080',
    text: 'mentioned you in a comment',
    timestamp: new Date(Date.now() - 18000000),
    isRead: true,
  },
];

export const NotificationsScreen = () => {
  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'like':
        return <Ionicons name="heart" size={20} color="#ff3b30" />;
      case 'comment':
        return <Ionicons name="chatbubble" size={20} color="#0095f6" />;
      case 'follow':
        return <Ionicons name="person-add" size={20} color="#0095f6" />;
      case 'mention':
        return <Ionicons name="at" size={20} color="#0095f6" />;
    }
  };

  const renderNotification = ({ item }: { item: Notification }) => (
    <TouchableOpacity
      style={[styles.notificationItem, !item.isRead && styles.unreadNotification]}
    >
      <View style={styles.avatarContainer}>
        <Image source={{ uri: item.user.avatar }} style={styles.avatar} />
        <View style={styles.iconBadge}>{getNotificationIcon(item.type)}</View>
      </View>

      <View style={styles.notificationContent}>
        <Text style={styles.notificationText}>
          <Text style={styles.username}>{item.user.username}</Text> {item.text}
        </Text>
        <Text style={styles.timestamp}>{timeAgo(item.timestamp)}</Text>
      </View>

      {item.postImage && (
        <Image source={{ uri: item.postImage }} style={styles.postThumbnail} />
      )}

      {item.type === 'follow' && (
        <TouchableOpacity style={styles.followButton}>
          <Text style={styles.followButtonText}>Follow</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );

  const renderHeader = () => (
    <View style={styles.headerSection}>
      <Text style={styles.sectionTitle}>New</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
      </View>

      <FlatList
        data={mockNotifications}
        keyExtractor={(item) => item.id}
        renderItem={renderNotification}
        ListHeaderComponent={renderHeader}
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
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#efefef',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
  },
  headerSection: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  unreadNotification: {
    backgroundColor: '#f8f8f8',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
  },
  iconBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  notificationContent: {
    flex: 1,
  },
  notificationText: {
    fontSize: 14,
    lineHeight: 18,
    marginBottom: 2,
  },
  username: {
    fontWeight: '600',
  },
  timestamp: {
    fontSize: 12,
    color: '#999',
  },
  postThumbnail: {
    width: 45,
    height: 45,
    borderRadius: 4,
    marginLeft: 12,
  },
  followButton: {
    backgroundColor: '#0095f6',
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 6,
    marginLeft: 12,
  },
  followButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
