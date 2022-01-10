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
    Snackbar,
    Alert,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { NavLink } from 'react-router-dom';
import { EmailOutlined } from '@mui/icons-material';
import { useForgotPasswordMutation } from '../../services/user';

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

const ForgotPassword: React.FC = (): JSX.Element => {
    const classes = useStyle();

    const [email, setEmail] = useState('');
    const [open, setOpen] = useState(true);

    const [resetPassword, responseInfo] = useForgotPasswordMutation();

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
                            Forgot Password?
                        </Typography>
                        <Stack spacing={3}>
                            <Typography variant="subtitle1">
                                Lost your password? Please enter your email
                                address. You will receive a link to create a new
                                password via email.
                            </Typography>
                            <br />
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
                            <Button
                                variant="contained"
                                onClick={() => {
                                    resetPassword(email);
                                    setEmail('');
                                    setOpen(open);
                                }}
                            >
                                Send Link
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
                        {responseInfo.isSuccess ? (
                            <Snackbar
                                open={open}
                                autoHideDuration={5000}
                                onClose={() => setOpen(false)}
                            >
                                <Alert
                                    severity="success"
                                    sx={{ width: '100%' }}
                                    onClose={() => setOpen(false)}
                                >
                                    Link to reset password has been <br /> sent
                                    to {email}
                                </Alert>
                            </Snackbar>
                        ) : responseInfo.isError ? (
                            <Snackbar
                                open={open}
                                autoHideDuration={5000}
                                onClose={() => setOpen(false)}
                            >
                                <Alert
                                    severity="error"
                                    sx={{ width: '100%' }}
                                    onClose={() => setOpen(false)}
                                >
                                    The provided email does not exist in our
                                    system.
                                </Alert>
                            </Snackbar>
                        ) : (
                            <></>
                        )}
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
};

export default ForgotPassword;
