import React, { useEffect, useState } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

type TipoUsuario = { id_tip_usuario: number; descricao_tip_usuario: string };

const SocialLogin: React.FC = () => {
    const [tipos, setTipos] = useState<TipoUsuario[]>([]);
    const [selected, setSelected] = useState<number | null>(null);

    useEffect(() => {
        if (!API_URL) return;
        fetch(`${API_URL.replace(/\/$/, '')}/tipos-usuario`, { credentials: 'include' })
            .then(res => res.json())
            .then(data => Array.isArray(data) ? setTipos(data) : setTipos([]))
            .catch(() => setTipos([]));
    }, []);

    const oauthBase = `${API_URL.replace(/\/$/, '')}/auth/google`;
    const oauthUrl = selected ? `${oauthBase}?tipo=${selected}` : oauthBase;

    return (
        <div className="social-login">
            {tipos.length > 0 && (
                <div style={{ marginBottom: 8 }}>
                    <label htmlFor="tipoUsuario" style={{ marginRight: 8 }}>Tipo de usuário:</label>
                    <select id="tipoUsuario" value={selected ?? ''} onChange={e => setSelected(Number(e.target.value) || null)}>
                        <option value="">Selecione...</option>
                        {tipos.map(t => (
                            <option key={t.id_tip_usuario} value={t.id_tip_usuario}>{t.descricao_tip_usuario}</option>
                        ))}
                    </select>
                </div>
            )}
            <a href={oauthUrl} className="google-login" rel="nofollow">
                Google
            </a>
        </div>
    );
};

export default SocialLogin;