
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        setIsClient(true);
        const t = localStorage.getItem('token');
        setToken(t);
        if (!t) {
            router.push('/login');
        }
    }, [router]);

    if (!isClient) return null;
    return token ? <>{children}</> : null;
};

export default AuthGuard;