import { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { UserPlus, Mail, Lock, ArrowRight, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
    const [step, setStep] = useState(1); // 1: Email, 2: OTP + Password
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); // Only for Step 2
    const [confirmPassword, setConfirmPassword] = useState(''); // Only for Step 2
    const [otp, setOtp] = useState(''); // Only for Step 2
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth(); // We can use login to auto-login after signup if we want, or just redirect

    const handleSendOtp = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setMessage('');

        try {
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const response = await fetch(`${API_URL}/api/auth/send-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to send OTP');
            }

            setMessage(data.message);
            setStep(2);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);
        setError('');
        setMessage('');

        try {
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const response = await fetch(`${API_URL}/api/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, otp }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Registration failed');
            }

            setMessage('Registration successful! Logging you in...');

            // Auto login
            await login(email, password);

            // Redirect to previous page (e.g. Order) or home
            const from = location.state?.from?.pathname || '/';
            navigate(from);

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="section-padding" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ maxWidth: '450px', width: '100%', padding: '2rem', backgroundColor: '#fff', borderRadius: '1rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{ display: 'inline-flex', padding: '0.75rem', backgroundColor: '#DBEAFE', borderRadius: '50%', marginBottom: '1rem' }}>
                        <UserPlus size={24} color="#2563EB" />
                    </div>
                    <h2>Create Account</h2>
                    <p style={{ color: '#6B7280' }}>
                        {step === 1 ? 'Enter your email to get started' : 'Verify email and set password'}
                    </p>
                </div>

                {error && (
                    <div style={{ backgroundColor: '#FEE2E2', color: '#DC2626', padding: '0.75rem', borderRadius: '0.375rem', marginBottom: '1rem', fontSize: '0.875rem' }}>
                        {error}
                    </div>
                )}

                {message && (
                    <div style={{ backgroundColor: '#D1FAE5', color: '#065F46', padding: '0.75rem', borderRadius: '0.375rem', marginBottom: '1rem', fontSize: '0.875rem' }}>
                        {message}
                    </div>
                )}

                {step === 1 ? (
                    <form onSubmit={handleSendOtp}>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151', fontSize: '0.875rem', fontWeight: '500' }}>Email Address</label>
                            <div style={{ position: 'relative' }}>
                                <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    style={{ width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.5rem', borderRadius: '0.375rem', border: '1px solid #D1D5DB' }}
                                    placeholder="you@example.com"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary"
                            style={{ width: '100%', justifyContent: 'center' }}
                            disabled={loading}
                        >
                            {loading ? 'Sending...' : <>Continue <ArrowRight size={18} /></>}
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleRegister}>
                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151', fontSize: '0.875rem', fontWeight: '500' }}>OTP Verification Code</label>
                            <input
                                type="text"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '0.375rem', border: '1px solid #D1D5DB', letterSpacing: '0.2rem', textAlign: 'center' }}
                                placeholder="123456"
                                required
                            />
                            <p style={{ fontSize: '0.75rem', color: '#6B7280', marginTop: '0.25rem' }}>Sent to {email}</p>
                        </div>

                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151', fontSize: '0.875rem', fontWeight: '500' }}>Password</label>
                            <div style={{ position: 'relative' }}>
                                <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    style={{ width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.5rem', borderRadius: '0.375rem', border: '1px solid #D1D5DB' }}
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151', fontSize: '0.875rem', fontWeight: '500' }}>Confirm Password</label>
                            <div style={{ position: 'relative' }}>
                                <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    style={{ width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.5rem', borderRadius: '0.375rem', border: '1px solid #D1D5DB' }}
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary"
                            style={{ width: '100%', justifyContent: 'center' }}
                            disabled={loading}
                        >
                            {loading ? 'Creating Account...' : <>Complete Registration <CheckCircle size={18} /></>}
                        </button>

                        <button
                            type="button"
                            onClick={() => setStep(1)}
                            style={{ marginTop: '1rem', width: '100%', background: 'none', border: 'none', color: '#6B7280', cursor: 'pointer', fontSize: '0.875rem' }}
                        >
                            Back to Email
                        </button>
                    </form>
                )}

                <div style={{ marginTop: '2rem', textAlign: 'center', borderTop: '1px solid #E5E7EB', paddingTop: '1.5rem' }}>
                    <p style={{ color: '#4B5563', fontSize: '0.875rem' }}>
                        Already have an account? <Link to="/login" style={{ color: '#2563EB', fontWeight: '500' }}>Sign In</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
