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
        <div className="logo">
          <Image src="/icons/heart.png" alt="Logo" width={40} height={40} />
        </div>
        <div className="text">
          <h1>ConnectCare</h1>
          <p>Connecting hearts, enriching lives</p>
        </div>
      </div>
    </header>
    );
};

export default Navbar;