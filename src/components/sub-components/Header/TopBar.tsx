import React, { useState, useEffect } from 'react';
import { SearchRounded } from '@mui/icons-material';
import {
    Autocomplete,
    TextField,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Badge,
    Avatar,
    Stack,
    MenuItem,
    Menu,
    Skeleton,
} from '@mui/material';
import { ShoppingCartOutlined } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';
import { useGetAllProductsQuery } from '../../../services/products';
import { makeStyles } from '@mui/styles';
import { useGetUserProfileQuery } from '../../../services/user';
import { useGetCartQuery } from '../../../services/cart';

const useStyle = makeStyles({
    appBar: {
        background: 'transparent',
        boxShadow: 'none',
        width: `calc(100% - 240px)`,
        marginLeft: '240px',
    },
    topBar: {
        margin: '15px 15px 15px 25px',
    },
});

const TopBar: React.FC = (): JSX.Element => {
    const classes = useStyle();

    const [query, setQuery] = useState('');

    const userProfile = useGetUserProfileQuery();
    const [imageUrl, setImageUrl] = useState('');
    const [fullName, setFullName] = useState('');
    const [points, setPoints] = useState(0);

    const cart = useGetCartQuery();
    const [totalItems, setTotalItems] = useState(0);

    const products = useGetAllProductsQuery();
    let options: string[] = [];
    if (products.isSuccess && products.data) {
        products.data.data.forEach((product) => {
            options.push(product.title);
        });
    }

    const token = localStorage.getItem('token');

    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        setTotalItems(cart.data?.data.cartProducts.length || 0);
    }, [cart]);

    useEffect(() => {
        setImageUrl(userProfile.data?.data.image || '');
        setFullName(
            `${userProfile.data?.data.firstName} ${userProfile.data?.data.lastName}` ||
                '',
        );
        setPoints(
            userProfile.data?.data.total_loyalty_points === null
                ? 0
                : userProfile.data?.data.total_loyalty_points || 0
        );
    }, [userProfile]);

    return (
        <AppBar className={classes.appBar} position="static">
            <Toolbar className={classes.topBar}>
                <Autocomplete
                    freeSolo
                    size="small"
                    sx={{
                        width: '300px',
                        [`& fieldset`]: {
                            borderWidth: '2px',
                        },
                    }}
                    options={options}
                    inputValue={query}
                    onInputChange={(event: any, newValue: string) => {
                        setQuery(newValue);
                    }}
                    renderInput={(params) => (
                        <TextField
                            label="Search..."
                            {...params}
                            variant="outlined"
                        />
                    )}
                />

                <NavLink
                    to={`/boafresh-api-react-ts-reduxtoolkit/products/${query}`}
                >
                    <IconButton
                        className="cartIcon"
                        size="large"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={() => setQuery('')}
                    >
                        <SearchRounded />
                    </IconButton>
                </NavLink>
                <Typography
                    variant="h6"
                    component="div"
                    sx={{ flexGrow: 1 }}
                ></Typography>
                <IconButton
                    className="cartIcon"
                    size="large"
                    sx={{ mr: 2 }}
                >
                    <NavLink to='/boafresh-api-react-ts-reduxtoolkit/cart'>
                    <Badge badgeContent={totalItems} color="secondary" showZero>
                        <ShoppingCartOutlined
                            fontSize="large"
                            color="primary"
                        />
                    </Badge></NavLink>
                </IconButton>
                {token !== null ? (
                    <Stack direction="row" spacing={2}>
                        <div>
                            <IconButton
                                id="basic-button"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={() => setOpen(true)}
                            >
                                <Avatar
                                    alt="Profile Pic"
                                    src={imageUrl}
                                    sx={{ width: 45, height: 45 }}
                                />
                            </IconButton>
                            <Menu
                                id="basic-menu"
                                open={open}
                                onClose={() => setOpen(false)}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                                anchorOrigin={{
                                    vertical: 72,
                                    horizontal: 'right',
                                }}
                            >
                                <NavLink to="/boafresh-api-react-ts-reduxtoolkit/profile">
                                    <MenuItem>Profile</MenuItem>
                                </NavLink>
                                <NavLink to="/boafresh-api-react-ts-reduxtoolkit/changePassword">
                                    <MenuItem>Change Password</MenuItem>
                                </NavLink>
                                <MenuItem
                                    onClick={() => {
                                        localStorage.removeItem('token');
                                        window.location.href =
                                            '/boafresh-api-react-ts-reduxtoolkit';
                                    }}
                                >
                                    Logout
                                </MenuItem>
                            </Menu>
                        </div>
                        {userProfile.isLoading ? (
                            <Stack style={{ marginRight: 10 }}>
                                <Skeleton
                                    animation="wave"
                                    variant="text"
                                    width={100}
                                    height={30}
                                />
                                <Skeleton
                                    animation="wave"
                                    variant="text"
                                    width={100}
                                    height={25}
                                />
                            </Stack>
                        ) : (
                            <Stack style={{ marginRight: 10, marginTop: 5 }}>
                                <NavLink to="/boafresh-api-react-ts-reduxtoolkit/profile">
                                    <Typography component="div" color="#000">
                                        {fullName}
                                    </Typography>
                                    <Typography
                                        variant="subtitle2"
                                        component="div"
                                        color="text.disabled"
                                    >
                                        Loyalty Points: {points}
                                    </Typography>
                                </NavLink>
                            </Stack>
                        )}
                    </Stack>
                ) : (
                    <></>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default TopBar;
