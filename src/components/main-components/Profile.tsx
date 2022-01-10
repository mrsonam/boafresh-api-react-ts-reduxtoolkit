import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Stack,
    TextField,
    Button,
    InputAdornment,
    Avatar,
    Snackbar,
    Alert,
} from '@mui/material';
import {
    AccountBoxOutlined,
    PhoneAndroidOutlined,
    EmailOutlined,
} from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import {
    useGetUserProfileQuery,
    useUpdateUserProfileMutation,
} from '../../services/user';

const useStyle = makeStyles({
    main: {
        maxWidth: '100vw',
        marginTop: '15px',
        marginLeft: '240px',
    },
    home: {
        margin: '0 50px',
    },
    heading: {
        marginBottom: '30px',
        textAlign: 'center',
    },
});

const Profile: React.FC = (): JSX.Element => {
    const classes = useStyle();

    const { data, isLoading, error } = useGetUserProfileQuery();

    const [firstName, setFirstName] = useState(data ? data.data.firstName : '');
    const [lastName, setLastName] = useState(data ? data.data.lastName : '');
    const [email, setEmail] = useState(data ? data.data.email : '');
    const [phone, setPhone] = useState(data ? data.data.mobileNumber : '');
    const [image, setImage] = useState(data ? data.data.image : '');

    const [open, setOpen] = useState(true);

    const [updateUserProfile, responseInfo] = useUpdateUserProfileMutation();

    useEffect(() => {
        setFirstName(data ? data.data.firstName : '');
        setLastName(data ? data.data.lastName : '');
        setEmail(data ? data.data.email : '');
        setPhone(data ? data.data.mobileNumber : '');
        setImage(data ? data.data.image : '');
    }, [data]);
    return error ? (
        <>Something is Wrong!</>
    ) : (
        <Box className={classes.main} component="main">
            <Box className={classes.home}>
                {isLoading ? (
                    <>Loading...</>
                ) : (
                    <Box>
                        <Typography
                            variant="h4"
                            component="div"
                            className={classes.heading}
                        >
                            My Account
                        </Typography>
                        <Stack spacing={3}>
                            <Avatar
                                alt="Profile Pic"
                                src={image}
                                sx={{ width: 300, height: 300, mx: 'auto' }}
                            />
                            <Stack direction="row" spacing={3}>
                                <TextField
                                    label="First Name"
                                    variant="outlined"
                                    fullWidth
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <AccountBoxOutlined />
                                            </InputAdornment>
                                        ),
                                    }}
                                    value={firstName}
                                    onChange={(e) =>
                                        setFirstName(e.target.value)
                                    }
                                />
                                <TextField
                                    label="Last Name"
                                    variant="outlined"
                                    fullWidth
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <AccountBoxOutlined />
                                            </InputAdornment>
                                        ),
                                    }}
                                    value={lastName}
                                    onChange={(e) =>
                                        setLastName(e.target.value)
                                    }
                                />{' '}
                            </Stack>

                            <TextField
                                type={'number'}
                                label="Phone Number"
                                variant="outlined"
                                InputProps={{
                                    readOnly: true,
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <PhoneAndroidOutlined />
                                        </InputAdornment>
                                    ),
                                }}
                                value={phone}
                            />
                            <TextField
                                type={'email'}
                                label="Email Address"
                                variant="outlined"
                                InputProps={{
                                    readOnly: true,
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <EmailOutlined />
                                        </InputAdornment>
                                    ),
                                }}
                                value={email}
                            />
                            <Button
                                variant="contained"
                                onClick={() => {
                                    updateUserProfile({ firstName, lastName });
                                    setOpen(true);
                                    setTimeout(window.location.reload, 100);
                                }}
                            >
                                Update
                            </Button>
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
                                    Profile Updated Successfuly
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
                                    Something went wrong while updating your
                                    Profile
                                </Alert>
                            </Snackbar>
                        ) : (
                            <></>
                        )}
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default Profile;
