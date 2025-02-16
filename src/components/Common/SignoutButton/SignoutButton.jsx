import { useNavigate } from 'react-router-dom';
import './SignOut.css';

const SignOut = () => {
    const navigate = useNavigate();

    const handleSignOut = () => {
        // authentication logistics later
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

export default SignOut;