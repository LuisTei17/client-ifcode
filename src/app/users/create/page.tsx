'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';
import { usersApi } from '@/lib/api';
import { ArrowLeft, User, Mail, Lock, Save, Users } from 'lucide-react';
import Link from 'next/link';
import { UserType } from '@/lib/types';

export default function CreateUserPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    userType: '' as UserType | '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, password, userType } = formData;

    if (!name || !email || !password || !userType) {
      setError('Please fill in all fields');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await usersApi.createUser({ name, email, password, userType: userType as UserType });
      router.push('/users');
    } catch (error: unknown) {
      console.error('Create user error:', error);
      const errorMessage = error && typeof error === 'object' && 'response' in error 
        ? (error as { response?: { data?: { message?: string } } }).response?.data?.message 
        : 'Failed to create user. Please try again.';
      setError(errorMessage || 'Failed to create user. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Link
            href="/users"
            className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to users
          </Link>
          <h1 className="mt-4 text-2xl font-semibold text-gray-900">Create New User</h1>
          <p className="mt-2 text-sm text-gray-700">
            Add a new user to the system with their basic information.
          </p>
        </div>

        <div className="bg-white shadow rounded-lg">
          <form onSubmit={handleSubmit} className="px-6 py-8 space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <div className="mt-1 relative">
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  className="block w-full px-3 py-2 pl-10 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter full name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
                <User className="absolute left-3 top-2 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <div className="mt-1 relative">
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  className="block w-full px-3 py-2 pl-10 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                <Mail className="absolute left-3 top-2 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  type="password"
                  name="password"
                  id="password"
                  required
                  className="block w-full px-3 py-2 pl-10 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter password (min 6 characters)"
                  value={formData.password}
                  onChange={handleInputChange}
                  minLength={6}
                />
                <Lock className="absolute left-3 top-2 h-5 w-5 text-gray-400" />
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Password must be at least 6 characters long
              </p>
            </div>

            <div>
              <label htmlFor="userType" className="block text-sm font-medium text-gray-700">
                User Type
              </label>
              <div className="mt-1 relative">
                <select
                  name="userType"
                  id="userType"
                  required
                  className="block w-full px-3 py-2 pl-10 border border-gray-300 rounded-md shadow-sm text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white"
                  value={formData.userType}
                  onChange={handleInputChange}
                >
                  <option value="">Select user type</option>
                  <option value={UserType.ELDER}>Elder - Seeking assistance and support</option>
                  <option value={UserType.VOLUNTEER}>Volunteer - Providing help and services</option>
                </select>
                <Users className="absolute left-3 top-2 h-5 w-5 text-gray-400" />
              </div>
            </div>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            <div className="flex justify-end space-x-3">
              <Link
                href="/users"
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
                Create User
              </button>
            </div>
          </form>
        </div>
      </div>
    </ProtectedRoute>
  );
}