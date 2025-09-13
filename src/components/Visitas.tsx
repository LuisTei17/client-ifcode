
import React, { useState, useEffect } from 'react';
import '../styles/visitas.css';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function RegistrarVisita() {
  const [form, setForm] = useState({
    id_idoso: '',
    id_voluntario: '',
    id_interesse: '',
    datahora_inicio: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    await fetch(`${API_URL}/visitas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setLoading(false);
    alert('Visita registrada!');
  };

  return (
    <form onSubmit={handleSubmit} className="visitas-container">
      <h2>Registrar Nova Visita</h2>
      <label className="visitas-form-label" htmlFor="id_idoso">ID Idoso</label>
      <input id="id_idoso" name="id_idoso" className="visitas-form-input" placeholder="ID do Idoso" value={form.id_idoso} onChange={handleChange} required />

      <label className="visitas-form-label" htmlFor="id_voluntario">ID Voluntário</label>
      <input id="id_voluntario" name="id_voluntario" className="visitas-form-input" placeholder="ID do Voluntário" value={form.id_voluntario} onChange={handleChange} required />

      <label className="visitas-form-label" htmlFor="id_interesse">ID Interesse</label>
      <input id="id_interesse" name="id_interesse" className="visitas-form-input" placeholder="ID do Interesse" value={form.id_interesse} onChange={handleChange} required />

      <label className="visitas-form-label" htmlFor="datahora_inicio">Data e Hora de Início</label>
      <input id="datahora_inicio" name="datahora_inicio" className="visitas-form-input" type="datetime-local" value={form.datahora_inicio} onChange={handleChange} required />

      <button type="submit" className="visitas-form-btn" disabled={loading}>Registrar</button>
    </form>
  );
}

export function ListaVisitas({ id_usuario, id_voluntario }) {
  const [visitas, setVisitas] = useState([]);

  useEffect(() => {
    let params = [];
    if (id_usuario) params.push(`id_usuario=${id_usuario}`);
    if (id_voluntario) params.push(`id_voluntario=${id_voluntario}`);
    fetch(`${API_URL}/visitas?${params.join('&')}`)
      .then(res => res.json())
      .then(setVisitas);
  }, [id_usuario, id_voluntario]);

  return (
    <div className="visitas-container">
      <h2>Minhas Visitas</h2>
      <ul>
        {visitas.map(v => (
          <li key={v.id} className="visitas-list-item">
            {v.datahora_inicio} - Status: {v.status}
            <AtualizarStatusVisita id={v.id} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function AtualizarStatusVisita({ id }) {
  const [loading, setLoading] = useState(false);

  const atualizarStatus = async () => {
    setLoading(true);
    await fetch(`${API_URL}/visitas/${id}/status`, { method: 'PATCH' });
    setLoading(false);
    alert('Status atualizado!');
  };

  return (
    <button onClick={atualizarStatus} disabled={loading} className="visitas-status-btn">
      Atualizar Status
    </button>
  );
}
