import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Avatar, Button, Paper, Grid, Container } from '@material-ui/core';
import { GoogleLogin } from 'react-google-login';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Input from './Input';
import { AUTH } from '../../constants/actionTypes';
import { signup, signin } from '../../actions/auth';
import styles from './Auth.module.css';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

function Auth(props) {
    const [formData, setFormData] = useState(initialState);
    const [isSignup, setIsSignup] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isSignup) {
            dispatch(signup(formData, history));
        } else {
            dispatch(signin(formData, history));
        }
    }

    const handleChange = (e) => {
        //to set only the changing values
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const switchMode = () => {
        setFormData(initialState);
        setIsSignup(!isSignup);
        setShowPassword(false);
    }

    const googleSuccess = async (res) => {
        const result = res ?.profileObj;
        const token = res ?.tokenId;

        try {
            dispatch({ type: AUTH, data: { result, token } });
            history.push('/');
        } catch (error) {
            console.log(error);
        }
    }

    const googleError = () => {
        console.log("Sign in with google failed");
    }

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={styles.paper} elevation={3}>
                <Avatar className={styles.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <h1 className={styles.title}>{isSignup ? 'Sign Up' : 'Sign In'}</h1>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {isSignup && (
                            <>
                                <Input name="firstName" label="First name" handleChange={handleChange} autoFocus half />
                                <Input name="lastName" label="Last name" handleChange={handleChange} half />
                            </>
                        )}
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                        {isSignup &&
                            <Input name="confirmPassword" label="ReType Password" handleChange={handleChange} type="password" />
                        }
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={styles.submit}>
                        {isSignup ? 'Sign Up' : 'Sign In'}
                    </Button>
                    <GoogleLogin
                        color="primary"
                        className={styles.googleButton}
                        clientId="589903776373-6tvob5u01n5kklpoaab82ha6dqqq40cg.apps.googleusercontent.com"
                        onSuccess={googleSuccess}
                        onFailure={googleError}
                        cookiePolicy="single_host_origin"
                    />
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
}

export default Auth;