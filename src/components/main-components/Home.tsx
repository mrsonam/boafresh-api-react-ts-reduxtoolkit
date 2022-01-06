import { Box, Stack } from '@mui/material';
import React from 'react';
import Banner from '../sub-components/Home/Banner';
import Categories from '../sub-components/Home/Categories';
import NewDishes from '../sub-components/Home/NewDishes';
import { makeStyles } from '@mui/styles';

const useStyle = makeStyles({
    main: {
        maxWidth: '100vw',
        marginTop: '15px',
        marginLeft: '240px',
    },
    home:{
        margin: '0 50px',
    }
});

const Home: React.FC = (): JSX.Element => {
    const classes = useStyle();
    return (
        <Box className={classes.main} component='main'>
            <Stack className={classes.home} spacing={3}>
                <Banner />
                <Categories />
                <NewDishes/>
            </Stack>
        </Box>
    );
};

export default Home;
