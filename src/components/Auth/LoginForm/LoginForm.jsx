import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';

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

    const handleSubmit = (event) => {
        event.preventDefault();
        
        if (!formData.username || !formData.password) {
            setError('Please fill in all fields');
            return;
        }

        setError('');
        
        // add authentication logic
        console.log('Login attempted:', { userType, ...formData });
    };

    return (
        <div className="loginContainer">
            <h2>{userType === 'staff' ? 'Staff Login' : 'Shopper Login'}</h2>
            
            <form onSubmit={handleSubmit} className="loginForm">
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
                        placeholder={`Enter ${userType} username`}
                    />
                </div>

                <div className="formGroup">
                    <label htmlFor="password">
                        {userType === 'staff' ? 'Staff Password' : 'Shopper Password'}
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