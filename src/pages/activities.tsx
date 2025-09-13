import React from "react";
import Image from "next/image";
import Nav from "components/Nav";
import Footer from "components/Footer";
import Pagination from "components/Pagination";

const Activities = () => {
  const activities = [
    {
      id: 1,
      title: "Conversas e Histórias",
      category: "Companherismo",
      description: "Encontre-se comigo às terças para um bate-papo",
      img: "/icons/cha.jpeg",
      featured: true,
    },
    {
      id: 2,
      title: "Assistente de Mercado e Compras",
      category: "Compras",
      description: "Te ajudo com compras em shopping, lojas e mercados.",
      img: "/icons/mall.jpeg",
      featured: true,
    },
    {
      id: 3,
      title: "Ajudante em Tecnologia",
      category: "Tecnologia",
      description: "Problemas com seu celular, tablet ou computador? Eu vou ajudar!",
      img: "/icons/ti.jpeg",
      featured: true,
    },
  ];

  return (
    <>
    <Nav></Nav>
    <div className="activities-page">
        <div className="top">
      <div className="headerAct">
        <h1>Navegar em Atividades</h1>
        <p>Encontre caminhos para se conectar com voluntários em sua comunidade</p>
      </div>

      <div className="filters-box">
        <input
          type="text"
          placeholder="Pesquisar atividades, voluntários, lugares..."
        />
        <select>
          <option>Todas as Categorias</option>
          <option>Compras</option>
          <option>Tecnologia</option>
          <option>Companhia</option>
        </select>
      </div>
      </div>

      {/* <div className="results-count">
        <span>10 atividades encontradas</span>
      </div> */}

      
      <div className="cards-grid">
        {activities.map((act) => (
          <div key={act.id} className="card">
            <div className="card-image">
              <Image
                src={act.img}
                alt={act.title}
                width={300}
                height={150}
                className="img"
              />
              
            </div>
            <div className="card-body">
              <span className="category">{act.category}</span>
              <h3>{act.title}</h3>
              <p>{act.description}</p>
              <button className="contact-btn">Entrar em Contato</button>
            </div>
          </div>
        ))}
      </div>
      <Pagination></Pagination>
    </div>
    <Footer></Footer>
     </>
  );
};

export default Activities;
