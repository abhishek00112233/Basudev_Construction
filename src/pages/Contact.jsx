import { Phone, MapPin, Mail, MessageCircle } from 'lucide-react';

const Contact = () => {
    return (
        <div className="section-padding">
            <div className="container">
                <div className="text-center mb-8">
                    <h1 style={{ marginBottom: '1rem' }}>Contact Us</h1>
                    <p style={{ color: '#6B7280' }}>Get in touch with us for more information.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2" style={{ maxWidth: '900px', margin: '0 auto', gap: '3rem' }}>

                    {/* Contact Details */}
                    <div style={{ backgroundColor: '#fff', padding: '2rem', borderRadius: '1rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                        <h3 style={{ marginBottom: '1.5rem', borderBottom: '2px solid var(--primary)', paddingBottom: '0.5rem', display: 'inline-block' }}>Get In Touch</h3>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                <div style={{ padding: '0.75rem', backgroundColor: '#FFF7ED', borderRadius: '50%', color: '#FFC107' }}>
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h4 style={{ marginBottom: '0.25rem' }}>Business Location</h4>
                                    <p style={{ color: '#6B7280' }}>Lalganj, Vaishali, Bihar</p>
                                    <p style={{ color: '#6B7280', fontSize: '0.875rem' }}>Basudev Construction HQ</p>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                <div style={{ padding: '0.75rem', backgroundColor: '#FFF7ED', borderRadius: '50%', color: '#FFC107' }}>
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <h4 style={{ marginBottom: '0.25rem' }}>Call Us</h4>
                                    <p style={{ color: '#6B7280' }}>Owner: <strong>Avinash Kumar</strong></p>
                                    <a href="tel:+918340609484" style={{ color: 'var(--primary)', fontWeight: '600' }}>+91 8340609484</a>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                <div style={{ padding: '0.75rem', backgroundColor: '#FFF7ED', borderRadius: '50%', color: '#FFC107' }}>
                                    <MessageCircle size={24} />
                                </div>
                                <div>
                                    <h4 style={{ marginBottom: '0.25rem' }}>WhatsApp</h4>
                                    <p style={{ color: '#6B7280', marginBottom: '0.5rem' }}>Chat with us for quick queries.</p>
                                    <a
                                        href="https://wa.me/918340609484"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn btn-primary"
                                        style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
                                    >
                                        Chat on WhatsApp
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Map Placeholder or Additional Info */}
                    <div style={{ height: '100%', minHeight: '300px', backgroundColor: '#E5E7EB', borderRadius: '1rem', overflow: 'hidden' }}>
                        <iframe
                            src="https://maps.google.com/maps?q=Lalganj,Vaishali,Bihar&t=&z=13&ie=UTF8&iwloc=&output=embed"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Contact;
