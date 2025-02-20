import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SignoutButton from '../../Common/SignoutButton/SignoutButton';
import VoucherDetails from '../../Common/VoucherDetails/VoucherDetails';
import './ShopperDashboard.css';

const ShopperDashboard = () => {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('user'));
        if (userData) {
            setUsername(userData.username);
        }
    }, []);

    // Mock voucher data
    const mockVouchers = Array(20).fill(null).map((_, index) => ({
        id: index + 1,
        storeName: `Store ${index + 1}`,
        discount: '20% OFF',
        enddate: '2024-12-31'
    }));

    return (
        <div className="mainBackground">
            <div className="dashboardContainer">
                <header className="dashboardHeader">
                    <h2 className="welcomeText">Welcome, {username}</h2>
                    <SignoutButton />
                </header>

                <main className="vouchersGrid">
                    {mockVouchers.map(voucher => (
                        <div 
                            key={voucher.id} 
                            onClick={() => navigate(`/shopper/voucher/${voucher.id}`)}
                            className="clickableVoucher"
                        >
                            <VoucherDetails voucher={voucher} isInteractive={true} />
                        </div>
                    ))}
                </main>
            </div>
        </div>
    );
};

export default ShopperDashboard;