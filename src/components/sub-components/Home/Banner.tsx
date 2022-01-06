import React from 'react';
import { useGetHomeQuery } from '../../../services/home';
import Carousel from 'react-material-ui-carousel';
import { Paper, Box, Skeleton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Detail } from '../../../types/home';

const useStyle = makeStyles({
    banner: {
        width: '100%',
        height: '550px',
        borderRadius: '20px',
    },
    carousel: {
        height: '550px',
        width: '100%',
        margin: '0 auto',
        borderRadius: '20px',
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: '20px',
    },
});

const Banner = () => {
    const classes = useStyle();
    const { data, error, isLoading } = useGetHomeQuery();
    return error ? (
        <>Something is Wrong!</>
    ) : isLoading ? (
        <Skeleton
            animation="wave"
            variant="rectangular"
            width={'100%'}
            height={'550px'}
            className={classes.banner}
        />
    ) : data ? (
        <Box className={classes.banner} sx={{ borderRadius: '20px' }}>
            <Carousel className={classes.carousel} duration={2000} indicators={false} interval={10000}>
                {(data.data[0].details as Detail[]).map((banner: Detail) => (
                    <Paper key={banner.id}>
                        <img
                            src={banner.images}
                            alt=""
                            className={classes.image}
                        />
                    </Paper>
                ))}
            </Carousel>
        </Box>
    ) : (
        <></>
    );
};

export default Banner;
