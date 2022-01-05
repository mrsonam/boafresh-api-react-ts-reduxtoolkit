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
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { NavLink } from 'react-router-dom';
import './TopBar.css';

const drawerWidth = 240;

const TopBar = () => {
    const [query, setQuery] = useState('');
    return (
        <AppBar
            position="static"
            sx={{
                width: `calc(100% - ${drawerWidth}px)`,
                ml: `${drawerWidth}px`,
            }}
            style={{ background: 'transparent', boxShadow: 'none' }}
        >
            <Toolbar className="topBar">
                <TextField
                    size="small"
                    className="searchBar"
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
                    onChange={(e) => {setQuery(e.target.value)}}
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
                        <ShoppingCartIcon fontSize="large" color="primary" />
                    </Badge>
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default TopBar;
