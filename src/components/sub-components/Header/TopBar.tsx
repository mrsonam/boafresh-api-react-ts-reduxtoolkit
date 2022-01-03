import React from 'react';
import { SearchRounded } from '@mui/icons-material';
import { InputAdornment, TextField, AppBar, Toolbar } from '@mui/material';
import { useGetAllCategoriesQuery } from '../../../services/category';

const drawerWidth = 240;

const TopBar = () => {
    const { data, error, isLoading } = useGetAllCategoriesQuery();
    return (
        <AppBar
            position="fixed"
            sx={{
                width: `calc(100% - ${drawerWidth}px)`,
                ml: `${drawerWidth}px`,
            }}
            style={{ background: 'transparent', boxShadow: 'none' }}
        >
            <Toolbar>
                <TextField
                    id="input-with-icon-textfield"
                    sx={{
                        [`& fieldset`]: {
                            borderWidth: '2px',
                            borderRadius: 6,
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
            </Toolbar>
        </AppBar>
    );
};

export default TopBar;
