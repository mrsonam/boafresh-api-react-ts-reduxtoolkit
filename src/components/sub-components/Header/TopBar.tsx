import React, { useState } from 'react';
import { SearchRounded } from '@mui/icons-material';
import {
    InputAdornment,
    TextField,
    AppBar,
    Toolbar,
    Button,
    IconButton,
    Typography,
    Badge,
} from '@mui/material';
import {ShoppingCartOutlined} from '@mui/icons-material';
import { NavLink } from 'react-router-dom';
// import './TopBar.css';
import { makeStyles } from '@mui/styles';

const useStyle = makeStyles({
    appBar: {
        background: 'transparent',
        boxShadow: 'none',
        width: `calc(100% - 240px)`,
        marginLeft: '240px',
    },
    topBar: {
        margin: '15px 15px 15px 25px'
    }
});

const drawerWidth = 210;

const TopBar = () => {
    const classes = useStyle();
    const [query, setQuery] = useState('');
    return (
        <AppBar
            className={classes.appBar}
            position="static"
        >
            <Toolbar className={classes.topBar}>
                <TextField
                    size="small"    
                    sx={{
                        [`& fieldset`]: {
                            borderWidth: '2px',
                            borderRadius: '16px',
                        },
                    }}
                    placeholder="Search..."
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchRounded />
                            </InputAdornment>
                        ),
                    }}
                    variant="outlined"
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                    }}
                />
                <NavLink to={`/products/${query}`}>
                    <Button onClick={() => setQuery('')}>Search</Button>
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
                        <ShoppingCartOutlined fontSize="large" color="primary" />
                    </Badge>
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default TopBar;
