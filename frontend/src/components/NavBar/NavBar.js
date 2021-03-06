import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { AppBar, Button, Toolbar, Avatar, Typography, Chip } from '@material-ui/core';
import logo from '../../images/memories.png';
import text from '../../images/memories-Text.png';
import useStyles from './styles';

function NavBar(props) {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const classes = useStyles();

    const handleLogout = () => {
        dispatch({ type: 'LOGOUT' });
        history.push('/');
        setUser(null);
    }

    useEffect(() => {
        const token = user?.token;

        if (token) {
            const decodedToken = decode(token);

            if (decodedToken.exp * 1000 < new Date().getTime()) {
                handleLogout();
            }
        }
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <Link to="/" className={classes.brandContainer}>
                <img className={classes.image} src={logo} alt="icon" style={{ height: '40px' }} />
                <img src={text} alt="icon" style={{ height: '40px' }} />
            </Link>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Chip
                            avatar={
                                    <Avatar alt={user?.result.name}
                                        src={user?.result.imageUrl || user?.result.name.charAt(0)}
                                    />
                                }   
                            label={user?.result.name}
                            variant="outlined"
                            size="large"
                        />&nbsp;&nbsp;
                        <Button variant="contained" color="secondary" className={classes.logout} onClick={handleLogout}>LogOut</Button>
                    </div>
                ) : (
                    <Button variant="contained" color="primary">
                        <Link to="/auth">Sign In</Link>
                    </Button>
                )}
            </Toolbar>
        </AppBar>

    );
}

export default NavBar;
