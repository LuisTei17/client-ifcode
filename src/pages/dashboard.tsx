
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

  return (
  <AuthGuard isAuthenticated={isAuthenticated ?? false}>
      <div>
              <p><strong>Interesses:</strong> {nextUser && nextUser.usuarioInteresses?.map(ui => ui.interest.descricao).join(', ')}</p>
        <p>Welcome to your dashboard!</p>
        <div className="dashboard-next-user">
          <h2>Próximo usuário do ranking</h2>
          {loading && <p>Carregando...</p>}
          {!loading && nextUser ? (
            <div>
              <p><strong>Nome:</strong> {nextUser.nome_usuario}</p>
              <p><strong>Idade:</strong> {nextUser.dt_nasc ? (() => {
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
              <p><strong>Interesses:</strong> {nextUser.usuarioInteresses?.map(ui => ui.interest.descricao)?.join(', ')}</p>
             
            </div>
          ) : !loading && <p>Nenhum usuário encontrado.</p>}
        </div>
      </div>
    </AuthGuard>
  );
};

export default Dashboard;