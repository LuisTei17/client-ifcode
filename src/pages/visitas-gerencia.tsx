import { useEffect, useState } from 'react';
import AuthGuard from '../components/AuthGuard';
import { decodeToken } from '../utils/jwt';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const VisitasManage = () => {
  const [visitas, setVisitas] = useState<any[]>([]);

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (!token) return;
    const user = decodeToken(token) as { sub?: number, role?: string };
    if (!user?.sub) return;
    fetch(`${API_URL}/visitas?id_voluntario=${user.sub}`, { credentials: 'include' })
      .then(res => res.json())
      .then(data => setVisitas(Array.isArray(data) ? data : []));
  }, []);

  const updateStatus = async (id: number, status: string) => {
    const res = await fetch(`${API_URL}/visitas/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ status })
    });
    if (res.ok) {
      setVisitas(v => v.map(x => x.id === id ? { ...x, status } : x));
    } else {
      alert('Erro ao atualizar status');
    }
  };

  return (
    <AuthGuard>
      <div className="container">
        <h1>Gerenciar Visitas</h1>
        {visitas.length === 0 && <p>Nenhuma visita atribuída.</p>}
        <ul>
          {visitas.map(v => (
            <li key={v.id} style={{ marginBottom: 12 }}>
              <div><strong>Início:</strong> {v.datahora_inicio}</div>
              <div><strong>Idoso:</strong> {v.id_idoso}</div>
              <div><strong>Status:</strong> {v.status}</div>
              <div style={{ marginTop: 8 }}>
                <button onClick={() => updateStatus(v.id, 'aceita')} style={{ marginRight: 8 }}>Aceitar</button>
                <button onClick={() => updateStatus(v.id, 'rejeitado')}>Rejeitar</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </AuthGuard>
  );
};

export default VisitasManage;
