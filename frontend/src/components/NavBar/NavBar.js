import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { AppBar, Button, Toolbar, Avatar } from '@material-ui/core';
import memories from '../../images/memories.png';
import styles from './NavBar.module.css';

function NavBar(props) {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const handleLogout = () => {
        dispatch({ type: 'LOGOUT'});
        history.push('/');
        setUser(null);
    }

    useEffect(() => {
        const token = user?.token;

        if(token) {
            const decodedToken  = decode(token);

            if(decodedToken.exp * 1000 < new Date().getTime()) {
                handleLogout();
            }
        }
        setUser(JSON.parse(localStorage.getItem('profile')));
    },[location]);

    return (
        <AppBar className={styles.appBar} position="static" color="inherit">
            <div className={styles.brandContainer}>
                <img className={styles.image} src={memories} alt="memories" style={{ height: '60px' }} />
                <h1><Link to="/" className={styles.title}>Memories</Link></h1>
            </div>
            <Toolbar>
                {user ? (
                    <div className={styles.profile}>
                        <Avatar
                            alt={user?.result.name}
                            src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
                        <h4 className={styles.userName}>{user?.result.name}</h4>
                        <Button variant="contained" color="secondary" onClick={handleLogout}>LogOut</Button>
                    </div>
                ) : (
                        <Button variant="contained" color="primary" >
                            <Link to="/auth" className={styles.btn}>
                                Sign In
                            </Link>
                        </Button>
                    )}
            </Toolbar>
        </AppBar>

    );
}

export default NavBar;