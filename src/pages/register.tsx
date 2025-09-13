import { useState, useEffect } from 'react';
import PasswordStrength from '../components/PasswordStrength';
const API_URL = process.env.NEXT_PUBLIC_API_URL;
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import Image from 'next/image';


const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nome, setNome] = useState('');
    const [cep, setCep] = useState('');

    // Função para aplicar máscara ao CEP (formato 99.999-999)
    const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, ''); // Remove tudo que não for número
        if (value.length > 8) value = value.slice(0, 8);
        if (value.length > 5) {
            value = value.replace(/(\d{2})(\d{3})(\d{0,3})/, '$1.$2-$3');
        } else if (value.length > 2) {
            value = value.replace(/(\d{2})(\d{0,3})/, '$1.$2');
        }
        setCep(value);
    };
    const [complemento, setComplemento] = useState('');
    const [numero, setNumero] = useState('');

    const [telefone, setTelefone] = useState('');

    // Função para aplicar máscara ao telefone (fixo: (99) 9999-9999, celular: (99) 99999-9999)
    const handleTelefoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, ''); // Remove tudo que não for número
        if (value.length > 11) value = value.slice(0, 11);
        if (value.length > 10) {
            // Celular: (99) 99999-9999
            value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        } else if (value.length > 6) {
            // Fixo: (99) 9999-9999
            value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
        } else if (value.length > 2) {
            value = value.replace(/(\d{2})(\d{0,5})/, '($1) $2');
        }
        setTelefone(value);
    };
    const [dataNascimento, setDataNascimento] = useState('');

    const [cpf, setCpf] = useState('');

    // Função para aplicar máscara ao CPF (formato 999.999.999-99)
    const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, ''); // Remove tudo que não for número
        if (value.length > 11) value = value.slice(0, 11);
        if (value.length > 9) {
            value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, '$1.$2.$3-$4');
        } else if (value.length > 6) {
            value = value.replace(/(\d{3})(\d{3})(\d{0,3})/, '$1.$2.$3');
        } else if (value.length > 3) {
            value = value.replace(/(\d{3})(\d{0,3})/, '$1.$2');
        }
        setCpf(value);
    };
    // Estado de interesses sempre string[]
    const [interesses, setInteresses] = useState<string[]>([]);
    const [listaInteresses, setListaInteresses] = useState<{ id_interesse: number; descricao: string }[]>([]);
    // Buscar lista de interesses do backend ao carregar a página
    useEffect(() => {
        const fetchInteresses = async () => {

                const res = await fetch(API_URL + '/interesses', { credentials: 'include' });
                if (res.ok) {
                    let data = await res.json();
                    setListaInteresses(data);
                }

        };
        fetchInteresses();
    }, []);

    const [contatoEmergencia, setContatoEmergencia] = useState('');

    // Função para aplicar máscara ao contato de emergência (igual telefone)
    const handleContatoEmergenciaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 11) value = value.slice(0, 11);
        if (value.length > 10) {
            value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        } else if (value.length > 6) {
            value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
        } else if (value.length > 2) {
            value = value.replace(/(\d{2})(\d{0,5})/, '($1) $2');
        }
        setContatoEmergencia(value);
    };
    const [tipoUsuario, setTipoUsuario] = useState('1');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');

        // Validação do nome: apenas letras e espaços
        const nomeValido = /^[A-Za-zÀ-ÿ\s]+$/.test(nome);
        if (!nomeValido) {
            setError('O nome deve conter apenas letras e espaços.');
            return;
        }

        try {
            const interessesIds = Array.isArray(interesses)
                ? interesses.map(id => Number(id)).filter(id => !isNaN(id) && id > 0)
                : [];
            console.log('API_URL:', API_URL);
            const response = await fetch(API_URL + '/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    email,
                    password,
                    nome,
                    cep,
                    complemento,
                    numero,
                    telefone,
                    dataNascimento,
                    cpf,
                    interesses: interessesIds,
                    contatoEmergencia,
                    tipoUsuario
                }),
            });

            if (!response.ok) {
                if (response.status === 500) {
                    setError('Este e-mail já está cadastrado.');
                    return;
                }
                throw new Error('Registration failed');
            }

            // Redirect to index after successful registration
            router.push('/');
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Ocorreu um erro desconhecido.');
            }
        }
    };

    // Regex para validar nome
    const nomeValido = /^[A-Za-zÀ-ÿ\s]+$/.test(nome);

    return (

        <div>
            <Navbar></Navbar>
        
        <div className="container">
            <h1>Cadastre-se</h1>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleRegister}>
                <div>
                    <label htmlFor="nome">Nome:</label>
                    <input
                        type="text"
                        id="nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                        className={!nomeValido && nome ? 'error' : ''}
                    />
                    {!nomeValido && nome && (
                        <span style={{ color: '#e74c3c', fontSize: '0.9em' }}>
                            O nome não pode conter números ou caracteres especiais.
                        </span>
                    )}
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className={email && !/^\S+@\S+\.\S+$/.test(email) ? 'error' : ''}
                    />
                    {email && !/^\S+@\S+\.\S+$/.test(email) && (
                        <span style={{ color: '#e74c3c', fontSize: '0.9em' }}>
                            Por favor, insira um e-mail válido.
                        </span>
                    )}
                </div>
                <div>
                    <label htmlFor="password">Senha:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <PasswordStrength password={password} />
                </div>
                <div>
                    <label htmlFor="cep">CEP:</label>
                    <input
                        type="text"
                        id="cep"
                        value={cep}
                        onChange={handleCepChange}
                        required
                        className={cep && cep.length !== 10 ? 'error' : ''}
                        inputMode="numeric"
                        maxLength={10}
                    />
                    {cep && cep.length !== 10 && (
                        <span style={{ color: '#e74c3c', fontSize: '0.9em' }}>
                            CEP inválido.
                        </span>
                    )}
                </div>
                <div>
                    <label htmlFor="complemento">Complemento:</label>
                    <input
                        type="text"
                        id="complemento"
                        value={complemento}
                        onChange={(e) => setComplemento(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="numero">Número:</label>
                    <input
                        type="text"
                        id="numero"
                        value={numero}
                        onChange={(e) => setNumero(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="telefone">Telefone:</label>
                    <input
                        type="tel"
                        id="telefone"
                        value={telefone}
                        onChange={handleTelefoneChange}
                        required
                        className={telefone && !/^\(\d{2}\) \d{4,5}-\d{4}$/.test(telefone) ? 'error' : ''}
                        inputMode="numeric"
                        maxLength={15}
                    />
                    {telefone && !/^\(\d{2}\) \d{4,5}-\d{4}$/.test(telefone) && (
                        <span style={{ color: '#e74c3c', fontSize: '0.9em' }}>
                            Telefone inválido.
                        </span>
                    )}
                </div>
                <div>
                    <label htmlFor="dataNascimento">Data de Nascimento:</label>
                    <input
                        type="date"
                        id="dataNascimento"
                        value={dataNascimento}
                        onChange={(e) => setDataNascimento(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="cpf">CPF:</label>
                    <input
                        type="text"
                        id="cpf"
                        value={cpf}
                        onChange={handleCpfChange}
                        required
                        className={cpf && !/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf) ? 'error' : ''}
                        inputMode="numeric"
                        maxLength={14}
                    />
                    {cpf && !/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf) && (
                        <span style={{ color: '#e74c3c', fontSize: '0.9em' }}>
                            CPF inválido.
                        </span>
                    )}
                </div>
                <div>
                    <div className="mb-3">
                        <label htmlFor="interesses" className="form-label">Interesses:</label>
                        <select
                            id="interesses"
                            multiple
                            className="form-select"
                            value={interesses}
                            onChange={e => {
                                const values = Array.from(e.target.selectedOptions).map(opt => opt.value);
                                setInteresses(values);
                            }}
                            required
                            style={{ minHeight: 120 }}
                        >
                            {listaInteresses.length === 0 && (
                                <option disabled>Nenhum interesse disponível</option>
                            )}
                            {listaInteresses.map((interesse) => (
                                <option key={String(interesse.id_interesse ?? interesse.id_interesse)} value={String(interesse.id_interesse ?? interesse.id_interesse)}>{interesse.descricao}</option>
                            ))}
                        </select>
                    </div>
                    <label htmlFor="contatoEmergencia">Contato de Emergência:</label>
                    <input
                        type="text"
                        id="contatoEmergencia"
                        value={contatoEmergencia}
                        onChange={handleContatoEmergenciaChange}
                        required
                        className={contatoEmergencia && !/^\(\d{2}\) \d{4,5}-\d{4}$/.test(contatoEmergencia) ? 'error' : ''}
                        inputMode="numeric"
                        maxLength={15}
                    />
                    {contatoEmergencia && !/^\(\d{2}\) \d{4,5}-\d{4}$/.test(contatoEmergencia) && (
                        <span style={{ color: '#e74c3c', fontSize: '0.9em' }}>
                            Telefone inválido.
                        </span>
                    )}
                </div>
                <div>
                    <label htmlFor="tipoUsuario">Tipo de Usuário:</label>
                    <select
                        id="tipoUsuario"
                        value={tipoUsuario}
                        onChange={(e) => setTipoUsuario(e.target.value)}
                        required
                    >
                        <option value="1">Idoso</option>
                        <option value="2">Voluntário</option>
                    </select>
                </div>
                <button type="submit">Registrar</button>
                <button
                    type="button"
                    
                    onClick={() => router.push('/login')}
                >
                    Já sou cadastrado
                </button>
            </form>
        </div>
        </div>
    );
};

export default Register;