import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SignoutButton from '../../Common/SignoutButton/SignoutButton';
import VoucherDetails from '../../Common/VoucherDetails/VoucherDetails';
import UsageDetails from '../UsageDetails/UsageDetails';
import './StaffVoucherDetailsPage.css';
import { index } from '../../../services/voucherService';

const VoucherDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [voucher, setVoucher] = useState(null);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('user'));
        if (userData) {
            setUsername(userData.username);
        }

        const fetchVoucher = async () => {
            try {
                setIsLoading(true);
                const data = await index();
                if (data.error) {
                    setError(data.error);
                } else {
                    const foundVoucher = data.find(v => v._id === id);
                    if (foundVoucher) {
                        setVoucher(foundVoucher);
                    } else {
                        setError('Voucher not found.');
                    }
                }
            } catch (error) {
                console.error('Error fetching voucher:', error);
                setError('Failed to load voucher details.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchVoucher();
    }, [id]);

    const handleEditClick = () => {
        navigate(`/staff/voucher/edit/${id}`);
    };

    if (isLoading) {
        return (
            <div className="mainBackground">
                <div className="detailsContainer">
                    <div className="loadingMessage">Loading voucher details...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="mainBackground">
            <div className="detailsContainer">
                <header className="detailsHeader">
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

                <main className="detailsContent">
                    {error ? (
                        <div className="errorMessage">{error}</div>
                    ) : (
                        <>
                            <VoucherDetails voucher={voucher} isInteractive={false} />
                            
                            <button 
                                className="editButton"
                                onClick={handleEditClick}
                            >
                                Edit Voucher
                            </button>
                            
                            <UsageDetails voucher={voucher} />
                        </>
                    )}
                </main>
            </div>
        </div>
    );
};

export default VoucherDetailsPage;