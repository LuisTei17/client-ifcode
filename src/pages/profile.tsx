import { useState, useEffect } from 'react';
const API_URL = (process.env.NEXT_PUBLIC_API_URL || '').replace(/\/$/, '');
function api(path: string) {
  const p = path.startsWith('/') ? path : '/' + path;
  return API_URL ? API_URL + p : p; // if no API_URL, return relative path so proxy works
}
import Navbar from '../components/Navbar';
import pagination from '../components/Pagination';
import Image from 'next/image';
import Pagination from '../components/Pagination';
import resolvePublicUrl from '../utils/publicUrl';



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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  // Multiselect states
  const [listaInteresses, setListaInteresses] = useState<{ id_interesse: number; descricao: string }[]>([]);
  const [interesses, setInteresses] = useState<string[]>([]);
  // Fetch interests list from backend
  useEffect(() => {
    const fetchInteresses = async () => {
      try {
  const res = await fetch(api('/interesses'), { credentials: 'include' });
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

  // cleanup preview URL when component unmounts or preview changes
  useEffect(() => {
    return () => {
      if (previewUrl) {
        try { URL.revokeObjectURL(previewUrl); } catch (e) { /* ignore */ }
      }
    };
  }, [previewUrl]);


  useEffect(() => {
    const fetchUser = async () => {
      try {
        console.log('API_URL:', API_URL);
        // prepare fetch options: always include credentials, and include Authorization if token present
        const possibleKeys = ['token', 'jwt', 'accessToken', 'access_token'];
        const found = possibleKeys.map(k => localStorage.getItem(k)).find(v => !!v);
        const fetchOpts: any = { credentials: 'include', headers: { Accept: 'application/json' } };
        if (found) fetchOpts.headers.Authorization = `Bearer ${found}`;

        let res: Response | null = null;
        try {
          res = await fetch(api('/auth/profile'), fetchOpts);
        } catch (netErr) {
          console.error('Network error fetching profile:', netErr);
          setLoading(false);
          return;
        }

        // debug logs for why server might reject
        console.log('profile fetch status', res.status);
        if (!res.ok) {
          try {
            const errBody = await res.json();
            console.warn('profile fetch error body:', errBody);
          } catch (e) {
            console.warn('profile fetch non-json error');
          }
        }

        if (res && res.ok) {
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
      let fotoPath = form?.foto;
      if (selectedFile) {
        try {
          const fd = new FormData();
          fd.append('file', selectedFile);
          // try to include token from localStorage if cookies are not working
          const possibleKeys = ['token', 'jwt', 'accessToken', 'access_token'];
          const found = possibleKeys.map(k => localStorage.getItem(k)).find(v => !!v);
          const upOpts: any = { method: 'POST', body: fd, credentials: 'include' };
          if (found) upOpts.headers = { Authorization: `Bearer ${found}` };

          const up = await fetch(api('/auth/profile/avatar'), upOpts);
          if (up.ok) {
            const uj = await up.json();
            fotoPath = uj.path || uj.filePath || uj.filename || uj.url || fotoPath;
          }
        } catch (err) {
          console.warn('upload failed', err);
        }
      }
      const payload = { ...form, interesses: interessesIds, foto: fotoPath };
      // send PUT: if there's a selected file, send multipart/form-data including the file; otherwise send JSON
      const possibleKeys2 = ['token', 'jwt', 'accessToken', 'access_token'];
      const found2 = possibleKeys2.map(k => localStorage.getItem(k)).find(v => !!v);

      let res: Response;
      if (selectedFile) {
        const fd = new FormData();
        // append profile fields (as strings)
        Object.keys(payload).forEach((key) => {
          const val = (payload as any)[key];
          if (val === undefined || val === null) return;
          if (Array.isArray(val)) {
            // append arrays as JSON strings
            fd.append(key, JSON.stringify(val));
          } else {
            fd.append(key, String(val));
          }
        });
        fd.append('file', selectedFile);

        const putOpts: any = { method: 'PUT', body: fd, credentials: 'include' };
        if (found2) putOpts.headers = { Authorization: `Bearer ${found2}` };
        res = await fetch(api('/auth/profile'), putOpts);
      } else {
        const putOpts: any = { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload), credentials: 'include' };
        if (found2) putOpts.headers.Authorization = `Bearer ${found2}`;
        res = await fetch(api('/auth/profile'), putOpts);
      }

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
          <div className="user-card text-center">
            <div className="avatar mb-3">
              {previewUrl ? (
                // preview when user selects a new file
                // eslint-disable-next-line @next/next/no-img-element
                <img src={previewUrl} alt="avatar" style={{ width: 140, height: 140, borderRadius: 12, objectFit: 'cover' }} />
              ) : (form?.avatarPath || form?.path || form?.foto || form?.url) ? (
                // prefer avatarPath, fall back to other path/url fields; supports proxy or absolute API base
                // eslint-disable-next-line @next/next/no-img-element
                <img src={resolvePublicUrl(form?.avatarPath || form?.path || form?.foto || form?.url)} alt="avatar" style={{ width: 140, height: 140, borderRadius: 12, objectFit: 'cover' }} />
              ) : (
                // fallback boneco using Next Image
                <Image
                  src="/icons/user.png"
                  alt="Avatar"
                  width={80}
                  height={80}
                />
              )}
            </div>
            {editMode && (
              <div style={{ marginBottom: 12 }}>
                <input type="file" accept="image/*" onChange={e => {
                  const f = e.target.files && e.target.files[0] ? e.target.files[0] : null;
                  // revoke previous preview to avoid memory leak
                  if (previewUrl) {
                    try { URL.revokeObjectURL(previewUrl); } catch (e) { /* ignore */ }
                  }
                  setSelectedFile(f);
                  if (f) setPreviewUrl(URL.createObjectURL(f)); else setPreviewUrl(null);
                }} />
              </div>
            )}
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

      <Pagination></Pagination>
    </div>
  );
};

export default Profile;