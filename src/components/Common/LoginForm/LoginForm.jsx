import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';
import { signIn } from './../../../services/authService'


const LoginForm = ({ userType }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if (!formData.username || !formData.password) {
            setError('Please fill in all fields');
            return;
        }

        setError('');
        
        try {
            const response = await signIn(formData);
            if (response && response.token) {
                localStorage.setItem(
                    'user',
                    JSON.stringify({
                        username: response.username,
                        role: response.role, 
                    })
                )
                   localStorage.setItem('token', response.token);
            }
                if (userType === 'staff') {
                    navigate('/staff/dashboard');
                } else {
                    navigate('/shopper/dashboard');
                }
        } catch (err) {
            setError('An error occurred. Please try again later.');
            console.error(err);
        }
    };

    return (
        <div className="loginContainer">
            <h2>{userType === 'staff' ? 'Staff Login' : 'Shopper Login'}</h2>
            
            <form onSubmit={handleSubmit} className="loginForm">
                <div className="formGroup">
                    <label htmlFor="username">
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        placeholder={`Enter username`}
                    />
                </div>

                <div className="formGroup">
                    <label htmlFor="password">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Enter password"
                    />
                </div>

                {error && <div className="errorMessage">{error}</div>}

                <button type="submit" className="loginButton">
                    Log In
                </button>

                {userType === 'shopper' && (
                    <p className="signupPrompt">
                        New shopper? 
                        <button 
                            type="button" 
                            className="signupLink"
                            onClick={() => navigate('/signup')}
                        >
                            Sign up here
                        </button>
                    </p>
                )}
            </form>
        </div>
    );
};

export default LoginForm;