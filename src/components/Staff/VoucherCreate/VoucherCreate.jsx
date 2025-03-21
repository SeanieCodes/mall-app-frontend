import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SignoutButton from '../../Common/SignoutButton/SignoutButton';
import VoucherStatusDropdown from '../VoucherStatusDropdown/VoucherStatusDropdown';
import DateRangePicker from '../DateRangePicker/DateRangePicker';
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
        redemptionsPerShopper: '',
        status: ''
    });
    const [error, setError] = useState('');
    const [fieldErrors, setFieldErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const maxLengths = {
        storeName: 20,
        discount: 7,
        description: 140
    };

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('user'));
        if (userData) {
            setUsername(userData.username);
        }
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        
        if (maxLengths[name] && value.length > maxLengths[name]) {
            setFieldErrors({
                ...fieldErrors,
                [name]: `Maximum ${maxLengths[name]} characters allowed`
            });
            setFormData(prevData => ({
                ...prevData,
                [name]: value.slice(0, maxLengths[name])
            }));
            return;
        }
        
        if (fieldErrors[name]) {
            setFieldErrors({
                ...fieldErrors,
                [name]: undefined
            });
        }
        
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };
    
    const handleDateChange = (dates) => {
        setFormData(prevData => ({
            ...prevData,
            startDate: dates.startDate,
            endDate: dates.endDate
        }));
    };
    
    const handleStatusChange = (newStatus) => {
        setFormData(prevData => ({
            ...prevData,
            status: newStatus
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setIsSubmitting(true);
        if (!formData.storeName || !formData.discount || !formData.description || !formData.redemptionsPerShopper) {
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
              <label htmlFor="storeName">Store Name (max 20 characters)</label>
              <input
                type="text"
                id="storeName"
                name="storeName"
                value={formData.storeName}
                onChange={handleInputChange}
                placeholder="Enter store name"
                maxLength={maxLengths.storeName}
                required
              />
              {fieldErrors.storeName && <div className="fieldError">{fieldErrors.storeName}</div>}
            </div>

            <div className="formGroup">
              <label htmlFor="discount">Discount (max 7 characters)</label>
              <input
                type="text"
                id="discount"
                name="discount"
                value={formData.discount}
                onChange={handleInputChange}
                placeholder="e.g., 20% OFF"
                maxLength={maxLengths.discount}
                required
              />
              {fieldErrors.discount && <div className="fieldError">{fieldErrors.discount}</div>}
            </div>

            <div className="formGroup">
              <label htmlFor="description">Description (max 140 characters)</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter voucher description"
                rows="4"
                maxLength={maxLengths.description}
                required
              />
              <div className="charCounter">
                {formData.description.length}/{maxLengths.description}
              </div>
              {fieldErrors.description && <div className="fieldError">{fieldErrors.description}</div>}
            </div>

            <DateRangePicker
              startDate={formData.startDate}
              endDate={formData.endDate}
              onDateChange={handleDateChange}
            />

            <div className="formGroup">
              <label htmlFor="redemptionsPerShopper">Redemptions Per Shopper</label>
              <input
                type="number"
                id="redemptionsPerShopper"
                name="redemptionsPerShopper"
                value={formData.redemptionsPerShopper}
                onChange={handleInputChange}
                min="1"
                required
              />
            </div>

            <div className="formGroup">
              <label htmlFor="voucherStatusSelect">Voucher Status</label>
              <VoucherStatusDropdown
                value={formData.status}
                onChange={handleStatusChange}
              />
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