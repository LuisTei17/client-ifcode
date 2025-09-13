import { useEffect } from 'react';
import { useRouter } from 'next/router';
import AuthGuard from '../components/AuthGuard';

const Dashboard = () => {
  const router = useRouter();

  useEffect(() => {
    // Logic to check if the user is authenticated
    const isAuthenticated = /* logic to check authentication */;
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [router]);

  return (
    <AuthGuard>
      <div>
        <h1>Dashboard</h1>
        <p>Welcome to your dashboard!</p>
      </div>
    </AuthGuard>
  );
};

export default Dashboard;