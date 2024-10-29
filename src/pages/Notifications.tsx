import React from 'react';
import { Bell, MessageSquare, Heart, UserPlus } from 'lucide-react';

export function Notifications() {
  const notifications = [
    {
      id: 1,
      type: 'reply',
      message: 'John Doe replied to your post',
      time: '2 hours ago',
      icon: MessageSquare,
      color: 'text-blue-500',
    },
    {
      id: 2,
      type: 'like',
      message: 'Jane Smith liked your comment',
      time: '4 hours ago',
      icon: Heart,
      color: 'text-red-500',
    },
    {
      id: 3,
      type: 'follow',
      message: 'Alex Johnson started following you',
      time: '1 day ago',
      icon: UserPlus,
      color: 'text-green-500',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Bell className="h-8 w-8 text-yellow-500" />
        <h1 className="text-2xl font-bold text-gray-100">Notifications</h1>
      </div>

      <div className="rounded-lg border border-gray-800 bg-gray-800/50 backdrop-blur-sm">
        {notifications.map((notification) => {
          const Icon = notification.icon;
          return (
            <div
              key={notification.id}
              className="flex items-start gap-4 border-b border-gray-700 p-4 last:border-0"
            >
              <Icon className={`h-5 w-5 ${notification.color}`} />
              <div className="flex-1">
                <p className="text-gray-100">{notification.message}</p>
                <span className="text-sm text-gray-400">{notification.time}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}