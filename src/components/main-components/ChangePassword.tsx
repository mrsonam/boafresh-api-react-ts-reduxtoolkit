import React, { useState } from 'react';
import {
    Box,
    Typography,
    Stack,
    TextField,
    Button,
    InputAdornment,
    Snackbar,
    Alert,
} from '@mui/material';
import { PasswordOutlined } from '@mui/icons-material';
import { useChangePasswordMutation } from '../../services/user';
import { useStyle } from '../styles/constants';

const ChangePassword: React.FC = (): JSX.Element => {
    if(localStorage.getItem('token') === null){
        window.location.href = '/boafresh-api-react-ts-reduxtoolkit/login'
    }

    const classes = useStyle();

    const [changePassword, responseInfo] = useChangePasswordMutation();

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [open, setOpen] = useState(true);

    return (
        <Box className={classes.main} component="main">
            <Box className={classes.inner}>
                <Box>
                    <Typography
                        variant="h4"
                        component="div"
                        className={classes.heading}
                    >
                        Change Password
                    </Typography>
                    <Stack spacing={3}>
                        <TextField
                            type={'password'}
                            label="Old Password"
                            variant="outlined"
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PasswordOutlined />
                                    </InputAdornment>
                                ),
                            }}
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                        />
                        <TextField
                            type={'password'}
                            label="New Password"
                            variant="outlined"
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PasswordOutlined />
                                    </InputAdornment>
                                ),
                            }}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />

                        <TextField
                            type={'password'}
                            label="Confirm Password"
                            variant="outlined"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PasswordOutlined />
                                    </InputAdornment>
                                ),
                            }}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <Button
                            variant="contained"
                            onClick={() => {
                                changePassword({
                                    oldPassword,
                                    newPassword,
                                    confirmPassword,
                                });
                                setOpen(true);
                            }}
                        >
                            Change
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
                                Your Password has been Changed
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
                                Sorry! There was some issue while changing your
                                password.
                            </Alert>
                        </Snackbar>
                    ) : (
                        <></>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default ChangePassword;
