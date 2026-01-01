import { useState } from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { Trash2, Plus, DollarSign, Truck, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const { vehicles, materials, addVehicle, removeVehicle, addMaterial, removeMaterial, updateMaterialPrice } = useData();
    const { logout } = useAuth();
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState('vehicles');

    // Forms State
    const [newVehicle, setNewVehicle] = useState({ truckNumber: '', wheels: '', driverName: '', driverPhone: '', image: '' });
    const [newMaterial, setNewMaterial] = useState({ name: '', type: '', ratePerTon: '', ratePerTruck: '', description: '', image: '' });

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleAddVehicle = (e) => {
        e.preventDefault();
        // Use default image if none provided
        const vehicleToAdd = {
            ...newVehicle,
            image: newVehicle.image || 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=600&auto=format&fit=crop'
        };
        addVehicle(vehicleToAdd);
        setNewVehicle({ truckNumber: '', wheels: '', driverName: '', driverPhone: '', image: '' });
    };

    const handleAddMaterial = (e) => {
        e.preventDefault();
        const materialToAdd = {
            ...newMaterial,
            image: newMaterial.image || 'https://images.unsplash.com/photo-1518709779341-56cf8536f864?q=80&w=600&auto=format&fit=crop'
        };
        addMaterial(materialToAdd);
        setNewMaterial({ name: '', type: '', ratePerTon: '', ratePerTruck: '', description: '', image: '' });
    };

    return (
        <div className="section-padding" style={{ backgroundColor: '#F9FAFB', minHeight: '100vh' }}>
            <div className="container">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h1>Admin Dashboard</h1>
                    <button onClick={handleLogout} style={{ padding: '0.5rem 1rem', border: '1px solid #EF4444', color: '#EF4444', borderRadius: '0.375rem', background: 'transparent', cursor: 'pointer' }}>Logout</button>
                </div>

                <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                    <button
                        onClick={() => setActiveTab('vehicles')}
                        style={{ padding: '0.75rem 1.5rem', borderRadius: '0.375rem', backgroundColor: activeTab === 'vehicles' ? '#FFC107' : '#fff', color: activeTab === 'vehicles' ? '#000' : '#4B5563', border: '1px solid #D1D5DB', cursor: 'pointer', fontWeight: '500' }}
                    >
                        Manage Vehicles
                    </button>
                    <button
                        onClick={() => setActiveTab('materials')}
                        style={{ padding: '0.75rem 1.5rem', borderRadius: '0.375rem', backgroundColor: activeTab === 'materials' ? '#FFC107' : '#fff', color: activeTab === 'materials' ? '#000' : '#4B5563', border: '1px solid #D1D5DB', cursor: 'pointer', fontWeight: '500' }}
                    >
                        Manage Materials
                    </button>
                </div>

                {/* Debug Info */}
                {(!vehicles || !Array.isArray(vehicles)) && <div style={{ color: 'red' }}>Error: Vehicles data is missing or invalid</div>}

                {/* Vehicles Tab */}
                {activeTab === 'vehicles' && (
                    <div>
                        {(!vehicles || !Array.isArray(vehicles)) ? (
                            <div style={{ padding: '2rem', textAlign: 'center', color: '#DC2626' }}>
                                Error: Vehicles data is missing or invalid. Please click 'Reset Application Data' on Login page.
                            </div>
                        ) : (
                            <div>
                                <div style={{ backgroundColor: '#fff', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '2rem' }}>
                                    <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Plus size={20} /> Add New Vehicle</h3>
                                    <form onSubmit={handleAddVehicle} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                                        <input required placeholder="Truck Number" value={newVehicle.truckNumber} onChange={e => setNewVehicle({ ...newVehicle, truckNumber: e.target.value })} style={inputStyle} />
                                        <input required placeholder="Wheels (e.g. 10)" value={newVehicle.wheels} onChange={e => setNewVehicle({ ...newVehicle, wheels: e.target.value })} style={inputStyle} />
                                        <input required placeholder="Driver Name" value={newVehicle.driverName} onChange={e => setNewVehicle({ ...newVehicle, driverName: e.target.value })} style={inputStyle} />
                                        <input required placeholder="Driver Phone" value={newVehicle.driverPhone} onChange={e => setNewVehicle({ ...newVehicle, driverPhone: e.target.value })} style={inputStyle} />
                                        <input placeholder="Image URL (Optional)" value={newVehicle.image} onChange={e => setNewVehicle({ ...newVehicle, image: e.target.value })} style={inputStyle} />
                                        <button type="submit" className="btn btn-primary" style={{ height: '42px', marginTop: 'auto' }}>Add Vehicle</button>
                                    </form>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                                    {vehicles.map(vehicle => (
                                        <div key={vehicle.id} style={{ backgroundColor: '#fff', padding: '1rem', borderRadius: '0.5rem', border: '1px solid #E5E7EB', position: 'relative' }}>
                                            <button
                                                onClick={() => removeVehicle(vehicle.id)}
                                                style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', padding: '0.5rem', backgroundColor: '#FEE2E2', color: '#DC2626', borderRadius: '50%', border: 'none', cursor: 'pointer' }}
                                                title="Delete Vehicle"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                                                <div style={{ width: '60px', height: '60px', borderRadius: '0.375rem', overflow: 'hidden', backgroundColor: '#f3f4f6' }}>
                                                    <img src={vehicle.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                </div>
                                                <div>
                                                    <h4 style={{ fontWeight: '600' }}>{vehicle.truckNumber}</h4>
                                                    <p style={{ fontSize: '0.875rem', color: '#6B7280' }}>{vehicle.wheels} Wheels</p>
                                                </div>
                                            </div>
                                            <div style={{ fontSize: '0.875rem', color: '#4B5563' }}>
                                                <p>Driver: {vehicle.driverName}</p>
                                                <p>Phone: {vehicle.driverPhone}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Materials Tab */}
                {activeTab === 'materials' && (
                    <div>
                        {(!materials || !Array.isArray(materials)) ? (
                            <div style={{ padding: '2rem', textAlign: 'center', color: '#DC2626' }}>
                                Error: Materials data is missing or invalid. Please click 'Reset Application Data' on Login page.
                            </div>
                        ) : (
                            <div>
                                <div style={{ backgroundColor: '#fff', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '2rem' }}>
                                    <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Plus size={20} /> Add New Material</h3>
                                    <form onSubmit={handleAddMaterial} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                                        <input required placeholder="Name (e.g. Red Sand)" value={newMaterial.name} onChange={e => setNewMaterial({ ...newMaterial, name: e.target.value })} style={inputStyle} />
                                        <input required placeholder="Type (e.g. Fine Aggregate)" value={newMaterial.type} onChange={e => setNewMaterial({ ...newMaterial, type: e.target.value })} style={inputStyle} />
                                        <input required placeholder="Rate / Ton" value={newMaterial.ratePerTon} onChange={e => setNewMaterial({ ...newMaterial, ratePerTon: e.target.value })} style={inputStyle} />
                                        <input required placeholder="Rate / Truck" value={newMaterial.ratePerTruck} onChange={e => setNewMaterial({ ...newMaterial, ratePerTruck: e.target.value })} style={inputStyle} />
                                        <input placeholder="Description" value={newMaterial.description} onChange={e => setNewMaterial({ ...newMaterial, description: e.target.value })} style={inputStyle} />
                                        <input placeholder="Image URL (Optional)" value={newMaterial.image} onChange={e => setNewMaterial({ ...newMaterial, image: e.target.value })} style={inputStyle} />
                                        <button type="submit" className="btn btn-primary" style={{ height: '42px', marginTop: 'auto' }}>Add Material</button>
                                    </form>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                                    {materials.map(material => (
                                        <div key={material.id} style={{ backgroundColor: '#fff', padding: '1.5rem', borderRadius: '0.5rem', border: '1px solid #E5E7EB', position: 'relative' }}>
                                            <button
                                                onClick={() => removeMaterial(material.id)}
                                                style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', padding: '0.5rem', backgroundColor: '#FEE2E2', color: '#DC2626', borderRadius: '50%', border: 'none', cursor: 'pointer', zIndex: 10 }}
                                                title="Delete Material"
                                            >
                                                <Trash2 size={16} />
                                            </button>

                                            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                                                <div style={{ width: '60px', height: '60px', borderRadius: '0.375rem', overflow: 'hidden', backgroundColor: '#f3f4f6', flexShrink: 0 }}>
                                                    <img src={material.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                </div>
                                                <div>
                                                    <h4 style={{ fontWeight: '600' }}>{material.name}</h4>
                                                    <p style={{ fontSize: '0.875rem', color: '#6B7280' }}>{material.type}</p>
                                                </div>
                                            </div>

                                            <div style={{ borderTop: '1px solid #E5E7EB', paddingTop: '1rem' }}>
                                                <p style={{ marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>Update Prices:</p>
                                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                                    <div>
                                                        <label style={{ fontSize: '0.75rem', color: '#6B7280' }}>Per Ton</label>
                                                        <input
                                                            value={material.ratePerTon}
                                                            onChange={(e) => updateMaterialPrice(material.id, e.target.value, material.ratePerTruck)}
                                                            style={{ ...inputStyle, padding: '0.25rem 0.5rem', fontSize: '0.875rem' }}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label style={{ fontSize: '0.75rem', color: '#6B7280' }}>Per Truck</label>
                                                        <input
                                                            value={material.ratePerTruck}
                                                            onChange={(e) => updateMaterialPrice(material.id, material.ratePerTon, e.target.value)}
                                                            style={{ ...inputStyle, padding: '0.25rem 0.5rem', fontSize: '0.875rem' }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div >
    );
};

const inputStyle = {
    width: '100%',
    padding: '0.5rem 0.75rem',
    borderRadius: '0.375rem',
    border: '1px solid #D1D5DB',
    outline: 'none',
    fontSize: '0.9rem'
};

export default AdminDashboard;
