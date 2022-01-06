import React, { useState } from 'react';
import {
    Box,
    Card,
    CardContent,
    Stack,
    TextField,
    Typography,
    Button,
    Divider,
    InputAdornment,
    FormControlLabel,
    Checkbox
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { NavLink } from 'react-router-dom';
import { EmailOutlined, PasswordOutlined } from '@mui/icons-material';

const useStyle = makeStyles({
    main: {
        maxWidth: '100vw',
        marginTop: '15px',
        marginLeft: '240px',
    },
    home: {
        margin: '100px 350px',
    },
    heading: {
        marginBottom: '30px',
        textAlign: 'center',
    },
    productCard: {
        height: '600px',
        borderRadius: '25px',
        padding: '0 50px 50px',
        backgroundImage: `url(${'https://images.unsplash.com/photo-1490818387583-1baba5e638af?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80'})`,
    },
});

const Login = () => {
    const classes = useStyle();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return (
        <Box component="main" className={classes.main}>
            <Box className={classes.home}>
                <Card className={classes.productCard}>
                    <CardContent style={{ marginLeft: '50%' }}>
                        <Typography
                            variant="h4"
                            component="div"
                            className={classes.heading}
                        >
                            Login
                        </Typography>
                        <Stack spacing={3}>
                            <TextField
                                type={'email'}
                                label="Email Address"
                                variant="outlined"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <EmailOutlined />
                                        </InputAdornment>
                                    ),
                                }}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <TextField
                                type={'password'}
                                label="Password"
                                variant="outlined"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <PasswordOutlined />
                                        </InputAdornment>
                                    ),
                                }}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <FormControlLabel control={<Checkbox style={{padding: 0, marginRight: 5}} />} label="Remember Me" />
                            <NavLink to="/forgotPassword">
                                <Typography variant="subtitle1">
                                    Forgot Password?
                                </Typography>
                            </NavLink>
                            <Button variant="contained">Login</Button>
                            <Divider />
                            <Box display={'flex'}>
                                <Typography variant="subtitle1">
                                    Don't have an Account?&nbsp;&nbsp;
                                </Typography>
                                <NavLink to="/signup">
                                    <Typography variant="subtitle1" color='secondary'>
                                        SignUp now!
                                    </Typography>
                                </NavLink>
                            </Box>
                        </Stack>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
};

export default Login;
