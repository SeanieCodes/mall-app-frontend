import { useNavigate } from 'react-router-dom';
import './SignoutButton.css';

const SignoutButton = () => {
    const navigate = useNavigate();

    const handleSignOut = () => {
        // authentication logistics later
        localStorage.removeItem('user');
        navigate('/');
    };

    return (
        <button 
            className="signOutButton" 
            onClick={handleSignOut}
        >
            Sign Out
        </button>
    );
};

export default SignoutButton;