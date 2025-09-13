import { useState } from 'react';
const API_URL = process.env.NEXT_PUBLIC_API_URL;
import { useRouter } from 'next/router';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nome, setNome] = useState('');
    const [cep, setCep] = useState('');
    const [complemento, setComplemento] = useState('');
    const [numero, setNumero] = useState('');
    const [telefone, setTelefone] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [cpf, setCpf] = useState('');
    const [interesses, setInteresses] = useState('');
    const [contatoEmergencia, setContatoEmergencia] = useState('');
    const [tipoUsuario, setTipoUsuario] = useState('idoso');
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
            const response = await fetch(`${API_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
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
                    interesses,
                    contatoEmergencia,
                    tipoUsuario
                }),
            });

            if (!response.ok) {
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
        <div className="container">
            <h1>Register</h1>
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
                </div>
                <div>
                    <label htmlFor="cep">CEP:</label>
                    <input
                        type="text"
                        id="cep"
                        value={cep}
                        onChange={(e) => setCep(e.target.value)}
                        required
                    />
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
                        onChange={(e) => setTelefone(e.target.value)}
                        required
                    />
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
                        onChange={(e) => setCpf(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="interesses">Interesses:</label>
                    <input
                        type="text"
                        id="interesses"
                        value={interesses}
                        onChange={(e) => setInteresses(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="contatoEmergencia">Contato de Emergência:</label>
                    <input
                        type="text"
                        id="contatoEmergencia"
                        value={contatoEmergencia}
                        onChange={(e) => setContatoEmergencia(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="tipoUsuario">Tipo de Usuário:</label>
                    <select
                        id="tipoUsuario"
                        value={tipoUsuario}
                        onChange={(e) => setTipoUsuario(e.target.value)}
                        required
                    >
                        <option value="idoso">Idoso</option>
                        <option value="voluntario">Voluntário</option>
                    </select>
                </div>
                <button type="submit">Registrar</button>
                <button
                    type="button"
                    style={{ marginLeft: '10px' }}
                    onClick={() => router.push('/login')}
                >
                    Já sou cadastrado
                </button>
            </form>
        </div>
    );
};

export default Register;