export interface User {
  id: string;
  username: string;
  name: string;
  avatar: string;
  bio?: string;
  followersCount: number;
  followingCount: number;
  postsCount: number;
}

export interface Comment {
  id: string;
  userId: string;
  username: string;
  avatar: string;
  text: string;
  timestamp: Date;
}

export interface Post {
  id: string;
  userId: string;
  username: string;
  avatar: string;
  imageUri: string;
  caption: string;
  likes: number;
  isLiked: boolean;
  comments: Comment[];
  timestamp: Date;
  location?: string;
}

export type RootStackParamList = {
  MainTabs: undefined;
  Profile: { userId: string };
  Comments: { postId: string };
  NewPost: undefined;
  EditProfile: undefined;
};

export type MainTabParamList = {
  Feed: undefined;
  Search: undefined;
  Camera: undefined;
  Notifications: undefined;
  MyProfile: undefined;
};
