import { useContext } from 'react';
import { Link } from 'react-router';

import { userContext } from '../../contexts/UserContext';

const NavBar = () => {
    const { user, setUser } = useContext(userContext);

    const handleSignOut = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <nav>
        <Link to='/'>Home</Link>
        { user ? (
            <ul>
            <li><Link to='/lists'>My Lists</Link></li>
            <li><Link to='/lists/new'>New List</Link></li>
            <li><Link to='/' onClick={handleSignOut}>Sign Out</Link></li>
            </ul>
        ) : (
            <ul>
                <li><Link to='/sign-in'>Sign In</Link></li>
                <li><Link to='/sign-up'>Sign Up</Link></li>
            </ul>
        )}
        
        </nav>
    )
}

export default NavBar;