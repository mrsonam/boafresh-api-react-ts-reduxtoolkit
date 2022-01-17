import {
    Box,
    Grid,
    Skeleton,
} from '@mui/material';
import { useStyle } from '../../styles/products';

const ProductsSkeleton = () => {
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    const classes = useStyle();

    return (
        <Box component="main" className={classes.main}>
            <Box className={classes.inner}>
                <Box className={classes.heading}>
                    <Skeleton
                        animation="wave"
                        variant="text"
                        width={300}
                        height={50}
                    />
                    <Skeleton
                        animation="wave"
                        variant="text"
                        width={150}
                        height={30}
                    />
                </Box>
                <Grid container spacing={5}>
                    {array.map((elem) => {
                        return (
                            <Grid item xs={2.4} key={elem}>
                                <Skeleton
                                    animation="wave"
                                    variant="rectangular"
                                    width={'100%'}
                                    height={250}
                                    className={classes.productCard}
                                />
                                <Skeleton
                                    animation="wave"
                                    variant="text"
                                    width={100}
                                    height={40}
                                />
                                <Skeleton
                                    animation="wave"
                                    variant="text"
                                    width={50}
                                    height={30}
                                />
                                <Skeleton
                                    animation="wave"
                                    variant="rectangular"
                                    width={'100%'}
                                    height={30}
                                />
                            </Grid>
                        );
                    })}
                </Grid>
            </Box>
        </Box>
    )
}

export default ProductsSkeleton
