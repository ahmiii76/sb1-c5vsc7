import React, { useState, useEffect } from 'react';
import { Users, Hash } from 'lucide-react';
import { fetchCommunities, joinCommunity } from '../lib/api';

interface Community {
  id: number;
  name: string;
  members: number;
}

export function Communities() {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadCommunities();
  }, []);

  async function loadCommunities() {
    try {
      const data = await fetchCommunities();
      setCommunities(data);
    } catch (err) {
      setError('Failed to load communities');
    } finally {
      setLoading(false);
    }
  }

  const handleJoin = async (id: number) => {
    try {
      await joinCommunity(id);
      await loadCommunities();
    } catch (err) {
      setError('Failed to join community');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-gray-400">Loading communities...</div>
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
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Users className="h-8 w-8 text-purple-500" />
        <h1 className="text-2xl font-bold text-gray-100">Communities</h1>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {communities.map((community) => (
          <div
            key={community.id}
            className="rounded-lg border border-gray-800 bg-gray-800/50 p-4 transition-transform hover:scale-105"
          >
            <div className="mb-2 flex items-center gap-2">
              <Hash className="h-5 w-5 text-purple-500" />
              <h3 className="font-semibold text-gray-100">{community.name}</h3>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-400">{community.members.toLocaleString()} members</p>
              <button
                onClick={() => handleJoin(community.id)}
                className="rounded-lg bg-purple-600 px-4 py-1 text-sm font-semibold text-white transition-colors hover:bg-purple-700"
              >
                Join
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}