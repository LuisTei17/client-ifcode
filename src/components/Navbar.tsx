import Link from 'next/link';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';


const Navbar = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    const router = useRouter();

    const handleLogout = () => {
        // remove common token keys from localStorage
        ['token', 'jwt', 'accessToken', 'access_token'].forEach(k => localStorage.removeItem(k));
        // remove cookie 'jwt' by setting expiration in the past for the current domain/path
        document.cookie = 'jwt=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        setIsAuthenticated(false);
        router.push('/');
    };

    return (
        <header className="header">
            <div className="header-content">
                <div className="brand">
                    <div className="logo">
                        <Link href="/">
                            <Image
                                className="img-logo"
                                src="/icons/Logo.svg"
                                alt="Logo"
                                width={60}
                                height={60}
                            />
                        </Link>
                    </div>
                    <div className="text">
                        <h1>ConnectCare</h1>
                        <p>Conectando Corações E Enriquecendo Vidas</p>
                    </div>
                </div>
                <nav className="nav-links">
                    {!isAuthenticated && (
                        <Link href="/login" className="nav-item">
                            <span>Login
                            <Image className="icon" src="/icons/login.png" alt="Login" width={25} height={25} /></span>
                        </Link>
                    )}
                    {isAuthenticated && (
                        <Link href="/dashboard" className="nav-item">
                            <span>Dashboard</span>
                        </Link>
                    )}
                    {isAuthenticated && (
                        <Link href="/profile" className="nav-item">
                            <span>Perfil</span>
                            <Image className="icon" src="/icons/singup.png" alt="Perfil" width={25} height={25} />
                        </Link>
                    )}
                    {isAuthenticated && (
                        <button onClick={handleLogout} className="nav-item btn-logout" style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
                            <span>Sair</span>
                        </button>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Navbar;