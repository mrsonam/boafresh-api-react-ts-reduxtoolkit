import React from 'react';
import { SearchRounded } from '@mui/icons-material';
import {
    InputAdornment,
    TextField,
    AppBar,
    Toolbar,
    Button,
    IconButton,
    Typography,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useGetAllCategoriesQuery } from '../../../services/category';
import './TopBar.css';
import { height } from '@mui/system';

const drawerWidth = 240;

const TopBar = () => {
    const { data, error, isLoading } = useGetAllCategoriesQuery();
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
                size='small'
                className='searchBar'
                    sx={{
                        [`& fieldset`]: {
                            borderWidth: '2px',
                            borderRadius: '16px',
                            width: '400px',
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
                />
                <Typography
                    variant="h6"
                    component="div"
                    sx={{ flexGrow: 1 }}
                ></Typography>
                <IconButton
                className='cartIcon'
                    size="large"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                >
                    <ShoppingCartIcon fontSize="large" color='primary'/>
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default TopBar;
