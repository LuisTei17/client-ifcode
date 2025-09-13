import { useEffect, useState } from 'react';
import AuthGuard from '../components/AuthGuard';
import { decodeToken } from '../utils/jwt';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const Reservas = () => {
  const [reservas, setReservas] = useState<any[]>([]);

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (!token) return;
    const user = decodeToken(token) as { sub?: number };
    if (!user?.sub) return;
    fetch(`${API_URL}/visitas?id_idoso=${user.sub}`, { credentials: 'include' })
      .then(res => res.json())
      .then(data => setReservas(Array.isArray(data) ? data : []));
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Deseja realmente cancelar essa reserva?')) return;
    const res = await fetch(`${API_URL}/visitas/${id}`, { method: 'DELETE', credentials: 'include' });
    if (res.ok) {
      setReservas(r => r.filter(x => x.id !== id));
    } else {
      alert('Erro ao deletar reserva');
    }
  };

  return (
    <AuthGuard>
      <div className="container">
        <h1>Minhas Reservas</h1>
        {reservas.length === 0 && <p>Você não possui reservas.</p>}
        <ul>
          {reservas.map(r => (
            <li key={r.id} style={{ marginBottom: 12 }}>
              <strong>{r.datahora_inicio}</strong> - Status: {r.status}
              <div style={{ marginTop: 6 }}>
                <button onClick={() => handleDelete(r.id)} style={{ marginLeft: 8 }}>Excluir</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </AuthGuard>
  );
};

export default Reservas;
