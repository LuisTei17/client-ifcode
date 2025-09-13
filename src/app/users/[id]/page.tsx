'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';
import { usersApi } from '@/lib/api';
import { ArrowLeft, Edit, Trash2, User, Mail, Calendar } from 'lucide-react';
import Link from 'next/link';

interface User {
  id: string;
  name: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
}

export default function UserDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);
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
      setUser(response.user || response);
    } catch (error) {
      console.error('Error fetching user:', error);
      setError('Failed to fetch user details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async () => {
    if (!confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      return;
    }

    try {
      setDeleteLoading(true);
      await usersApi.deleteUser(userId);
      router.push('/users');
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user. Please try again.');
    } finally {
      setDeleteLoading(false);
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

  if (error || !user) {
    return (
      <ProtectedRoute>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link
            href="/users"
            className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-8"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to users
          </Link>
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error || 'User not found.'}
            <button
              onClick={fetchUser}
              className="ml-4 text-red-800 hover:text-red-900 underline"
            >
              Retry
            </button>
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
            href="/users"
            className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to users
          </Link>
          <div className="mt-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">User Details</h1>
              <p className="mt-2 text-sm text-gray-700">
                View and manage user information.
              </p>
            </div>
            <div className="flex space-x-3">
              <Link
                href={`/users/${userId}/edit`}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Link>
              <button
                onClick={handleDeleteUser}
                disabled={deleteLoading}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {deleteLoading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                ) : (
                  <Trash2 className="h-4 w-4 mr-2" />
                )}
                Delete
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-8">
            <div className="flex items-center mb-6">
              <div className="bg-blue-100 rounded-full p-3">
                <User className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <h2 className="text-xl font-semibold text-gray-900">{user.name}</h2>
                <p className="text-gray-600">{user.email}</p>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                <div>
                  <dt className="text-sm font-medium text-gray-500 flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    Full Name
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">{user.name}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500 flex items-center">
                    <Mail className="h-4 w-4 mr-2" />
                    Email Address
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">{user.email}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500 flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    Created Date
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {user.createdAt 
                      ? new Date(user.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })
                      : 'N/A'
                    }
                  </dd>
                </div>
                {user.updatedAt && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500 flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      Last Updated
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {new Date(user.updatedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-gray-50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-900 mb-2">User ID</h3>
          <code className="text-sm text-gray-600 font-mono">{user.id}</code>
        </div>
      </div>
    </ProtectedRoute>
  );
}