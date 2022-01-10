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
    Checkbox,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { NavLink } from 'react-router-dom';
import { EmailOutlined, PasswordOutlined } from '@mui/icons-material';
import { useLoginUserMutation } from '../../services/user';

const useStyle = makeStyles({
    main: {
        maxWidth: '100vw',
        marginTop: '15px',
        marginLeft: '240px',
    },
    home: {
        margin: '100px 150px',
    },
    heading: {
        marginBottom: '30px',
        textAlign: 'center',
    },
    productCard: {
        height: '100%',
        borderRadius: '25px',
        padding: '0 50px 50px',
        backgroundImage: `url(${'https://images.unsplash.com/photo-1490818387583-1baba5e638af?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80'})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
    },
});

const Login : React.FC = (): JSX.Element => {
    const classes = useStyle();

    const [input, setInput] = useState({
        email: '',
        password: ''
    });

    const [loginUser, responseInfo] = useLoginUserMutation();
    if (responseInfo.isSuccess) {
        window.localStorage.setItem(
            'token',
            `"Bearer ${responseInfo.data.access_token}"`,
        );
        window.location.href = '/boafresh-api-react-ts-reduxtoolkit';
    }

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
                                value={input.email}
                                onChange={(e) => setInput({...input, email:(e.target.value)})}
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
                                value={input.password}
                                onChange={(e) => setInput({...input, password:(e.target.value)})}
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        style={{ padding: 0, marginRight: 5 }}
                                    />
                                }
                                label="Remember Me"
                            />
                            <NavLink to="/boafresh-api-react-ts-reduxtoolkit/forgotPassword">
                                <Typography variant="subtitle1">
                                    Forgot Password?
                                </Typography>
                            </NavLink>
                            <Button
                                variant="contained"
                                onClick={() => {
                                    loginUser(input);
                                }}
                            >
                                Login
                            </Button>
                            <Divider />
                            <Box display={'flex'}>
                                <Typography variant="subtitle1">
                                    Don't have an Account?&nbsp;&nbsp;
                                </Typography>
                                <NavLink to="/boafresh-api-react-ts-reduxtoolkit/signup">
                                    <Typography
                                        variant="subtitle1"
                                        color="secondary"
                                    >
                                        Signup now!
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
