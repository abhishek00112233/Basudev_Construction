import { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { materials } from '../data/materials';
import { Send } from 'lucide-react';

const Order = () => {
    const { user } = useAuth();
    const location = useLocation();

    if (!user) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    const [formData, setFormData] = useState({
        name: '',
        mobile: '',
        material: '',
        quantity: '',
        location: ''
    });

    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const response = await fetch(`${API_URL}/api/orders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to submit order');
            }

            const data = await response.json();
            console.log('Order Submitted:', data);
            setSubmitted(true);
        } catch (err) {
            console.error('Submission Error:', err);
            setError(err.message || 'Failed to submit order. Please check your connection and try again.');
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <div className="section-padding container text-center">
                <div style={{ maxWidth: '600px', margin: '0 auto', padding: '3rem', backgroundColor: '#ECFDF5', borderRadius: '1rem', color: '#065F46' }}>
                    <h2 style={{ marginBottom: '1rem' }}>Order Placed Successfully!</h2>
                    <p>Thank you, <strong>{formData.name}</strong>. We have received your order request.</p>
                    <p>We will contact you shortly on <strong>{formData.mobile}</strong> to confirm the delivery details.</p>
                    <button
                        onClick={() => { setSubmitted(false); setFormData({ name: '', mobile: '', material: '', quantity: '', location: '' }); }}
                        className="btn btn-primary"
                        style={{ marginTop: '2rem' }}
                    >
                        Place Another Order
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="section-padding">
            <div className="container">
                <div className="text-center mb-8">
                    <h1 style={{ marginBottom: '1rem' }}>Place an Order</h1>
                    <p style={{ color: '#6B7280' }}>Fill out the form below to request a delivery.</p>
                    <div style={{ marginTop: '1rem', padding: '0.75rem', backgroundColor: '#FFFBEB', color: '#D97706', borderRadius: '0.5rem', display: 'inline-block' }}>
                        <strong>Note:</strong> We currently provide delivery services exclusively within <strong>Bihar</strong>.
                    </div>
                </div>

                <div style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#fff', padding: '2rem', borderRadius: '1rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                    {error && (
                        <div style={{ backgroundColor: '#FEF2F2', color: '#991B1B', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1.5rem' }}>
                            {error}
                        </div>
                    )}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="form-label" htmlFor="name">Customer Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="form-input"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter your name"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="mobile">Mobile Number</label>
                            <input
                                type="tel"
                                id="mobile"
                                name="mobile"
                                className="form-input"
                                required
                                value={formData.mobile}
                                onChange={handleChange}
                                placeholder="Enter 10-digit mobile number"
                                pattern="[0-9]{10}"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="material">Material Type</label>
                            <select
                                id="material"
                                name="material"
                                className="form-select"
                                required
                                value={formData.material}
                                onChange={handleChange}
                            >
                                <option value="">Select Material</option>
                                {materials.map(m => (
                                    <option key={m.id} value={m.name}>{m.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="quantity">Quantity (Tons/Trucks)</label>
                            <input
                                type="text"
                                id="quantity"
                                name="quantity"
                                className="form-input"
                                required
                                value={formData.quantity}
                                onChange={handleChange}
                                placeholder="e.g. 20 Tons or 1 Truck"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="location">Delivery Location</label>
                            <textarea
                                id="location"
                                name="location"
                                className="form-input"
                                rows="3"
                                required
                                value={formData.location}
                                onChange={handleChange}
                                placeholder="Enter full delivery address"
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary"
                            style={{ width: '100%', opacity: loading ? 0.7 : 1 }}
                            disabled={loading}
                        >
                            {loading ? 'Submitting...' : <>Submit Order <Send size={18} /></>}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Order;
