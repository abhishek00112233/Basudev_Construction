import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const { login, user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // If already logged in, redirect based on role or previous location
    useEffect(() => {
        if (user) {
            if (user.role === 'admin') {
                navigate('/admin');
            } else {
                // If there's a state with 'from', go there, else home
                const from = location.state?.from?.pathname || '/';
                navigate(from);
            }
        }
    }, [user, navigate, location]);

    const handleReset = () => {
        if (window.confirm('This will clear all saved vehicle/material data. Are you sure?')) {
            localStorage.clear();
            window.location.reload();
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        const success = await login(email, password);
        if (!success) {
            setError('Invalid email or password');
        }
    };

    return (
        <div className="section-padding" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ maxWidth: '400px', width: '100%', padding: '2rem', backgroundColor: '#fff', borderRadius: '0.5rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{ display: 'inline-flex', padding: '0.75rem', backgroundColor: '#FEF3C7', borderRadius: '50%', marginBottom: '1rem' }}>
                        <Lock size={24} color="#D97706" />
                    </div>
                    <h2>Welcome Back</h2>
                    <p style={{ color: '#6B7280' }}>
                        Sign in to account
                    </p>
                </div>

                {error && (
                    <div style={{ backgroundColor: '#FEE2E2', color: '#DC2626', padding: '0.75rem', borderRadius: '0.375rem', marginBottom: '1rem', fontSize: '0.875rem' }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin}>
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151', fontSize: '0.875rem', fontWeight: '500' }}>Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{ width: '100%', padding: '0.75rem', borderRadius: '0.375rem', border: '1px solid #D1D5DB' }}
                            placeholder="you@example.com"
                            required
                        />
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151', fontSize: '0.875rem', fontWeight: '500' }}>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ width: '100%', padding: '0.75rem', borderRadius: '0.375rem', border: '1px solid #D1D5DB' }}
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary"
                        style={{ width: '100%', justifyContent: 'center' }}
                    >
                        Sign In
                    </button>
                </form>

                <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                    <p style={{ color: '#4B5563', fontSize: '0.875rem' }}>
                        Don't have an account? <Link to="/signup" style={{ color: '#D97706', fontWeight: '500' }}>Sign up</Link>
                    </p>
                </div>

                <div style={{ marginTop: '1.5rem', textAlign: 'center', borderTop: '1px solid #eee', paddingTop: '1rem' }}>
                    <button
                        onClick={handleReset}
                        style={{ background: 'none', border: 'none', color: '#9CA3AF', fontSize: '0.75rem', textDecoration: 'underline', cursor: 'pointer' }}
                    >
                        Reset Application Data (Troubleshoot)
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
