
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import AuthGuard from '../components/AuthGuard';
import { decodeToken } from '../utils/jwt';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const Dashboard = () => {
  const router = useRouter();
  interface UsuarioInteresse {
    interest: {
      descricao: string;
    };
  }

  interface RankingUser {
    id: number;
    nome: string;
    idade: number;
    interesses?: string[];
    distancia?: number;
    usuarioInteresses?: UsuarioInteresse[];
    dt_nasc?: string;
    nome_usuario?: string;
  }
  const [nextUser, setNextUser] = useState<RankingUser | null>(null);
  const [loading, setLoading] = useState(false);

  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    console.log('Token:', token);
    if (!token) {
      setIsAuthenticated(false);
      return;
    }
    const user = decodeToken(token) as { sub?: number };
    console.log('Decoded user from token:', user);
    if (!user || !user.sub) {
      setIsAuthenticated(false);
      return;
    }
    setIsAuthenticated(true);
    console.log('User ID from token:', user.sub);
    setUserId(user.sub);
  }, []);

  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}/usuarios/ranking/${userId}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setNextUser(data[0] as RankingUser);
        } else {
          setNextUser(null);
        }
        setLoading(false);
      })
      .catch(() => {
        setNextUser(null);
        setLoading(false);
      });
  }, [isAuthenticated, userId]);

  const handleAgendar = async () => {
    if (!userId || !nextUser) return alert('Usuário ou próximo usuário não disponível');
    const interesseId = Array.isArray(nextUser.usuarioInteresses) && nextUser.usuarioInteresses.length > 0
      ? ((nextUser.usuarioInteresses[0] as any).interest && (nextUser.usuarioInteresses[0] as any).interest.id_interesse) || 0
      : 0;
    const payload = {
      id_idoso: userId,
      id_voluntario: nextUser.id,
      id_interesse: interesseId,
      datahora_inicio: new Date().toISOString(),
      datahora_fim: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
      status: 'reserva'
    };
    try {
      const res = await fetch(`${API_URL}/visitas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        alert('Visita criada com status reserva');
      } else {
        const err = await res.json();
        alert('Erro ao criar visita: ' + (err.message || res.statusText));
      }
    } catch (e) {
      console.error(e);
      alert('Erro ao criar visita');
    }
  };

  return (
  <AuthGuard>
      <div>
        <div className="dashboard-next-user">
          <h2 style={{ maxWidth: 900, marginTop: 100, marginBottom: 30, marginLeft:30 }}>Próximo Voluntario</h2>
          {loading && <p>Carregando...</p>}
          {!loading && nextUser ? (
            <div className="card mb-3" style={{ maxWidth: 900, marginTop: 30, marginBottom: 30, marginLeft: 30, marginRight: 30 }}>
              <div className="row g-0">
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">{nextUser.nome_usuario}</h5>
                    <p className="card-text"><small className="text-muted">Id: {nextUser.id}</small></p>
                    <p className="card-text"><strong>Idade:</strong> {nextUser.dt_nasc ? (() => {
                      const [year, month, day] = nextUser.dt_nasc.split('-').map(Number);
                      const birthDate = new Date(year, month - 1, day);
                      const today = new Date();
                      let age = today.getFullYear() - birthDate.getFullYear();
                      const m = today.getMonth() - birthDate.getMonth();
                      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                        age--;
                      }
                      return age;
                    })() : 'N/A'}</p>
                    <p className="card-text"><strong>Interesses:</strong> {nextUser.usuarioInteresses?.map(ui => (ui as any).interest?.descricao)?.join(', ')}</p>
                    <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam.</p>
                    <div className="d-flex gap-2 mt-2">
                      <button className="btn btn-primary" onClick={handleAgendar}>Agendar visita</button>
                      <button className="btn btn-outline-secondary" onClick={() => router.push(`/profile?id=${nextUser.id}`)}>Ver perfil</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : !loading && <p>Nenhum usuário encontrado.</p>}
        </div>
      </div>
    </AuthGuard>
  );
};

export default Dashboard;