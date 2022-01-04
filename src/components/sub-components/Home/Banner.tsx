import React from 'react';
import { useGetHomeQuery } from '../../../services/home';
import Carousel from 'react-material-ui-carousel';
import { Button, Paper, Box, Toolbar } from '@mui/material';
import './Banner.css';

const Banner = () => {
    const { data, error, isLoading } = useGetHomeQuery();
    return isLoading ? (
        <> Loading </>
    ) : data ? (
        <Box className="banner" sx={{borderRadius: '20px'}}>
            <Carousel className="carousel">
                {data.data[0].details.map((banner) => (
                    <Paper>
                        <img src={banner.images} alt="" className="image" />
                    </Paper>
                ))}
            </Carousel>
        </Box>
    ) : (
        <></>
    );
};

export default Banner;
