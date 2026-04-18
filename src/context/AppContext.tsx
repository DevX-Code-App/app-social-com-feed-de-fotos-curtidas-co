import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, Post, Comment } from '../types';
import { currentUser as initialUser, posts as initialPosts } from '../data/mockData';

interface AppContextType {
  currentUser: User;
  posts: Post[];
  likePost: (postId: string) => void;
  addComment: (postId: string, comment: Comment) => void;
  deletePost: (postId: string) => void;
  addPost: (post: Post) => void;
  updateUserProfile: (user: Partial<User>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User>(initialUser);
  const [posts, setPosts] = useState<Post[]>(initialPosts);

  const likePost = (postId: string) => {
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

  const addComment = (postId: string, comment: Comment) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [...post.comments, comment],
          };
        }
        return post;
      })
    );
  };

  const deletePost = (postId: string) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
  };

  const addPost = (post: Post) => {
    setPosts((prevPosts) => [post, ...prevPosts]);
    setCurrentUser((prev) => ({
      ...prev,
      postsCount: prev.postsCount + 1,
    }));
  };

  const updateUserProfile = (userData: Partial<User>) => {
    setCurrentUser((prev) => ({
      ...prev,
      ...userData,
    }));

    // Update posts with new user data
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.userId === currentUser.id) {
          return {
            ...post,
            username: userData.username || post.username,
            avatar: userData.avatar || post.avatar,
          };
        }
        return post;
      })
    );
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        posts,
        likePost,
        addComment,
        deletePost,
        addPost,
        updateUserProfile,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
