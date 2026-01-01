import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Truck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const { user } = useAuth();
    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Vehicles', path: '/vehicles' },
        { name: 'Materials', path: '/materials' },
        { name: 'Order Now', path: '/order' },
        { name: 'Contact', path: '/contact' },
    ];

    if (user?.role === 'admin') {
        navLinks.push({ name: 'Admin', path: '/admin' });
    } else {
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
                <ul style={{ display: 'flex', gap: '2rem' }} className="hidden-mobile">
                    {navLinks.map((link) => (
                        <li key={link.name}>
                            <Link to={link.path} style={{ color: isActive(link.path) ? '#FFC107' : '#e5e7eb', fontWeight: isActive(link.path) ? 'bold' : '500' }}>
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Mobile Toggle */}
                <button onClick={() => setIsOpen(!isOpen)} className="hidden-desktop" style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div style={{ backgroundColor: '#2d2d2d', padding: '1rem', borderTop: '1px solid #444' }} className="hidden-desktop">
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {navLinks.map((link) => (
                            <li key={link.name}>
                                <Link
                                    to={link.path}
                                    onClick={() => setIsOpen(false)}
                                    style={{ display: 'block', padding: '0.5rem', color: isActive(link.path) ? '#FFC107' : '#fff', borderRadius: '4px', backgroundColor: isActive(link.path) ? 'rgba(255, 193, 7, 0.1)' : 'transparent' }}
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
