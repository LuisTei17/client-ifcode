import Link from 'next/link';
import { useEffect, useState } from 'react';
import Image from 'next/image';


const Navbar = () => {
    // const [isAuthenticated, setIsAuthenticated] = useState(false);

    // useEffect(() => {
    //     const token = localStorage.getItem('token');
    //     if (token) {
    //         setIsAuthenticated(true);
    //     }
    // }, []);

    // const handleLogout = () => {
    //     localStorage.removeItem('token');
    //     setIsAuthenticated(false);
    // };

    return (
        <header className="header">
            <div className="header-content">

                {/* Esquerda: Logo + Texto */}
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

                {/* Direita: Links */}
                <nav className="nav-links">
                    <Link href="/login" className="nav-item">
                        <span>Login
                        <Image className="icon" src="/icons/login.png" alt="Login" width={25} height={25} /></span>
                    </Link>

                    <Link href="/perfil" className="nav-item">
                        <span>Perfil
                        <Image className="icon" src="/icons/singup.png" alt="Perfil" width={25} height={25} /></span>

                    <Link href="/profile" className="nav-item">
                        <span>Perfil</span>
                        <Image className="icon" src="/icons/singup.png" alt="Perfil" width={25} height={25} />

                    </Link>
                </nav>
            </div>
        </header>
    );
};

export default Navbar;