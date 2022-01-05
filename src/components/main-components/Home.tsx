import { Box, Stack } from '@mui/material';
import React from 'react';
import Banner from '../sub-components/Home/Banner';
import Categories from '../sub-components/Home/Categories';
import NewDishes from '../sub-components/Home/NewDishes';
import './Home.css';

const Home: React.FC = (): JSX.Element => {
    return (
        <Box className="main" component='main'>
            <Stack className="home" spacing={3}>
                <Banner />
                <Categories />
                <NewDishes/>
            </Stack>
        </Box>
    );
};

export default Home;
