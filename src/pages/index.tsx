import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Card from '../components/Card';
import Navbar from '../components/Navbar';
import Pagination from '../components/Pagination';
import Footer from '../components/Footer';


const Index = () => {
    return (

        <><Navbar></Navbar>
        <div className="container">
            <Head>
                <title>Care!</title>
                <meta name="description" content="Encontre Um Novo Amigo." />
            </Head>

            <main>
                <div className="caixa-texto">
                    <h1>Encontre Um Novo Amigo.</h1>
                    <p>Pronto para encontrar conexões significativas hoje?</p>
                </div>

                <div className="search">
                    <input type="text" placeholder="Procure por atividades e voluntários" />
                    <button>
                        <Image src="/icons/search.png" alt="Search" width={20} height={20} />
                    </button>
                </div>

                <div className="card-titulo">
                    <h2>Recomendados Para Você</h2>
                    <a href="">Ver Todos</a>
                </div>

                <div className="box-card">
                    <Card/>
                </div>
            </main>

            
            <Pagination></Pagination>
        </div>
        <Footer></Footer>
        </>
    );
};

export default Index;
