import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../../contexts/UserContext';
import './SignoutButton.css';

const SignoutButton = () => {
    const navigate = useNavigate();
    const { logout } = useContext(UserContext);

    const handleSignOut = () => {
        logout(); 
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