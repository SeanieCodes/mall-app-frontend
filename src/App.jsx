import { useState, useEffect, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import Dropdown from './components/Common/Dropdown/Dropdown';
import LoginForm from './components/Common/LoginForm/LoginForm';
import SignupForm from './components/Shopper/SignupForm/SignupForm';
import ShopperDashboard from './components/Shopper/ShopperDashboard/ShopperDashboard';
import VoucherRedeem from './components/Shopper/VoucherRedeem/VoucherRedeem';
import StaffDashboard from './components/Staff/StaffDashboard/StaffDashboard';
import VoucherCreate from './components/Staff/VoucherCreate/VoucherCreate';
import VoucherEdit from './components/Staff/VoucherEdit/VoucherEdit';
import VoucherDetailsPage from './components/Staff/VoucherDetailsPage/VoucherDetailsPage';
import * as voucherService from './services/voucherService';
import { UserContext } from './contexts/UserContext';
import './App.css';

const App = () => {
    const [selectedType, setSelectedType] = useState('shopper');
    const [vouchers, setVouchers] = useState([]);
    const { user } = useContext(UserContext);

    useEffect(() => {
        const fetchAllVouchers = async () => {
            try {
                const vouchersData = await voucherService.index();
                setVouchers(vouchersData);
            } catch (error) {
                console.error("Error fetching vouchers:", error);
            }
        };

        if (user) fetchAllVouchers();
    }, [user]);

    return (
        <Routes>
            <Route 
                path="/" 
                element={
                    <div className="app-container">
                        <h1>Garden Grove</h1>
                        <Dropdown onTypeChange={setSelectedType} />
                        <LoginForm userType={selectedType} />
                    </div>
                }
            />
            <Route 
                path="/signup" 
                element={<SignupForm userType={selectedType} />} 
            />
            <Route 
                path="/shopper/dashboard" 
                element={<ShopperDashboard />} 
            />
            <Route 
                path="/shopper/voucher/:id" 
                element={<VoucherRedeem />} 
            />
            <Route 
                path="/staff/dashboard" 
                element={<StaffDashboard />} 
            />
            <Route 
                path="/staff/voucher/create" 
                element={<VoucherCreate />} 
            />
            <Route 
                path="/staff/voucher/edit/:id" 
                element={<VoucherEdit />} 
            />
            <Route 
                path="/staff/voucher/:id" 
                element={<VoucherDetailsPage />} 
            />
        </Routes>
    );
};

export default App;