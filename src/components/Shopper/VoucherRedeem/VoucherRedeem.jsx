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
    const [isRedeemed, setIsRedeemed] = useState(false);
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
            setIsRedeemed(true);
            setError('');
        
            const result = await redeem(id);
        
            if (result.error) {
              setError(result.error); 
            }
          } catch (error) {
            setError('Failed to redeem voucher. Please try again.');
            console.error('Redemption error:', error);
          } finally {
            setIsRedeemed(false);
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
                        disabled={isRedeemed}
                    >
                        {isRedeemed ? 'Redeemed' : 'Redeem Now'}
                    </button>

                    {error && <div className="errorMessage">{error}</div>}
                </main>
            </div>
        </div>
    );
};

export default VoucherRedeem;