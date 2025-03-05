import { useState, useEffect, useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginDropdown from './components/Common/LoginDropdown/LoginDropdown';
import LoginForm from './components/Common/LoginForm/LoginForm';
import SignupForm from './components/Shopper/SignupForm/SignupForm';
import ShopperDashboard from './components/Shopper/ShopperDashboard/ShopperDashboard';
import VoucherRedeem from './components/Shopper/VoucherRedeem/VoucherRedeem';
import StaffDashboard from './components/Staff/StaffDashboard/StaffDashboard';
import VoucherCreate from './components/Staff/VoucherCreate/VoucherCreate';
import VoucherEdit from './components/Staff/VoucherEdit/VoucherEdit';
import StaffVoucherDetailsPage from './components/Staff/StaffVoucherDetailsPage/StaffVoucherDetailsPage';
import ProtectedRoute from './components/Common/ProtectedRoute/ProtectedRoute';
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
                    user ? (
                        user.role === 'staff' ? (
                            <Navigate to="/staff/dashboard" replace />
                        ) : (
                            <Navigate to="/shopper/dashboard" replace />
                        )
                    ) : (
                        <div className="app-container">
                            <h1>Garden Grove</h1>
                            <LoginDropdown onTypeChange={setSelectedType} />
                            <LoginForm userType={selectedType} />
                        </div>
                    )
                }
            />
            <Route 
                path="/signup" 
                element={<SignupForm userType="shopper" />} 
            />
            <Route 
                path="/shopper/dashboard" 
                element={
                    <ProtectedRoute requiredRole="shopper">
                        <ShopperDashboard />
                    </ProtectedRoute>
                } 
            />
            <Route 
                path="/shopper/voucher/:id" 
                element={
                    <ProtectedRoute requiredRole="shopper">
                        <VoucherRedeem />
                    </ProtectedRoute>
                } 
            />
            <Route 
                path="/staff/dashboard" 
                element={
                    <ProtectedRoute requiredRole="staff">
                        <StaffDashboard />
                    </ProtectedRoute>
                } 
            />
            <Route 
                path="/staff/voucher/create" 
                element={
                    <ProtectedRoute requiredRole="staff">
                        <VoucherCreate />
                    </ProtectedRoute>
                } 
            />
            <Route 
                path="/staff/voucher/edit/:id" 
                element={
                    <ProtectedRoute requiredRole="staff">
                        <VoucherEdit />
                    </ProtectedRoute>
                } 
            />
            <Route 
                path="/staff/voucher/:id" 
                element={
                    <ProtectedRoute requiredRole="staff">
                        <StaffVoucherDetailsPage />
                    </ProtectedRoute>
                } 
            />
        </Routes>
    );
};

export default App;