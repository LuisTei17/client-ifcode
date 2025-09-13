import React from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';

const Home = () => {
    return (
        <div>
            <Head>
                <title>Home - Next.js PWA</title>
                <meta name="description" content="Welcome to the Next.js PWA application." />
            </Head>
            <Navbar />
            <main>
                <h1>Welcome to the Next.js PWA Application</h1>
                <p>This is the homepage. Please log in or register to continue.</p>
            </main>
        </div>
    );
};

export default Home;