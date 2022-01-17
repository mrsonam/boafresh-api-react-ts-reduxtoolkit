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
import {
    EmailOutlined,
    PasswordOutlined,
    PhoneAndroidOutlined,
    AccountBoxOutlined,
} from '@mui/icons-material';
import { useCreateNewUserMutation } from '../../services/user';
import { NavLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useStyle } from '../styles/user';

const CreateAccount: React.FC = (): JSX.Element => {
    if(localStorage.getItem('token') !== null){
        window.location.href = '/boafresh-api-react-ts-reduxtoolkit/profile'
    }
    
    const classes = useStyle();

    const defaultInput = {firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',}

    const [input, setInput] = useState(defaultInput);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [open, setOpen] = useState(true);

    const [createUser, responseInfo] = useCreateNewUserMutation();

    return (
        <Box component="main" className={classes.main}>
            <Box className={classes.inner}>
                <Card className={classes.formCard} elevation={5}>
                    <CardContent style={{ marginLeft: '50%' }}>
                        <Typography
                            variant="h4"
                            component="div"
                            className={classes.heading}
                        >
                            Create an Account
                        </Typography>

                        <Stack spacing={3}>
                            <form
                                onSubmit={handleSubmit(() => {
                                    createUser(input);
                                    setOpen(true);
                                    setInput(defaultInput)
                                })}
                            >
                                <Stack spacing={2}>
                                    <TextField
                                        {...register('firstName', {
                                            required:
                                                'First Name cannot be empty',
                                        })}
                                        type="text"
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
                                    <Typography
                                        color={'error'}
                                        variant="subtitle2"
                                    >
                                        {errors.firstName?.message}
                                    </Typography>
                                    <TextField
                                        {...register('lastName', {
                                            required:
                                                'Last Name cannot be empty',
                                        })}
                                        type="text"
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
                                    <Typography
                                        color={'error'}
                                        variant="subtitle2"
                                    >
                                        {errors.lastName?.message}
                                    </Typography>
                                    <TextField
                                        {...register('phone', {
                                            required:
                                                'Phone Number cannot be empty',
                                            minLength: {
                                                value: 10,
                                                message:
                                                    'Phone Number must be of 10 digits',
                                            },
                                            maxLength: {
                                                value: 10,
                                                message:
                                                    'Phone Number must be of 10 digits',
                                            },
                                        })}
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
                                    <Typography
                                        color={'error'}
                                        variant="subtitle2"
                                    >
                                        {errors.phone?.message}
                                    </Typography>
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
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        // onClick={handleClick}
                                    >
                                        Create Account
                                    </Button>
                                </Stack>
                            </form>
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
                            Oops! There was some issue while creating your
                            account.
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
