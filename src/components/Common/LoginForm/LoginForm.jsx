import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';
import { signIn } from '../../../services/authService';
import { UserContext } from '../../../contexts/UserContext';

const LoginForm = ({ userType }) => {
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

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
        setIsSubmitting(true);
        
        try {
            const response = await signIn(formData);
            
            if (response && response.token) {
                if (response.role !== userType) {
                    setError(`This account doesn't have ${userType} permissions. Please use the correct login type.`);
                    setIsSubmitting(false);
                    return;
                }
                
                localStorage.setItem(
                    'user',
                    JSON.stringify({
                        username: response.username,
                        role: response.role,
                        _id: response._id
                    })
                );
                localStorage.setItem('token', response.token);
                
                setUser({
                    username: response.username,
                    role: response.role,
                    _id: response._id
                });
                
                if (response.role === 'staff') {
                    navigate('/staff/dashboard');
                } else {
                    navigate('/shopper/dashboard');
                }
            }
        } catch (error) {
            setError('Invalid username or password. Please try again.');
            console.error(error);
        } finally {
            setIsSubmitting(false);
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
                        placeholder="Enter username"
                        required
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
                        required
                    />
                </div>

                {error && <div className="errorMessage">{error}</div>}

                <button 
                    type="submit" 
                    className="loginButton"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Logging in...' : 'Log In'}
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