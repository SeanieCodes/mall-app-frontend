import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SignoutButton from '../../Common/SignoutButton/SignoutButton';
import VoucherDetails from '../../Common/VoucherDetails/VoucherDetails';
import './ShopperDashboard.css';
import { index } from '../../../services/voucherService';

const ShopperDashboard = () => {
    const [username, setUsername] = useState('');
    const [userId, setUserId] = useState('');
    const [vouchers, setVouchers] = useState([]);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("user"));
        if (userData) {
          setUsername(userData.username);
          if (userData._id) {
            setUserId(userData._id);
          } else {
            console.warn("No user ID found in localStorage");
          }
        }

      const fetchAllVouchers = async () => {
        try {
            setIsLoading(true);
            const vouchersData = await index();
            
            if (Array.isArray(vouchersData)) {
                setVouchers(vouchersData);
            } else if (vouchersData && vouchersData.error) {
                setError(vouchersData.error || "Failed to load vouchers.");
                if (vouchersData.error.includes("unauthorized") || vouchersData.error.includes("token")) {
                    localStorage.removeItem('user');
                    localStorage.removeItem('token');
                    navigate('/');
                }
            } else {
                setError("Unexpected response format. Please try again.");
            }
        } catch (error) {
            console.error("Error fetching vouchers:", error);
            setError("Failed to load vouchers.");
        } finally {
            setIsLoading(false);
        }
      };

      fetchAllVouchers();
    }, [navigate]);

    const availableVouchers = Array.isArray(vouchers) ? vouchers.filter(voucher => {
        const currentDate = new Date();
        
        if (voucher.status !== 'active' || (voucher.endDate && new Date(voucher.endDate) < currentDate)) {
          return false;
        }
        
        const userRedemptionCount = voucher.redeemedBy
          ? voucher.redeemedBy.filter(redemption => {
              return redemption.user.toString() === userId.toString();
            }).length
          : 0;
                
        return userRedemptionCount < voucher.redemptionsPerShopper;
    }) : [];

    if (isLoading) {
        return (
            <div className="mainBackground">
                <div className="dashboardContainer">
                    <header className="dashboardHeader">
                        <h2 className="welcomeText">Loading...</h2>
                    </header>
                </div>
            </div>
        );
    }

    return (
        <div className="mainBackground">
            <div className="dashboardContainer">
                <header className="dashboardHeader">
                    <h2 className="welcomeText">Welcome, {username}</h2>
                    <SignoutButton />
                </header>

                {error && <p className="errorText">{error}</p>}

                <main className="vouchersGrid">
                    {availableVouchers.length > 0 ? (
                        availableVouchers.map(voucher => (
                            <div 
                            key={voucher._id} 
                            onClick={() => navigate(`/shopper/voucher/${voucher._id}`)}
                            className="clickableVoucher"
                            role="button"
                            tabIndex="0"
                        >
                            {voucher ? (
                                <VoucherDetails voucher={voucher} isInteractive={true} />
                            ) : (
                                <p className="voucherError">Error loading voucher.</p>
                            )}
                        </div>
                        ))
                    ) : (
                        <p className="noVouchersText">No vouchers available.</p>
                    )}
                </main>
            </div>
        </div>
    );
};

export default ShopperDashboard;