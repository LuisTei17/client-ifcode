import { useState } from 'react';
import PasswordStrength from '../components/PasswordStrength';
import Nav from '../components/Nav';
import pagination from '../components/Pagination';
import Image from 'next/image';
import Pagination from '../components/Pagination';



const Profile = () =>{
    return(
    <div className="profile-page">
        
      <Nav />

      <main className="profile-container">
        
        <div className="edit-button">
                <h1>Meu Perfil</h1>
              <button type='submit'>Editar Perfil</button>
        </div>

        <div className="profile-content">
          {/* Card do usuário */}
          <div className="user-card">
            <div className="avatar">
              <Image
                src="/icons/user.png" 
                alt="Avatar"
                width={80}
                height={80}
              />
            </div>
            <h2>Usuário</h2>
            <p className='user-email'>mauricioscheffersilveira13@gmail.com</p>
            
            <button className="sign-out">Sign Out</button>
          </div>

          {/* Informações de contato */}
          <div className="info-card">
            
            <div className="section">
              <h3>Informações de Contato</h3>
              <div className="field">
                <label>Nome Completo</label>
                <input type="text" placeholder="Seu nome" />
              </div>
              <div className="field">
                <label>Email</label>
                <input type="text" placeholder="Seu Email" />
              </div>
              <div className="field">
                <label>Celular</label>
                <input type="text" placeholder="Seu número de celular" />
              </div>
              <div className="field">
                <label>Data de Nascimento</label>
                <input type="date" />
              </div>
              <div className="field">
                <label>Endereço</label>
                <input type="text" placeholder="Seu Endereço" />
              </div>
            </div>

            <div className="section">
              <h3>Sobre você</h3>
              <div className="field">
                {/* <label></label>
                <textarea placeholder="Share a bit about yourself, your interests, and what you're looking for..." /> */}
              </div>
              <div className="field">
                <label>Interesses e Hobbies</label>
                <input type="text" placeholder="Ex.: ler, cozinhar, dançar, festas..." />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Pagination></Pagination>
    </div>
    );
};

export default Profile;