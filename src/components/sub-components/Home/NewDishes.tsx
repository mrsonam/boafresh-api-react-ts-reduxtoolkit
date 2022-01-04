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
} from '@mui/material';
import { useGetHomeQuery } from '../../../services/home';
import './NewDishes.css';

const NewDishes = () => {
    const { data, error, isLoading } = useGetHomeQuery();
    return (
        <Box>
            <Typography variant="h5" component="div">
                {data ? data.data[4].sectionDetails.title : <></>}
            </Typography>
            <Grid container spacing={3}>
                {isLoading ? (
                    <Typography variant="h6" component="div">
                        Loading...
                    </Typography>
                ) : data ? (
                    data.data[4].sectionDetails.products.map((product) => {
                        return (
                            <Grid item xs={3}>
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
                                            {product.unitPrice[0].sellingPrice}
                                        </Typography>
                                        <Button
                                            size="small"
                                            variant="contained"
                                            color="secondary"
                                        >
                                            Add To Cart
                                        </Button>
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
