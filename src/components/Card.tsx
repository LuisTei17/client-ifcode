import React from "react";
import Image from "next/image";

const Card = () => {
  return (
    <div className="card">
      <div className="contCard">
        <div className="avatar">
          <Image className="img" src="/icons/mall.jpeg" alt="" width={60} height={60} />
        
      </div>

      <div className="card-tag">Suporte ao médico</div>

      <h3 className="card-title">Transporte ao Médico</h3>
      <p className="card-description">
        Precisa dirigir para a consulta com o médico? Eu ajudo, um bom transporte para suas consultas
        appointments.
      </p>

      <div className="card-info">
        <p><strong>Linda Silveira</strong> (52)</p>
        <p>Esteio</p>
        <p>Segunda-Sexta 8:00 às 16:00</p>
      </div>

      <button className="card-btn">
        <Image src="/icons/phone.png" alt="" width={16} height={16} /> Entrar em Contato

      </button>
      </div>
    </div>
  );
};

export default Card;
