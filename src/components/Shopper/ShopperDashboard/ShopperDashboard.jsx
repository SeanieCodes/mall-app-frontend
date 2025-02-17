import { useState, useEffect } from 'react';
import SignoutButton from '../../Common/SignoutButton/SignoutButton';
import './ShopperDashboard.css';

const ShopperDashboard = () => {
    const [username, setUsername] = useState('');

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('user'));
        if (userData) {
            setUsername(userData.username);
        }
    }, []);

    // mock vouchers
    const mockVouchers = Array(20).fill(null).map((_, index) => ({
        id: index + 1,
        storeName: `Store ${index + 1}`,
        discount: '20% OFF',
        validUntil: '2024-12-31'
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
                        <div key={voucher.id} className="voucherCard">
                            <h3>{voucher.storeName}</h3>
                            <p className="discountText">{voucher.discount}</p>
                            <p className="validityText">Valid until: {voucher.validUntil}</p>
                        </div>
                    ))}
                </main>
            </div>
        </div>
    );
};

export default ShopperDashboard;