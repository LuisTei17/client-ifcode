'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut, Users, Home } from 'lucide-react';

export default function Navigation() {
  const { user, logout, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link href="/dashboard" className="flex items-center space-x-2 text-xl font-bold text-gray-900">
              <Home className="h-6 w-6" />
              <span>IFCode</span>
            </Link>
            <div className="flex space-x-4">
              <Link
                href="/dashboard"
                className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              >
                <Home className="h-4 w-4" />
                <span>Dashboard</span>
              </Link>
              <Link
                href="/users"
                className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              >
                <Users className="h-4 w-4" />
                <span>Users</span>
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-700">Welcome, {user?.name}</span>
            <button
              onClick={logout}
              className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}