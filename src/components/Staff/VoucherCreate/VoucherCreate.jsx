import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SignoutButton from '../../Common/SignoutButton/SignoutButton';
import './VoucherCreate.css';
import { create } from '../../../services/voucherService';


const VoucherCreate = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [formData, setFormData] = useState({
        storeName: '',
        discount: '',
        description: '',
        startDate: '',
        endDate: '',
        usagePerShopper: '',
        status: 'active'
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
        if (!formData.storeName || !formData.discount || !formData.description || !formData.usagePerShopper) {
            setError('Please fill in all required fields.');
            setIsSubmitting(false);
            return;
        }
    
        try {
            const token = localStorage.getItem('token');
    
            if (!token) {
                setError('You must be logged in to create a voucher.');
                setIsSubmitting(false);
                return;
            }
    
            const response = await create(formData);
            if (response.error) {
                setError(response.error); 
            } else {
                navigate('/staff/dashboard');
            }
        } catch (err) {
            setError('An error occurred. Please try again later.');
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
                onClick={() => navigate("/staff/dashboard")}
              >
                ← Back to Dashboard
              </button>
              <SignoutButton />
            </div>
          </header>

          <form onSubmit={handleSubmit} className="voucherForm">
            <div className="formGroup">
              <label htmlFor="storeName">Store Name*</label>
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
              <label htmlFor="discount">Discount*</label>
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
              <label htmlFor="description">Description*</label>
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
                />
              </div>
            </div>

            <div className="formGroup">
              <label htmlFor="usagePerShopper">Usage Per Shopper*</label>
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

            <div className="formGroup">
              <label htmlFor="status">Voucher Status*</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                required
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            {error && <div className="errorMessage">{error}</div>}

            <button
              type="submit"
              className="submitButton"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create Voucher"}
            </button>
          </form>
        </div>
      </div>
    );
};

export default VoucherCreate;