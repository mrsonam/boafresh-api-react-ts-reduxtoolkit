import React, { useState } from 'react';
import {
    Box,
    Card,
    CardContent,
    Stack,
    TextField,
    Typography,
    Button,
    InputAdornment,
    Snackbar,
    Alert,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import {
    EmailOutlined,
    PasswordOutlined,
    PhoneAndroidOutlined,
    AccountBoxOutlined,
} from '@mui/icons-material';
import { useCreateNewUserMutation } from '../../services/user';

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

const CreateAccount = () => {
    const classes = useStyle();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [open, setOpen] = useState(true);
    const [createUser, responseInfo] = useCreateNewUserMutation();
    console.log(responseInfo);
    return (
        <Box component="main" className={classes.main}>
            <Box className={classes.home}>
                <Card className={classes.productCard} elevation={5}>
                    <CardContent style={{ marginLeft: '50%' }}>
                        <Typography
                            variant="h4"
                            component="div"
                            className={classes.heading}
                        >
                            Create an Account
                        </Typography>
                        <Stack spacing={3}>
                            <TextField
                                label="First Name"
                                variant="outlined"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AccountBoxOutlined />
                                        </InputAdornment>
                                    ),
                                }}
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                            <TextField
                                label="Last Name"
                                variant="outlined"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AccountBoxOutlined />
                                        </InputAdornment>
                                    ),
                                }}
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                            <TextField
                                type={'number'}
                                label="Phone Number"
                                variant="outlined"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <PhoneAndroidOutlined />
                                        </InputAdornment>
                                    ),
                                }}
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
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
                            <Button
                                variant="contained"
                                onClick={() => {
                                    createUser({
                                        firstName,
                                        lastName,
                                        email,
                                        phone,
                                        password,
                                    });
                                }}
                            >
                                Create
                            </Button>
                        </Stack>
                    </CardContent>
                </Card>
                {responseInfo.isError ? (
                    <Snackbar open={open} autoHideDuration={6000}>
                        <Alert severity="error" sx={{ width: '100%' }}>
                            Error
                        </Alert>
                    </Snackbar>
                ) : responseInfo.isSuccess ? (
                    <Snackbar
                        open={open}
                        autoHideDuration={6000}
                    >
                        <Alert
                            severity="success"
                            sx={{ width: '100%' }}
                        >
                            Account Created Successfuly
                        </Alert>
                    </Snackbar>
                ) : (
                    <></>
                )}
            </Box>
        </Box>
    );
};

export default CreateAccount;
