import React, { useState, useEffect } from 'react';
import { Post as PostComponent } from '../components/Post';
import { PostForm } from '../components/PostForm';
import type { Post } from '../types';
import { fetchPosts, createPost, createReply } from '../lib/api';

export function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPosts();
  }, []);

  async function loadPosts() {
    try {
      const data = await fetchPosts();
      setPosts(data);
    } catch (err) {
      setError('Failed to load posts');
    } finally {
      setLoading(false);
    }
  }

  const handleNewPost = async (content: string) => {
    try {
      await createPost(content);
      await loadPosts();
    } catch (err) {
      setError('Failed to create post');
    }
  };

  const handleNewReply = async (postId: string, content: string) => {
    try {
      await createReply(postId, content);
      await loadPosts();
    } catch (err) {
      setError('Failed to create reply');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-gray-400">Loading posts...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-800 bg-red-900/50 p-4 text-red-100">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <section className="rounded-lg border border-gray-800 bg-gray-800/50 p-6 backdrop-blur-sm">
        <h2 className="mb-4 text-lg font-semibold text-gray-100">
          Create vcta Post
        </h2>
        <PostForm onSubmit={handleNewPost} />
      </section>

      <section className="space-y-6">
        {posts.length === 0 ? (
          <div className="rounded-lg border border-gray-800 bg-gray-800/50 p-12 text-center backdrop-blur-sm">
            <p className="text-gray-400">
              No posts yet. Be the first to share something!
            </p>
          </div>
        ) : (
          posts.map((post) => (
            <PostComponent key={post.id} post={post} onReply={handleNewReply} />
          ))
        )}
      </section>
    </div>
  );
}
