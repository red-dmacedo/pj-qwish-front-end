import { useContext } from 'react';
import { Link } from 'react-router';
import styles from "./NavBar.module.scss";

import { UserContext } from '../../contexts/UserContext';

const NavBar = () => {
    const { user, setUser } = useContext(UserContext);

    const handleSignOut = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <nav className={styles.container}>
        { user ? (
            <ul>
            <li><Link to='/'>Home</Link></li>
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