import { useData } from '../context/DataContext';
import { motion } from 'framer-motion';

const Materials = () => {
    const { materials } = useData();
    return (
        <div className="section-padding">
            <div className="container">
                <div className="text-center mb-8">
                    <h1 style={{ marginBottom: '1rem' }}>Construction Materials</h1>
                    <p style={{ color: '#6B7280' }}>Premium quality materials for all your construction needs.</p>
                </div>

                {/* Material Details Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: '2rem', marginBottom: '4rem' }}>
                    {materials.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            style={{ backgroundColor: '#fff', borderRadius: '1rem', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}
                        >
                            <div style={{ height: '200px', overflow: 'hidden' }}>
                                <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                            <div style={{ padding: '1.5rem' }}>
                                <h3 style={{ marginBottom: '0.5rem' }}>{item.name}</h3>
                                <p style={{ color: '#6B7280', marginBottom: '1rem', fontSize: '0.875rem' }}>{item.type}</p>
                                <p style={{ color: '#374151' }}>{item.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Rates Table */}
                <div className="table-container">
                    <h2 style={{ marginBottom: '1.5rem' }}>Current Market Rates</h2>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Material</th>
                                <th>Rate (Per Ton)</th>
                                <th>Rate (Full Truck ~20T)</th>
                                <th>Availability</th>
                            </tr>
                        </thead>
                        <tbody>
                            {materials.map((item) => (
                                <tr key={item.id}>
                                    <td style={{ fontWeight: '600' }}>{item.name}</td>
                                    <td>{item.ratePerTon}</td>
                                    <td>{item.ratePerTruck}</td>
                                    <td><span style={{ color: 'green', fontWeight: '500' }}>In Stock</span></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#6B7280', fontStyle: 'italic' }}>
                        * Rates are subject to change based on market conditions and delivery distance.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Materials;
