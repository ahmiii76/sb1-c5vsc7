import React from 'react';
import { Flame } from 'lucide-react';

export function Trending() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Flame className="h-8 w-8 text-orange-500" />
        <h1 className="text-2xl font-bold text-gray-100">Trending Discussions</h1>
      </div>
      
      <div className="rounded-lg border border-gray-800 bg-gray-800/50 p-6 backdrop-blur-sm">
        <p className="text-gray-400">Trending topics will appear here soon...</p>
      </div>
    </div>
  );
}