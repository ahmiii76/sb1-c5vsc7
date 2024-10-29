import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home,
  TrendingUp,
  Users,
  Bell,
  Settings,
  MessageSquarePlus,
  Search
} from 'lucide-react';

export function Navbar() {
  return (
    <nav className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-gray-800 bg-gray-900 p-4">
      <div className="flex items-center gap-2 px-2 pb-8">
        <MessageSquarePlus className="h-8 w-8 text-blue-500" />
        <h1 className="text-xl font-bold text-gray-100">DevSpace</h1>
      </div>

      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search..."
          className="w-full rounded-lg bg-gray-800 px-4 py-2 pl-10 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
      </div>

      <div className="space-y-1">
        <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <Home className="h-5 w-5" />
          Home
        </NavLink>
        <NavLink to="/trending" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <TrendingUp className="h-5 w-5" />
          Trending
        </NavLink>
        <NavLink to="/communities" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <Users className="h-5 w-5" />
          Communities
        </NavLink>
        <NavLink to="/notifications" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <Bell className="h-5 w-5" />
          Notifications
        </NavLink>
        <NavLink to="/settings" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <Settings className="h-5 w-5" />
          Settings
        </NavLink>
      </div>
    </nav>
  );
}