import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SignoutButton from '../../Common/SignoutButton/SignoutButton';
import VoucherStatusDropdown from '../VoucherStatusDropdown/VoucherStatusDropdown';
import DateRangePicker from '../DateRangePicker/DateRangePicker';
import './VoucherEdit.css';
import { update, remove } from '../../../services/voucherService';
const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/vouchers`;


const VoucherEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [formData, setFormData] = useState({
        storeName: '',
        discount: '',
        description: '',
        startDate: '',
        endDate: '',
        usagePerShopper: '',
        status: ''
    });
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('user'));
        if (userData) {
            setUsername(userData.username);
        }
    
        const fetchVoucher = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setError('You must be logged in to access this voucher.');
                    return;
                }
    
                const response = await fetch(`${BASE_URL}/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
    
                const data = await response.json();
    
                if (response.ok) {
                    setFormData(data);
                } else {
                    setError(data.error || 'Failed to fetch voucher details.');
                }
            } catch (error) {
                setError('An error occurred while fetching voucher data.');
                console.error('Fetch error:', error);
            }
        };
    
        if (id) {
            fetchVoucher();
        }
    }, [id]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
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

    const handleUpdate = async (event) => {
        event.preventDefault();
        setError('');
        setIsSubmitting(true);
        
        if (!formData.storeName || !formData.discount || !formData.description || !formData.usagePerShopper) {
            setError('Please fill in all required fields.');
            setIsSubmitting(false);
            return;
        }
    

        try {
            const response = await update(id, formData);
    
            if (response.error) {
                setError(response.error || 'Failed to update voucher. Please try again.');
            } else {
                navigate('/staff/dashboard');
            }
        } catch (err) {
            setError('An error occurred. Please try again later.');
            console.error('Update error:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this voucher?')) {
            return;
        }
    
        setError('');
        setIsSubmitting(true);
    
        try {
            const response = await remove(id);
    
            if (response.error) {
                setError(response.error);
            } else {
                navigate('/staff/dashboard');
            }
        } catch (error) {
            setError('An error occurred. Please try again later.');
            console.error('Remove error:', error);
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

          <form onSubmit={handleUpdate} className="voucherForm">
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

            <DateRangePicker
              startDate={formData.startDate}
              endDate={formData.endDate}
              onDateChange={handleDateChange}
            />

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
            
            <div className="formGroup">
              <label htmlFor="voucherStatusSelect">Voucher Status</label>
              <VoucherStatusDropdown 
                value={formData.status}
                onChange={handleStatusChange}
              />
            </div>

            {error && <div className="errorMessage">{error}</div>}

            <div className="buttonGroup">
              <button
                type="submit"
                className="updateButton"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Updating..." : "Update Voucher"}
              </button>
              <button
                type="button"
                className="deleteButton"
                onClick={handleDelete}
                disabled={isSubmitting}
              >
                Delete Voucher
              </button>
            </div>
          </form>
        </div>
      </div>
    );
};

export default VoucherEdit;