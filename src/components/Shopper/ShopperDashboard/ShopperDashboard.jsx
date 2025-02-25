import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SignoutButton from '../../Common/SignoutButton/SignoutButton';
import VoucherDetails from '../../Common/VoucherDetails/VoucherDetails';
import './ShopperDashboard.css';
import { index } from '../../../services/voucherService';

const ShopperDashboard = () => {
    const [username, setUsername] = useState('');
    const [vouchers, setVouchers] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
      const userData = JSON.parse(localStorage.getItem("user"));
      if (userData) {
        setUsername(userData.username);
      }

      const fetchAllVouchers = async () => {
        try {
            const vouchersData = await index();
            console.log("Fetched Vouchers:", vouchersData); // Debugging
            setVouchers(vouchersData);
        } catch (error) {
          console.error("Error fetching vouchers:", error);
          setError("Failed to load vouchers.");
        }
      };

      fetchAllVouchers();
    }, []);

    return (
        <div className="mainBackground">
            <div className="dashboardContainer">
                <header className="dashboardHeader">
                    <h2 className="welcomeText">Welcome, {username}</h2>
                    <SignoutButton />
                </header>

                {error && <p className="errorText">{error}</p>}

                <main className="vouchersGrid">
                    {vouchers.length > 0 ? (
                        vouchers.map(voucher => (
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