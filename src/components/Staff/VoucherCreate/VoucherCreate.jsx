import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SignoutButton from '../../Common/SignoutButton/SignoutButton';
import './VoucherCreate.css';

const VoucherCreate = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [formData, setFormData] = useState({
        storeName: '',
        discount: '',
        description: '',
        startDate: '',
        endDate: '',
        usagePerShopper: 1
    });
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('user'));
        if (userData) {
            setUsername(userData.username);
        }
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setIsSubmitting(true);

        try {
            // Mock API call - replace with actual API call later
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Mock success
            navigate('/staff/dashboard');
        } catch (err) {
            setError('Failed to create voucher. Please try again.');
            console.error('Submission error:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="mainBackground">
            <div className="voucherFormContainer">
                <header className="formHeader">
                    <h2 className="headerLeft">Welcome, {username}</h2>
                    <div className="headerRight">
                        <button 
                            className="backButton"
                            onClick={() => navigate('/staff/dashboard')}
                        >
                            ← Back to Dashboard
                        </button>
                        <SignoutButton />
                    </div>
                </header>

                <form onSubmit={handleSubmit} className="voucherForm">
                    <div className="formGroup">
                        <label htmlFor="storeName">Store Name</label>
                        <input
                            type="text"
                            id="storeName"
                            name="storeName"
                            value={formData.storeName}
                            onChange={handleInputChange}
                            placeholder="Enter store name"
                            required
                        />
                    </div>

                    <div className="formGroup">
                        <label htmlFor="discount">Discount</label>
                        <input
                            type="text"
                            id="discount"
                            name="discount"
                            value={formData.discount}
                            onChange={handleInputChange}
                            placeholder="e.g., 20% OFF"
                            required
                        />
                    </div>

                    <div className="formGroup">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            placeholder="Enter voucher description"
                            rows="4"
                            required
                        />
                    </div>

                    <div className="dateGroup">
                        <div className="formGroup">
                            <label htmlFor="startDate">Start Date</label>
                            <input
                                type="date"
                                id="startDate"
                                name="startDate"
                                value={formData.startDate}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="formGroup">
                            <label htmlFor="endDate">End Date</label>
                            <input
                                type="date"
                                id="endDate"
                                name="endDate"
                                value={formData.endDate}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="formGroup">
                        <label htmlFor="usagePerShopper">Usage Per Shopper</label>
                        <input
                            type="number"
                            id="usagePerShopper"
                            name="usagePerShopper"
                            value={formData.usagePerShopper}
                            onChange={handleInputChange}
                            min="1"
                            required
                        />
                    </div>

                    {error && <div className="errorMessage">{error}</div>}

                    <button 
                        type="submit" 
                        className="submitButton"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Creating...' : 'Create Voucher'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default VoucherCreate;