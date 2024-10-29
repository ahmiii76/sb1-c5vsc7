import React from 'react';
import { Settings as SettingsIcon, Moon, Bell, Shield, User } from 'lucide-react';

export function Settings() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <SettingsIcon className="h-8 w-8 text-gray-400" />
        <h1 className="text-2xl font-bold text-gray-100">Settings</h1>
      </div>

      <div className="rounded-lg border border-gray-800 bg-gray-800/50 backdrop-blur-sm">
        <div className="border-b border-gray-700 p-4">
          <div className="mb-2 flex items-center gap-2">
            <User className="h-5 w-5 text-blue-500" />
            <h2 className="font-semibold text-gray-100">Account Settings</h2>
          </div>
          <p className="text-sm text-gray-400">Manage your account preferences and profile information</p>
        </div>

        <div className="border-b border-gray-700 p-4">
          <div className="mb-2 flex items-center gap-2">
            <Moon className="h-5 w-5 text-purple-500" />
            <h2 className="font-semibold text-gray-100">Appearance</h2>
          </div>
          <p className="text-sm text-gray-400">Customize the look and feel of the application</p>
        </div>

        <div className="border-b border-gray-700 p-4">
          <div className="mb-2 flex items-center gap-2">
            <Bell className="h-5 w-5 text-yellow-500" />
            <h2 className="font-semibold text-gray-100">Notifications</h2>
          </div>
          <p className="text-sm text-gray-400">Configure your notification preferences</p>
        </div>

        <div className="p-4">
          <div className="mb-2 flex items-center gap-2">
            <Shield className="h-5 w-5 text-green-500" />
            <h2 className="font-semibold text-gray-100">Privacy & Security</h2>
          </div>
          <p className="text-sm text-gray-400">Manage your privacy settings and security options</p>
        </div>
      </div>
    </div>
  );
}