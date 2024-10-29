import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface PostFormProps {
  onSubmit: (content: string) => void;
  placeholder?: string;
  buttonText?: string;
}

export function PostForm({ onSubmit, placeholder = "What's on your mind?", buttonText = "Post" }: PostFormProps) {
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onSubmit(content);
      setContent('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex gap-2">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={placeholder}
          className="flex-1 resize-none rounded-lg border border-gray-700 bg-gray-800 p-4 text-gray-100 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          rows={3}
        />
        <button
          type="submit"
          disabled={!content.trim()}
          className="self-end rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
        >
          <Send className="h-5 w-5" />
          <span className="sr-only">{buttonText}</span>
        </button>
      </div>
    </form>
  );
}