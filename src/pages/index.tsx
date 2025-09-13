import React from 'react';
import Head from 'next/head';
// import Navbar from '../components/Navbar';
//import Stylesheet from '../styles/index.css';
const Home = () => {
    return (

        <body>
            <div className="container">
                <Head>
                    <title>Care!</title>
                    <meta name="description" content="Encontre Um Novo Amigo." />
                </Head>
                <nav>
                    <div className="container">
                        <img src="" alt="" />
                        <h1>ConnectCare</h1>
                        <p>Conectando corações bons</p>
                    </div>
                </nav>


                <main>
                    <div className="meio">
                        <h1>Encontre Um Novo Amigo.</h1>
                        <p>This is the homepage. Please log in or register to .</p>
                    </div>
                </main>

                {/* <footer>
                <div className="pagination">
                    <a href=""><img src="" alt="" />Inicio</a>
                    <a href=""><img src="" alt="" />Atividades</a>
                    <a href=""><img src="" alt="" />Usuário</a>
                    
                </div>
            </footer> */}
            </div>
        </body>
    );
};

export default Home;