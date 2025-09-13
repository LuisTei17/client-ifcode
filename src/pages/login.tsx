import { useState } from 'react';
import { useRouter } from 'next/router';
import SocialLogin from '../components/SocialLogin';
const API_URL = process.env.NEXT_PUBLIC_API_URL;

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');

    const res = await fetch(API_URL + '/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ email, password })
    });

        if (res.ok) {
            const data = await res.json();
            // Store JWT token in local storage or cookies
            localStorage.setItem('token', data.token);
            router.push('/'); // Redirect to index
        } else {
            const errorData = await res.json();
            setError(errorData.message || 'Login failed');
        }
    };

    return (
        <div className="container">
            <h1>Login</h1>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
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
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
                <button
                    type="button"
                    style={{ marginLeft: '10px' }}
                    onClick={() => router.push('/register')}
                >
                    Fazer cadastro
                </button>
            </form>
            <SocialLogin />
        </div>
    );
};

export default Login;