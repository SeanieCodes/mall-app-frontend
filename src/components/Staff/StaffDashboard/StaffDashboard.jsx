import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SignoutButton from '../../Common/SignoutButton/SignoutButton';
import VoucherDetails from '../../Common/VoucherDetails/VoucherDetails';
import './StaffDashboard.css';
import { index } from '../../../services/voucherService';

const StaffDashboard = () => {
    const [username, setUsername] = useState('');
    const [vouchers, setVouchers] = useState([]);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("user"));
        if (userData) {
            setUsername(userData.username);
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

    const currentDate = new Date();

    const activeVouchers = Array.isArray(vouchers) 
        ? vouchers.filter(voucher => {
            return voucher.status === 'active' && 
                (!voucher.endDate || new Date(voucher.endDate) > currentDate);
        })
        : [];

    const inactiveVouchers = Array.isArray(vouchers)
        ? vouchers.filter(voucher => voucher.status === 'inactive')
        : [];

    const expiredVouchers = Array.isArray(vouchers)
        ? vouchers.filter(voucher => {
            return voucher.status === 'expired' || 
                (voucher.endDate && new Date(voucher.endDate) < currentDate && voucher.status === 'active');
        })
        : [];

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
                    <div className="headerActions">
                        <button 
                            className="createButton"
                            onClick={() => navigate("/staff/voucher/create")}
                        >
                            Create New Voucher
                        </button>
                        <SignoutButton />
                    </div>
                </header>

                {error && <p className="errorText">{error}</p>}

                <section className="voucherSection">
                    <h3 className="sectionTitle">Active Vouchers</h3>
                    <div className="vouchersGrid">
                        {activeVouchers.length > 0 ? (
                            activeVouchers.map(voucher => (
                                <div 
                                    key={voucher._id} 
                                    onClick={() => navigate(`/staff/voucher/${voucher._id}`)}
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
                            <p className="noVouchersText">No active vouchers available.</p>
                        )}
                    </div>
                </section>

                <section className="voucherSection">
                    <h3 className="sectionTitle">Inactive Vouchers</h3>
                    <div className="vouchersGrid">
                        {inactiveVouchers.length > 0 ? (
                            inactiveVouchers.map(voucher => (
                                <div 
                                    key={voucher._id} 
                                    onClick={() => navigate(`/staff/voucher/${voucher._id}`)}
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
                            <p className="noVouchersText">No inactive vouchers available.</p>
                        )}
                    </div>
                </section>

                <section className="voucherSection">
                    <h3 className="sectionTitle">Expired Vouchers</h3>
                    <div className="vouchersGrid">
                        {expiredVouchers.length > 0 ? (
                            expiredVouchers.map(voucher => (
                                <div 
                                    key={voucher._id} 
                                    onClick={() => navigate(`/staff/voucher/${voucher._id}`)}
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
                            <p className="noVouchersText">No expired vouchers available.</p>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default StaffDashboard;