import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';

const Home = () => {
    return (
        <div>
            {/* Hero Section */}
            <section style={{
                position: 'relative',
                height: '80vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1920&auto=format&fit=crop)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                color: '#fff',
                textAlign: 'center'
            }}>
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-hero">
                            Bihar's Best Construction Company<br /><span style={{ color: 'var(--primary)' }}>Basudev Construction</span>
                        </h1>
                        <p style={{ fontSize: '1.25rem', maxWidth: '750px', margin: '0 auto 2.5rem', opacity: 0.9 }}>
                            Trusted supplier of Balu, Gitti, and Stone with reliable transport services. <br /><strong>Serving exclusively across Bihar.</strong>
                        </p>
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <Link to="/order" className="btn btn-primary">Order Now</Link>
                            <Link to="/contact" className="btn btn-outline" style={{ borderColor: '#fff', color: '#fff' }}>Contact Us</Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Services/About Section */}
            <section className="section-padding" style={{ backgroundColor: '#fff' }}>
                <div className="container">
                    <div className="text-center mb-8">
                        <h2 className="text-h2-responsive">Why Choose Basudev Construction?</h2>
                        <p style={{ color: '#6B7280' }}>We are Bihar's top choice for construction materials, delivering quality right to your site.</p>
                    </div>

                    <div className="grid grid-cols-1 grid-cols-3" style={{ gap: '2rem' }}>
                        {[
                            { title: 'Quality Materials', desc: 'Premium grade Balu, Gitti, and Stone for durable construction.', delay: 0 },
                            { title: 'Bihar Specific Service', desc: 'Specialized logistics and delivery network covering all districts of Bihar.', delay: 0.2 },
                            { title: 'Best Rates', desc: 'Competitive market rates with transparent pricing.', delay: 0.4 }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: item.delay, duration: 0.5 }}
                                style={{ padding: '2rem', backgroundColor: '#F9FAFB', borderRadius: '1rem', textAlign: 'center' }}
                            >
                                <div style={{ display: 'inline-flex', padding: '1rem', backgroundColor: '#FFF7ED', borderRadius: '50%', color: '#FFC107', marginBottom: '1rem' }}>
                                    <CheckCircle size={32} />
                                </div>
                                <h3 style={{ marginBottom: '0.5rem' }}>{item.title}</h3>
                                <p style={{ color: '#6B7280' }}>{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section-padding" style={{ backgroundColor: '#212121', color: '#fff', textAlign: 'center' }}>
                <div className="container">
                    <h2 style={{ marginBottom: '1.5rem' }}>Ready to start your project?</h2>
                    <p style={{ marginBottom: '2rem', opacity: 0.8, maxWidth: '600px', margin: '0 auto 2rem' }}>
                        Get high-quality construction materials delivered directly to your site.
                    </p>
                    <Link to="/order" className="btn btn-primary">
                        Place an Order <ArrowRight size={20} />
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;
