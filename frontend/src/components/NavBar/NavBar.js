import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { AppBar, Button, Toolbar, Avatar, Typography } from '@material-ui/core';
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
        <AppBar className={classes.appBar} position="static" color="inherit">
            <Link to="/" className={classes.brandContainer}>
                <img className={classes.image} src={logo} alt="icon" style={{ height: '40px' }} />
                <img src={text} alt="icon" style={{ height: '40px' }} />
            </Link>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar
                            className={classes.purple}
                            alt={user?.result.name}
                            src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
                        <Button variant="contained" color="secondary" className={classes.logout} onClick={handleLogout}>LogOut</Button>
                    </div>
                ) : (
                        <Button component={Link} to="/auth" variant="contained" color="primary">
                                Sign In
                        </Button>
                    )}
            </Toolbar>
        </AppBar>

    );
}

export default NavBar;