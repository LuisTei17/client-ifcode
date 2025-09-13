'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';
import { usersApi } from '@/lib/api';
import { ArrowLeft, User, Mail, Save } from 'lucide-react';
import Link from 'next/link';

interface User {
  id: string;
  name: string;
  email: string;
}

export default function EditUserPage() {
  const params = useParams();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState('');

  const userId = params.id as string;

  useEffect(() => {
    if (userId) {
      fetchUser();
    }
  }, [userId]);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const response = await usersApi.getUserById(userId);
      const user = response.user || response;
      setFormData({
        name: user.name || '',
        email: user.email || '',
      });
    } catch (error) {
      console.error('Error fetching user:', error);
      setError('Failed to fetch user details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email } = formData;

    if (!name || !email) {
      setError('Please fill in all fields');
      return;
    }

    setSubmitLoading(true);
    setError('');

    try {
      await usersApi.updateUser(userId, { name, email });
      router.push(`/users/${userId}`);
    } catch (error: unknown) {
      console.error('Update user error:', error);
      const errorMessage = error && typeof error === 'object' && 'response' in error 
        ? (error as { response?: { data?: { message?: string } } }).response?.data?.message 
        : 'Failed to update user. Please try again.';
      setError(errorMessage || 'Failed to update user. Please try again.');
    } finally {
      setSubmitLoading(false);
    }
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center min-h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Link
            href={`/users/${userId}`}
            className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to user details
          </Link>
          <h1 className="mt-4 text-2xl font-semibold text-gray-900">Edit User</h1>
          <p className="mt-2 text-sm text-gray-700">
            Update the user&apos;s information below.
          </p>
        </div>

        {error && !submitLoading && (
          <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
            <button
              onClick={fetchUser}
              className="ml-4 text-red-800 hover:text-red-900 underline"
            >
              Retry
            </button>
          </div>
        )}

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

            {error && submitLoading && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            <div className="flex justify-end space-x-3">
              <Link
                href={`/users/${userId}`}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={submitLoading}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitLoading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
                Save Changes
              </button>
            </div>
          </form>
        </div>

        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-md p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                Note
              </h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>
                  User passwords cannot be updated through this form for security reasons. 
                  Password changes should be handled through a separate secure process.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}