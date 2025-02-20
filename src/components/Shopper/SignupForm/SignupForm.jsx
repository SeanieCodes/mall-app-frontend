import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp } from './../../../services/authService'
import './SignupForm.css';

const SignupForm = ({ userType }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        
        if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
            setError('Please fill in all fields');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters long');
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(formData.email)) {
            setError('Please enter a valid email address');
            return;
        }

        setError('');
        
        // registration logic later
        console.log('Signup attempted:', { userType, ...formData });
    };

    return (
        <div className="app-container">
            <h1>Garden Grove</h1>
            <div className="signupContainer">
                <h2>Create {userType === 'staff' ? 'Staff' : 'Shopper'} Account</h2>
                
                <form onSubmit={handleSubmit} className="signupForm">
                    <div className="formGroup">
                        <label htmlFor="username">
                            {userType === 'staff' ? 'Staff Username' : 'Shopper Username'}
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            placeholder="Choose a username"
                        />
                    </div>

                    <div className="formGroup">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="formGroup">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="Choose a password"
                        />
                    </div>

                    <div className="formGroup">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            placeholder="Confirm your password"
                        />
                    </div>

                    {error && <div className="errorMessage">{error}</div>}

                    <button type="submit" className="signupButton">
                        Create Account
                    </button>

                    <p className="loginPrompt">
                        Already have an account? 
                        <button 
                            type="button" 
                            className="loginLink"
                            onClick={() => navigate('/')}
                        >
                            Log in here
                        </button>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default SignupForm;