import React from 'react'
import {
    Box,
    Stack,
    Skeleton,
} from '@mui/material';
import { useStyle } from '../../styles/checkout';

const CheckoutSkeleton = () => {
    const classes = useStyle();
    
    return (
        <Box component="main" className={classes.main}>
            <Box className={classes.inner}>
                <Skeleton
                    className={classes.heading}
                    animation="wave"
                    variant="text"
                    width={300}
                    height={50}
                />
                <Stack direction="row" spacing={3} className={classes.cartCard}>
                    <Skeleton
                        animation="wave"
                        variant="rectangular"
                        width={450}
                        height={450}
                        className={classes.cardImg}
                    />
                    <Stack spacing={2}>
                        <Skeleton
                            animation="wave"
                            variant="text"
                            width={200}
                            height={45}
                        />
                        <Skeleton
                            animation="wave"
                            variant="text"
                            width={100}
                            height={30}
                        />
                        <Skeleton
                            animation="wave"
                            variant="text"
                            width={50}
                            height={30}
                        />
                        <Skeleton
                            animation="wave"
                            variant="text"
                            width={100}
                            height={50}
                        />
                        <Skeleton
                            animation="wave"
                            variant="text"
                            width={150}
                            height={50}
                        />
                    </Stack>
                </Stack>
            </Box>
        </Box>
    )
}

export default CheckoutSkeleton
