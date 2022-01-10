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
    Divider,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import {
    EmailOutlined,
    PasswordOutlined,
    PhoneAndroidOutlined,
    AccountBoxOutlined,
} from '@mui/icons-material';
import { useCreateNewUserMutation } from '../../services/user';
import { NavLink } from 'react-router-dom';

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

const CreateAccount: React.FC = (): JSX.Element => {
    const classes = useStyle();

    const [input, setInput] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        password: '',
    });

    const [open, setOpen] = useState(true);

    const [createUser, responseInfo] = useCreateNewUserMutation();

    const handleClick = () => {
        createUser(input);
        setOpen(true);
    };

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
                                value={input.firstName}
                                onChange={(e) =>
                                    setInput({
                                        ...input,
                                        firstName: e.target.value,
                                    })
                                }
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
                                value={input.lastName}
                                onChange={(e) =>
                                    setInput({
                                        ...input,
                                        lastName: e.target.value,
                                    })
                                }
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
                                value={input.phone}
                                onChange={(e) =>
                                    setInput({
                                        ...input,
                                        phone: e.target.value,
                                    })
                                }
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
                                value={input.email}
                                onChange={(e) =>
                                    setInput({
                                        ...input,
                                        email: e.target.value,
                                    })
                                }
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
                                onChange={(e) =>
                                    setInput({
                                        ...input,
                                        password: e.target.value,
                                    })
                                }
                            />
                            <Button variant="contained" onClick={handleClick}>
                                Create Account
                            </Button>
                            <Divider />
                            <Box display={'flex'} className={classes.heading}>
                                <Typography variant="subtitle1">
                                    Already have an Account?&nbsp;&nbsp;
                                </Typography>
                                <NavLink to="/boafresh-api-react-ts-reduxtoolkit/login">
                                    <Typography
                                        variant="subtitle1"
                                        color="secondary"
                                    >
                                        Login here
                                    </Typography>
                                </NavLink>
                            </Box>
                        </Stack>
                    </CardContent>
                </Card>
                {responseInfo.isError ? (
                    <Snackbar
                        open={open}
                        autoHideDuration={6000}
                        onClose={() => setOpen(false)}
                    >
                        <Alert
                            severity="error"
                            sx={{ width: '100%' }}
                            onClose={() => setOpen(false)}
                        >
                            Error
                        </Alert>
                    </Snackbar>
                ) : responseInfo.isSuccess ? (
                    <Snackbar
                        open={open}
                        autoHideDuration={6000}
                        onClose={() => setOpen(false)}
                    >
                        <Alert
                            severity="success"
                            sx={{ width: '100%' }}
                            onClose={() => setOpen(false)}
                        >
                            Account Created Successfuly!
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
