// import Link from 'next/link';
// import { useEffect, useState } from 'react';


// const Navbar = () => {
//     const [isAuthenticated, setIsAuthenticated] = useState(false);

//     useEffect(() => {
//         const token = localStorage.getItem('token');
//         if (token) {
//             setIsAuthenticated(true);
//         }
//     }, []);

//     const handleLogout = () => {
//         localStorage.removeItem('token');
//         setIsAuthenticated(false);
//     };

//     return (
//         // <nav>
//         //     <div className="navbar">
//         //         <div className="logo">
//         //         {/* logo */}
//         //         <p><strong>CaringFOR</strong></p>
//         //         </div>
            

//         //     <div className="links">
//         //     <ul>
//         //         <li>
//         //             <Link href="/">Home</Link>
//         //         </li>
//         //         <li>
//         //             <Link href="/login">Login</Link>
//         //         </li>
//         //         <li>
//         //             <Link href="/register">Register</Link>
//         //         </li>
//         //         {isAuthenticated && (
//         //             <>
//         //                 <li>
//         //                     <Link href="/dashboard">Dashboard</Link>
//         //                 </li>
//         //                 <li>
//         //                     <button onClick={handleLogout}>Logout</button>
//         //                 </li>
//         //             </>
//         //         )}
//         //     </ul>
//         //     </div>
//         //     </div>
//         // </nav>
//     );
// };

// export default Navbar;