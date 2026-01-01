import { useData } from '../context/DataContext';
import TruckCard from '../components/TruckCard';
import { motion } from 'framer-motion';

const Vehicles = () => {
    const { vehicles } = useData();
    return (
        <div className="section-padding">
            <div className="container">
                <div className="text-center mb-8">
                    <h1 style={{ marginBottom: '1rem' }}>Our Fleet</h1>
                    <p style={{ color: '#6B7280', maxWidth: '600px', margin: '0 auto' }}>
                        Reliable transport vehicles ensuring your materials arrive on time.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {vehicles.map((vehicle, index) => (
                        <motion.div
                            key={vehicle.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                        >
                            <TruckCard vehicle={vehicle} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Vehicles;
