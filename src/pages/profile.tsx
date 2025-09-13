import { useState, useEffect } from 'react';
const API_URL = process.env.NEXT_PUBLIC_API_URL;
import PasswordStrength from '../components/PasswordStrength';
import Navbar from '../components/Navbar';
import Image from 'next/image';



const Profile = () => {

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  // Always sync form and interests with user data when user changes (after fetch/save)
  useEffect(() => {
    if (user) {
      setForm({ ...user });
      let interessesArr: string[] = [];
      if (Array.isArray(user.interesses)) {
        if (typeof user.interesses[0] === 'object' && user.interesses[0] !== null) {
          interessesArr = user.interesses.map((i: any) => String(i.id_interesse ?? i.id));
        } else {
          interessesArr = user.interesses.map((i: any) => String(i));
        }
      }
      setInteresses(interessesArr);
    }
  }, [user]);
  const [form, setForm] = useState<any>({});
  // Multiselect states
  const [listaInteresses, setListaInteresses] = useState<{ id_interesse: number; descricao: string }[]>([]);
  const [interesses, setInteresses] = useState<string[]>([]);
  // Fetch interests list from backend
  useEffect(() => {
    const fetchInteresses = async () => {
      try {
  const res = await fetch('/interesses', { credentials: 'include' });
        if (res.ok) {
          let data = await res.json();
          setListaInteresses(data);
        }
      } catch (err) {
        // erro
      }
    };
    fetchInteresses();
  }, []);


  useEffect(() => {
    const fetchUser = async () => {
      try {
        console.log('API_URL:', API_URL);
        const res = await fetch('/auth/profile', {
          credentials: 'include',
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data);
          setForm({ ...data });
          // Normalize interesses to string[] of ids
          let interessesArr: string[] = [];
          if (Array.isArray(data.interesses)) {
            if (typeof data.interesses[0] === 'object' && data.interesses[0] !== null) {
              interessesArr = data.interesses.map((i: any) => String(i.id_interesse ?? i.id));
            } else {
              interessesArr = data.interesses.map((i: any) => String(i));
            }
          }
          setInteresses(interessesArr);
        }
      } catch (err) {
        console.error('Erro ao buscar perfil:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (loading) return <div>Carregando...</div>;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Multiselect handler
  const handleInteressesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const values = Array.from(e.target.selectedOptions).map(opt => opt.value);
    setInteresses(values);
  };

  const handleSave = async () => {
    try {
      // Send interesses as array of numbers
      const interessesIds = Array.isArray(interesses)
        ? interesses.map(id => Number(id)).filter(id => !isNaN(id) && id > 0)
        : [];
      const payload = { ...form, interesses: interessesIds };
      const res = await fetch('/auth/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data);
        setEditMode(false);
      }
    } catch (err) {
      // erro
    }
  };

  return (
    <div className="profile-page">
      <Navbar />
      <main className="profile-container">
        <div className="edit-button">
          <h1>Meu Perfil</h1>
          {editMode ? (
            <button type="button" onClick={handleSave}>Salvar</button>
          ) : (
            <button type="button" onClick={() => {
              // When entering edit mode, ensure form and interests are up to date
              if (user) {
                setForm({ ...user });
                let interessesArr: string[] = [];
                if (Array.isArray(user.interesses)) {
                  if (typeof user.interesses[0] === 'object' && user.interesses[0] !== null) {
                    interessesArr = user.interesses.map((i: any) => String(i.id_interesse ?? i.id));
                  } else {
                    interessesArr = user.interesses.map((i: any) => String(i));
                  }
                }
                setInteresses(interessesArr);
              }
              setEditMode(true);
            }}>Editar Perfil</button>
          )}
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
            <h2>{form?.nome || 'Usuário'}</h2>
            <p>{form?.email}</p>
            <button className="sign-out">Sign Out</button>
          </div>
          {/* Informações de contato */}
          <div className="info-card">
            <div className="section">
              <h3>Informações de Contato</h3>
              <div className="field">
                <label>Nome Completo</label>
                <input name="nome" type="text" value={form?.nome || ''} onChange={handleChange} readOnly={!editMode} />
              </div>
              <div className="field">
                <label>Email</label>
                <input name="email" type="text" value={form?.email || ''} onChange={handleChange} readOnly={!editMode} />
              </div>
              <div className="field">
                <label>Celular</label>
                <input name="telefone" type="text" value={form?.telefone || ''} onChange={handleChange} readOnly={!editMode} />
              </div>
              <div className="field">
                <label>Data de Nascimento</label>
                <input name="dataNascimento" type="date" value={form?.dataNascimento ? form.dataNascimento.substring(0,10) : ''} onChange={handleChange} readOnly={!editMode} />
              </div>
              <div className="field">
                <label>Endereço</label>
                <input name="endereco" type="text" value={form?.endereco || ''} onChange={handleChange} readOnly={!editMode} />
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
                {editMode ? (
                  <select
                    name="interesses"
                    multiple
                    value={interesses}
                    onChange={handleInteressesChange}
                    style={{ minHeight: 120 }}
                  >
                    {listaInteresses.length === 0 && (
                      <option disabled>Nenhum interesse disponível</option>
                    )}
                    {listaInteresses.map((interesse) => (
                      <option key={String(interesse.id_interesse)} value={String(interesse.id_interesse)}>{interesse.descricao}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    name="interesses"
                    type="text"
                    value={Array.isArray(interesses) && listaInteresses.length > 0
                      ? listaInteresses.filter(i => interesses.includes(String(i.id_interesse))).map(i => i.descricao).join(', ')
                      : (Array.isArray(form?.interesses) ? form.interesses.join(', ') : (form?.interesses || ''))}
                    readOnly
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;