import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { currentUser, posts as allPosts, users } from '../data/mockData';

const { width } = Dimensions.get('window');
const imageSize = width / 3;

type ProfileRouteProp = RouteProp<RootStackParamList, 'Profile'>;
type NavigationProp = StackNavigationProp<RootStackParamList>;

export const ProfileScreen = () => {
  const route = useRoute<ProfileRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const userId = route.params?.userId || currentUser.id;
  
  const user = users.find((u) => u.id === userId) || currentUser;
  const userPosts = allPosts.filter((post) => post.userId === userId);
  const isOwnProfile = userId === currentUser.id;

  const [activeTab, setActiveTab] = useState<'grid' | 'list'>('grid');

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={28} color="#000" />
      </TouchableOpacity>
      <Text style={styles.headerUsername}>{user.username}</Text>
      <TouchableOpacity>
        <Ionicons name="ellipsis-vertical" size={28} color="#000" />
      </TouchableOpacity>
    </View>
  );

  const renderProfileInfo = () => (
    <View>
      <View style={styles.profileHeader}>
        <Image source={{ uri: user.avatar }} style={styles.profileImage} />
        <View style={styles.statsContainer}>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>{user.postsCount}</Text>
            <Text style={styles.statLabel}>Posts</Text>
          </View>
          <TouchableOpacity style={styles.stat}>
            <Text style={styles.statNumber}>{user.followersCount}</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.stat}>
            <Text style={styles.statNumber}>{user.followingCount}</Text>
            <Text style={styles.statLabel}>Following</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.profileInfo}>
        <Text style={styles.name}>{user.name}</Text>
        {user.bio && <Text style={styles.bio}>{user.bio}</Text>}
      </View>

      <View style={styles.actionsContainer}>
        {isOwnProfile ? (
          <>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate('EditProfile')}
            >
              <Text style={styles.actionButtonText}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButtonSmall}>
              <Ionicons name="person-add-outline" size={20} color="#000" />
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity style={styles.followButton}>
              <Text style={styles.followButtonText}>Follow</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.messageButton}>
              <Text style={styles.actionButtonText}>Message</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButtonSmall}>
              <Ionicons name="person-add-outline" size={20} color="#000" />
            </TouchableOpacity>
          </>
        )}
      </View>

      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'grid' && styles.activeTab]}
          onPress={() => setActiveTab('grid')}
        >
          <Ionicons
            name="grid"
            size={24}
            color={activeTab === 'grid' ? '#000' : '#999'}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'list' && styles.activeTab]}
          onPress={() => setActiveTab('list')}
        >
          <Ionicons
            name="list"
            size={24}
            color={activeTab === 'list' ? '#000' : '#999'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {renderHeader()}
      <FlatList
        data={userPosts}
        keyExtractor={(item) => item.id}
        numColumns={3}
        ListHeaderComponent={renderProfileInfo}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.gridItem}>
            <Image source={{ uri: item.imageUri }} style={styles.gridImage} />
            <View style={styles.gridOverlay}>
              <View style={styles.gridStat}>
                <Ionicons name="heart" size={20} color="#fff" />
                <Text style={styles.gridStatText}>{item.likes}</Text>
              </View>
              <View style={styles.gridStat}>
                <Ionicons name="chatbubble" size={18} color="#fff" />
                <Text style={styles.gridStatText}>{item.comments.length}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
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
  headerUsername: {
    fontSize: 18,
    fontWeight: '600',
  },
  profileHeader: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 16,
    alignItems: 'center',
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  statsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingLeft: 20,
  },
  stat: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '600',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  profileInfo: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  bio: {
    fontSize: 14,
    lineHeight: 20,
  },
  actionsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 12,
    gap: 8,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#efefef',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  followButton: {
    flex: 1,
    backgroundColor: '#0095f6',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  followButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  messageButton: {
    flex: 1,
    backgroundColor: '#efefef',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  actionButtonSmall: {
    backgroundColor: '#efefef',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBar: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#efefef',
    marginTop: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#000',
  },
  gridItem: {
    width: imageSize,
    height: imageSize,
    padding: 1,
  },
  gridImage: {
    width: '100%',
    height: '100%',
  },
  gridOverlay: {
    position: 'absolute',
    top: 1,
    left: 1,
    right: 1,
    bottom: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 20,
    opacity: 0,
  },
  gridStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  gridStatText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
