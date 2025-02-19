import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SignoutButton from '../../Common/SignoutButton/SignoutButton';
import VoucherDetails from '../../Common/VoucherDetails/VoucherDetails';
import './VoucherRedeem.css';

const VoucherRedeem = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [voucher, setVoucher] = useState(null);
    const [isRedeeming, setIsRedeeming] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        // Get username from localStorage
        const userData = JSON.parse(localStorage.getItem('user'));
        if (userData) {
            setUsername(userData.username);
        }

        // Mock fetching voucher data - replace with API call later
        const mockVoucher = {
            id: id,
            storeName: "Example Store",
            discount: "20% OFF",
            enddate: "2024-12-31",
        };
        setVoucher(mockVoucher);
    }, [id]);

    const handleRedeem = async () => {
        try {
            setIsRedeeming(true);
            setError('');

            // Mock API call - replace with actual API call later
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Mock success
            navigate('/shopper/dashboard');
        } catch (err) {
            setError('Failed to redeem voucher. Please try again.');
            console.error('Redemption error:', err);
        } finally {
            setIsRedeeming(false);
        }
    };

    if (!voucher) {
        return (
            <div className="mainBackground">
                <div className="redeemContainer">
                    <div className="loadingMessage">Loading voucher details...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="mainBackground">
            <div className="redeemContainer">
                <header className="redeemHeader">
                    <h2 className="headerLeft">Welcome, {username}</h2>
                    <div className="headerRight">
                        <button 
                            className="backButton"
                            onClick={() => navigate('/shopper/dashboard')}
                        >
                            ← Back to Dashboard
                        </button>
                        <SignoutButton />
                    </div>
                </header>

                <main className="redeemContent">
                    <VoucherDetails voucher={voucher} />
                    
                    <button 
                        className="redeemButton"
                        onClick={handleRedeem}
                        disabled={isRedeeming}
                    >
                        {isRedeeming ? 'Processing...' : 'Redeem Now'}
                    </button>

                    {error && <div className="errorMessage">{error}</div>}
                </main>
            </div>
        </div>
    );
};

export default VoucherRedeem;