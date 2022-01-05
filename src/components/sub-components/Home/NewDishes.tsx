import React from 'react';
import {
    Box,
    Card,
    CardMedia,
    Typography,
    CardContent,
    Button,
    CardActionArea,
    Grid,
    Stack,
} from '@mui/material';
import { useGetHomeQuery } from '../../../services/home';
import './NewDishes.css';
import { makeStyles } from '@mui/styles';

const useStyle = makeStyles({
    heading: {
        marginBottom: '30px',
    },
});

const NewDishes = () => {
    const classes = useStyle();
    const { data, error, isLoading } = useGetHomeQuery();
    return (
        <Box>
            <Typography variant="h5" component="div" className={classes.heading}>
                {data ? data.data[4].sectionDetails.title : <></>}
            </Typography>
            <Grid container spacing={5}>
                {isLoading ? (
                    <Typography variant="h6" component="div">
                        Loading...
                    </Typography>
                ) : data ? (
                    data.data[4].sectionDetails.products.map((product) => {
                        return (
                            <Grid item xs={2.4} key={product.id}>
                                <Card
                                    sx={{ borderRadius: '20px' }}
                                    className="productCard"
                                >
                                    <CardActionArea>
                                        <CardMedia
                                            className="categoryImage"
                                            component="img"
                                            image={product.images[0].imageName}
                                            alt={product.title}
                                        />
                                    </CardActionArea>
                                    <CardContent className="productText">
                                        <Stack spacing={1}>
                                            <Typography
                                                noWrap
                                                variant="h6"
                                                component="div"
                                            >
                                                {product.title}
                                            </Typography>
                                            <Typography
                                                variant="subtitle2"
                                                color="text.disabled"
                                                component="div"
                                            >
                                                Rs.{' '}
                                                {
                                                    product.unitPrice[0]
                                                        .sellingPrice
                                                }
                                            </Typography>
                                            <Button
                                                size="small"
                                                variant="contained"
                                                color="secondary"
                                            >
                                                Add To Cart
                                            </Button>
                                        </Stack>
                                    </CardContent>
                                </Card>
                            </Grid>
                        );
                    })
                ) : (
                    <></>
                )}
            </Grid>
        </Box>
    );
};

export default NewDishes;
