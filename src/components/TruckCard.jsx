import { Phone } from 'lucide-react';

const TruckCard = ({ vehicle }) => {
    return (
        <div style={{ backgroundColor: '#fff', borderRadius: '0.5rem', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', transition: 'transform 0.3s' }} className="truck-card">
            <div style={{ height: '320px', overflow: 'hidden', backgroundColor: '#f3f4f6' }}>
                <img
                    src={vehicle.image}
                    alt={`Truck ${vehicle.truckNumber}`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                    onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
                    onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                    onError={(e) => {
                        e.target.src = 'https://placehold.co/600x400/orange/white?text=Vehicle+Image';
                        e.target.onerror = null;
                    }}
                />
            </div>
            <div style={{ padding: '1.5rem' }}>
                <h3 style={{ marginBottom: '0.5rem', color: '#1F2937' }}>{vehicle.truckNumber}</h3>
                <p style={{ color: '#6B7280', marginBottom: '1rem' }}>Wheels: <span style={{ fontWeight: '600', color: '#111827' }}>{vehicle.wheels}</span></p>

                <div style={{ borderTop: '1px solid #E5E7EB', paddingTop: '1rem', marginTop: '1rem' }}>
                    <p style={{ fontSize: '0.875rem', color: '#6B7280', marginBottom: '0.25rem' }}>Driver</p>
                    <p style={{ fontWeight: '600', color: '#111827', fontSize: '1.125rem' }}>{vehicle.driverName}</p>
                    <a href={`tel:${vehicle.driverPhone}`} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem', color: '#FFC107', fontWeight: '600' }}>
                        <Phone size={18} /> {vehicle.driverPhone}
                    </a>
                </div>
            </div>
        </div>
    );
};

export default TruckCard;
