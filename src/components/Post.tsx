import React, { useState } from 'react';
import { MessageCircle, Clock, ThumbsUp, Share2 } from 'lucide-react';
import type { Post as PostType, Reply } from '../types';
import { PostForm } from './PostForm';

interface PostProps {
  post: PostType;
  onReply: (postId: string, content: string) => void;
}

export function Post({ post, onReply }: PostProps) {
  const [showReplyForm, setShowReplyForm] = useState(false);

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="rounded-lg border border-gray-800 bg-gray-800/50 p-6 backdrop-blur-sm">
      <div className="space-y-4">
        <div className="space-y-2">
          <p className="text-gray-100">{post.content}</p>
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {formatDate(post.timestamp)}
            </span>
            <div className="flex gap-4">
              <button className="flex items-center gap-1 text-gray-400 transition-colors hover:text-blue-500">
                <ThumbsUp className="h-4 w-4" />
                Like
              </button>
              <button
                onClick={() => setShowReplyForm(!showReplyForm)}
                className="flex items-center gap-1 text-gray-400 transition-colors hover:text-blue-500"
              >
                <MessageCircle className="h-4 w-4" />
                {post.replies.length > 0 ? `${post.replies.length} replies` : 'Reply'}
              </button>
              <button className="flex items-center gap-1 text-gray-400 transition-colors hover:text-blue-500">
                <Share2 className="h-4 w-4" />
                Share
              </button>
            </div>
          </div>
        </div>

        {showReplyForm && (
          <div className="mt-4">
            <PostForm
              onSubmit={(content) => {
                onReply(post.id, content);
                setShowReplyForm(false);
              }}
              placeholder="Write a reply..."
              buttonText="Reply"
            />
          </div>
        )}

        {post.replies.length > 0 && (
          <div className="mt-4 space-y-4 border-l-2 border-gray-700 pl-4">
            {post.replies.map((reply: Reply) => (
              <div key={reply.id} className="space-y-1">
                <p className="text-gray-100">{reply.content}</p>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Clock className="h-4 w-4" />
                  {formatDate(reply.timestamp)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}