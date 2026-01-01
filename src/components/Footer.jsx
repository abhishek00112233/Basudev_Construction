const Footer = () => {
    return (
        <footer style={{ backgroundColor: '#212121', color: '#9ca3af', padding: '3rem 0', marginTop: 'auto' }}>
            <div className="container">
                <div className="grid grid-cols-1" style={{ gap: '2rem', md: { gridTemplateColumns: 'repeat(3, 1fr)' } }}>
                    <div style={{ textAlign: 'center' }}>
                        <h3 style={{ color: '#fff', marginBottom: '1rem' }}>Basudev Construction</h3>
                        <p>Trusted supplier of Balu, Gitti, Stone with reliable transport services.</p>
                    </div>

                    <div style={{ textAlign: 'center' }}>
                        <h4 style={{ color: '#fff', marginBottom: '1rem' }}>Quick Links</h4>
                        <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <li><a href="/" className="hover:text-primary">Home</a></li>
                            <li><a href="/vehicles" className="hover:text-primary">Vehicles</a></li>
                            <li><a href="/materials" className="hover:text-primary">Materials</a></li>
                            <li><a href="/contact" className="hover:text-primary">Contact</a></li>
                        </ul>
                    </div>

                    <div style={{ textAlign: 'center' }}>
                        <h4 style={{ color: '#fff', marginBottom: '1rem' }}>Contact Us</h4>
                        <p>Bihar, India</p>
                        <p>Phone: <a href="tel:+918340609484" className="hover:text-primary">8340609484</a></p>
                    </div>
                </div>
                <div style={{ borderTop: '1px solid #374151', marginTop: '2rem', paddingTop: '1rem', textAlign: 'center' }}>
                    <p>&copy; {new Date().getFullYear()} Basudev Construction. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
