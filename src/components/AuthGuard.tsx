import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../utils/auth'; // Assuming you have an auth context or hook

const AuthGuard = ({ children }) => {
    const router = useRouter();
    const { isAuthenticated } = useAuth(); // Replace with your authentication logic

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/login');
        }
    }, [isAuthenticated, router]);

    return isAuthenticated ? children : null;
};

export default AuthGuard;