import { useState, useCallback } from 'react';
import { Post, Comment } from '../types';
import { posts as initialPosts } from '../data/mockData';

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>(initialPosts);

  const likePost = useCallback((postId: string) => {
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
  }, []);

  const addComment = useCallback((postId: string, comment: Comment) => {
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
  }, []);

  const deleteComment = useCallback((postId: string, commentId: string) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            comments: post.comments.filter((c) => c.id !== commentId),
          };
        }
        return post;
      })
    );
  }, []);

  const deletePost = useCallback((postId: string) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
  }, []);

  const addPost = useCallback((post: Post) => {
    setPosts((prevPosts) => [post, ...prevPosts]);
  }, []);

  const getPostById = useCallback(
    (postId: string) => {
      return posts.find((post) => post.id === postId);
    },
    [posts]
  );

  const getUserPosts = useCallback(
    (userId: string) => {
      return posts.filter((post) => post.userId === userId);
    },
    [posts]
  );

  return {
    posts,
    likePost,
    addComment,
    deleteComment,
    deletePost,
    addPost,
    getPostById,
    getUserPosts,
  };
};
