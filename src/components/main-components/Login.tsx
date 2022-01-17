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
import { NavLink } from 'react-router-dom';
import { EmailOutlined, PasswordOutlined } from '@mui/icons-material';
import { useLoginUserMutation } from '../../services/user';
import { useForm } from 'react-hook-form';
import { useStyle } from '../styles/user';

const Login: React.FC = (): JSX.Element => {
    if(localStorage.getItem('token') !== null){
        window.location.href = '/boafresh-api-react-ts-reduxtoolkit/profile'
    }
    const classes = useStyle();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [input, setInput] = useState({
        email: '',
        password: '',
    });

    const [loginUser, responseInfo] = useLoginUserMutation();
    if (responseInfo.isSuccess) {
        window.localStorage.setItem(
            'token',
            `"Bearer ${responseInfo.data.access_token}"`,
        );
        window.location.href = '/boafresh-api-react-ts-reduxtoolkit';
    }

    if (responseInfo.isError){
        console.log(responseInfo.error)
    }

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
                            Login
                        </Typography>
                        <Stack spacing={3}>
                            <form
                                onSubmit={handleSubmit(() => {
                                    loginUser(input);
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
                                        value={input.email}
                                        onChange={(e) =>
                                            setInput({
                                                ...input,
                                                email: e.target.value,
                                            })
                                        }
                                    />
                                    <Typography
                                        color={'error'}
                                        variant="subtitle2"
                                    >
                                        {errors.email?.message}
                                    </Typography>
                                    <TextField
                                        {...register('password', {
                                            required:
                                                'Password cannot be empty',
                                            minLength: {
                                                value: 8,
                                                message:
                                                    'Password must be atleast 8 characters long',
                                            },
                                        })}
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
                                    <Typography
                                        color={'error'}
                                        variant="subtitle2"
                                    >
                                        {errors.password?.message}
                                    </Typography>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                style={{
                                                    padding: 0,
                                                    marginRight: 5,
                                                }}
                                            />
                                        }
                                        label="Remember Me"
                                    />
                                    <NavLink to="/boafresh-api-react-ts-reduxtoolkit/forgotPassword">
                                        <Typography variant="subtitle1">
                                            Forgot Password?
                                        </Typography>
                                    </NavLink>
                                    <Button variant="contained" type="submit">
                                        Login
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
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
};

export default Login;
