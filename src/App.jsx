import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dropdown from './components/Common/Dropdown/Dropdown';
import LoginForm from './components/Common/LoginForm/LoginForm';
import SignupForm from './components/Shopper/SignupForm/SignupForm';
import ShopperDashboard from './components/Shopper/ShopperDashboard/ShopperDashboard';
import VoucherRedeem from './components/Shopper/VoucherRedeem/VoucherRedeem';
import StaffDashboard from './components/Staff/StaffDashboard/StaffDashboard';
import VoucherCreate from './components/Staff/VoucherCreate/VoucherCreate';
import VoucherEdit from './components/Staff/VoucherEdit/VoucherEdit';
import VoucherDetailsPage from './components/Staff/VoucherDetailsPage/VoucherDetailsPage';
import './App.css';

const App = () => {
    const [selectedType, setSelectedType] = useState('shopper');

    return (
        <Router>
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
        </Router>
    );
};

export default App;