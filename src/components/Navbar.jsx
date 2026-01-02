import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Truck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const { user, logout } = useAuth();
    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Vehicles', path: '/vehicles' },
        { name: 'Materials', path: '/materials' },
        { name: 'Order Now', path: '/order' },
        { name: 'Contact', path: '/contact' },
    ];

    if (user?.role === 'admin') {
        navLinks.push({ name: 'Admin', path: '/admin' });
    }

    if (!user) {
        navLinks.push({ name: 'Login', path: '/login' });
    }

    const isActive = (path) => location.pathname === path;

    return (
        <nav style={{ backgroundColor: '#212121', color: '#fff', position: 'sticky', top: 0, zIndex: 1000, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '64px' }}>
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.5rem', fontWeight: 'bold', color: '#fff' }}>
                    <Truck color="var(--primary)" size={32} />
                    <span>Basudev <span style={{ color: 'var(--primary)' }}>Construction</span></span>
                </Link>

                {/* Desktop Menu */}
                <ul style={{ display: 'flex', gap: '2rem', alignItems: 'center' }} className="hidden-mobile">
                    {navLinks.map((link) => (
                        <li key={link.name}>
                            <Link to={link.path} style={{ color: isActive(link.path) ? '#FFC107' : '#e5e7eb', fontWeight: isActive(link.path) ? 'bold' : '500' }}>
                                {link.name}
                            </Link>
                        </li>
                    ))}
                    {user && (
                        <li>
                            <button
                                onClick={logout}
                                style={{
                                    background: 'none',
                                    border: '1px solid #EF4444',
                                    color: '#EF4444',
                                    padding: '0.25rem 0.75rem',
                                    borderRadius: '0.25rem',
                                    cursor: 'pointer',
                                    fontSize: '0.9rem'
                                }}
                            >
                                Logout
                            </button>
                        </li>
                    )}
                </ul>

                {/* Mobile Toggle */}
                <button onClick={() => setIsOpen(!isOpen)} className="hidden-desktop" style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div style={{
                    backgroundColor: '#212121',
                    position: 'absolute',
                    top: '64px',
                    left: 0,
                    right: 0,
                    height: 'calc(100vh - 64px)',
                    padding: '2rem',
                    borderTop: '1px solid #333',
                    zIndex: 999
                }} className="hidden-desktop">
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
                        {navLinks.map((link) => (
                            <li key={link.name} style={{ width: '100%', textAlign: 'center' }}>
                                <Link
                                    to={link.path}
                                    onClick={() => setIsOpen(false)}
                                    style={{
                                        display: 'block',
                                        padding: '0.75rem',
                                        color: '#FFC107', // Always yellow as requested
                                        fontSize: '1.25rem',
                                        fontWeight: isActive(link.path) ? 'bold' : '500',
                                        borderRadius: '0.5rem',
                                        backgroundColor: isActive(link.path) ? 'rgba(255, 193, 7, 0.1)' : 'transparent',
                                        border: isActive(link.path) ? '1px solid rgba(255, 193, 7, 0.2)' : 'none'
                                    }}
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                        {user && (
                            <li style={{ width: '100%', textAlign: 'center' }}>
                                <button
                                    onClick={() => {
                                        logout();
                                        setIsOpen(false);
                                    }}
                                    style={{
                                        display: 'block',
                                        width: '100%',
                                        padding: '0.75rem',
                                        background: 'transparent',
                                        border: '1px solid #EF4444',
                                        color: '#EF4444',
                                        fontSize: '1.25rem',
                                        borderRadius: '0.5rem',
                                        cursor: 'pointer',
                                        fontWeight: '500'
                                    }}
                                >
                                    Logout
                                </button>
                            </li>
                        )}
                    </ul>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
