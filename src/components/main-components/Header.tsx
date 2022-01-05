import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import TopBar from '../sub-components/Header/TopBar';
import SideBar from '../sub-components/Header/SideBar';
import './Header.css'

export default function Header() {
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <TopBar />
            <SideBar />
        </Box>
    );
}
