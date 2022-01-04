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
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { useGetHomeQuery } from '../../../services/home';
import './Categories.css';

const Categories = () => {
    const { data, error, isLoading } = useGetHomeQuery();
    return (
        <Box className='categories'>
            <Typography variant="h5" component="div">
                Shop By Categories
            </Typography>
            <Grid container spacing={2}>
                {isLoading ? (
                    <Typography variant="h6" component="div">
                        Loading...
                    </Typography>
                ) : data ? (
                    data.data[1].categories.map((category) => {
                        return (
                            <Grid item xs={4}>
                                <Card 
                                sx={{borderRadius: '20px'}}
                                className='categoryCard'>
                                    <CardActionArea>
                                        <CardMedia
                                            className="categoryImage"
                                            component="img"
                                            image={category.icon}
                                            alt={category.title}
                                        />
                                        <CardContent className="categoryText">
                                            <Typography
                                                variant="h5"
                                                component="div"
                                            >
                                                {category.title}
                                            </Typography>
                                            <Typography
                                                variant="subtitle2"
                                                color="text.disabled"
                                                component="div"
                                            >
                                                {category.productCount} Products
                                            </Typography>
                                            <Button size="small" variant='text' color="primary" endIcon={<ShoppingBagIcon/>}>
                                                Shop Now
                                            </Button>
                                        </CardContent>
                                    </CardActionArea>
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

export default Categories;
