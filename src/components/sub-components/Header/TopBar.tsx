import React, { useState } from 'react';
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
} from '@mui/material';
import { ShoppingCartOutlined } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';
import { useGetAllProductsQuery } from '../../../services/products';
import { makeStyles } from '@mui/styles';
import { useGetUserProfileQuery } from '../../../services/user';

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

const TopBar = () => {
    const classes = useStyle();

    const [query, setQuery] = useState('');

    const userProfile = useGetUserProfileQuery();
    let imageUrl = '';
    if (userProfile.isSuccess && userProfile.data) {
        imageUrl = userProfile.data.data.image;
    }

    const products = useGetAllProductsQuery();
    let options: string[] = [];
    if (products.isSuccess && products.data) {
        products.data.data.forEach((product) => {
            options.push(product.title);
        });
    }

    const token = localStorage.getItem('token');

    return (
        <AppBar className={classes.appBar} position="static">
            <Toolbar className={classes.topBar}>
                <Autocomplete
                    freeSolo
                    disableClearable
                    size="small"
                    sx={{
                        width: '300px',
                        [`& fieldset`]: {
                            borderWidth: '2px',
                            borderRadius: '16px',
                        },
                    }}
                    options={options}
                    inputValue={query}
                    onInputChange={(event: any, newValue: string) => {
                        setQuery(newValue);
                    }}
                    renderInput={(params) => (
                        <TextField placeholder="Search" {...params} />
                    )}
                />

                <NavLink to={`/products/${query}`}>
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
                    aria-label="menu"
                    sx={{ mr: 2 }}
                >
                    <Badge badgeContent={0} color="secondary" showZero>
                        <ShoppingCartOutlined
                            fontSize="large"
                            color="primary"
                        />
                    </Badge>
                </IconButton>
                {token !== null ? (
                    <Avatar
                        alt="Profile Pic"
                        src={imageUrl}
                        sx={{ width: 45, height: 45, mr: 1 }}
                    />
                ) : (
                    <></>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default TopBar;
