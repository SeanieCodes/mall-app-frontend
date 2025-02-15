import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dropdown from './components/Common/Dropdown/Dropdown';
import LoginForm from './components/Common/LoginForm/LoginForm';
import SignupForm from './components/Shopper/SignupForm/SignupForm';
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
            </Routes>
        </Router>
    );
};

export default App;