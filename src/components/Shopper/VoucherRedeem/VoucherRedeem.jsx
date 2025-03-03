import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SignoutButton from '../../Common/SignoutButton/SignoutButton';
import VoucherDetails from '../../Common/VoucherDetails/VoucherDetails';
import './VoucherRedeem.css';
import { index , redeem} from '../../../services/voucherService';


const VoucherRedeem = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [voucher, setVoucher] = useState(null);
    const [isRedeeming, setIsRedeeming] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('user'));
        if (userData) {
            setUsername(userData.username);
        }

        const fetchVoucher = async () => {
            try {
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
            }
        };

        fetchVoucher();
    }, [id]);

    const handleRedeem = async () => {
        try {
            setIsRedeeming(true);
            setError('');
        
            const result = await redeem(id); // Call the redeem function from voucherService
        
            if (result.error) {
              setError(result.error); // Display the error if any
            } else {
              navigate('/shopper/dashboard'); // Navigate to the dashboard on successful redemption
            }
          } catch (error) {
            setError('Failed to redeem voucher. Please try again.');
            console.error('Redemption error:', error);
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
                    <VoucherDetails voucher={voucher} isInteractive={false} />
                    
                    <p className="redeemInstructions">Present voucher to cashier before clicking Redeem Now</p>
                    
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