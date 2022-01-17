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
import { NavLink } from 'react-router-dom';
import { EmailOutlined } from '@mui/icons-material';
import { useForgotPasswordMutation } from '../../services/user';
import { useForm } from 'react-hook-form';
import { useStyle } from '../styles/user';

const ForgotPassword: React.FC = (): JSX.Element => {
    const classes = useStyle();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [email, setEmail] = useState('');
    const [open, setOpen] = useState(true);

    const [resetPassword, responseInfo] = useForgotPasswordMutation();

    return (
        <Box component="main" className={classes.main}>
            <Box className={classes.inner}>
                <Card className={classes.formCard}>
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
                            <form
                                onSubmit={handleSubmit(() => {
                                    resetPassword(email);
                                    setEmail('');
                                    setOpen(open);
                                })}
                            >
                                <Stack spacing={2}>
                                    <TextField
                                        {...register('email', {
                                            required: 'Email cannot be empty',
                                            pattern: {
                                                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                                message:
                                                    'Invalid Email Address',
                                            },
                                        })}
                                        type={'text'}
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
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                    />
                                    <Typography
                                        color={'error'}
                                        variant="subtitle2"
                                    >
                                        {errors.email?.message}
                                    </Typography>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                    >
                                        Send Link
                                    </Button>
                                </Stack>
                            </form>
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
