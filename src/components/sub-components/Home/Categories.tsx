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
    Skeleton,
    Stack,
} from '@mui/material';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { useGetHomeQuery } from '../../../services/home';
import { makeStyles } from '@mui/styles';
import { Category } from '../../../types/categories';
import { NavLink } from 'react-router-dom';

const useStyle = makeStyles({
    heading: {
        marginBottom: '30px',
    },
    categories: {
        width: '100%',
        margin: '0 auto',
    },
    categoryCard: {
        borderRadius: '20px',
    },
    categoryImage: {
        position: 'relative',
    },
    categoryText: {
        position: 'absolute',
        left: 0,
        top: '20%',
    },
});

const Categories = () => {
    const classes = useStyle();
    const { data, error, isLoading } = useGetHomeQuery();
    const array = [1, 2, 3, 4, 5, 6];
    return error ? (
        <>Something is Wrong</>
    ) : isLoading ? (
        <Box className={classes.categories}>
            <Skeleton
                animation="wave"
                variant="text"
                width={300}
                height={60}
                className={classes.heading}
            />
            <Grid container spacing={5}>
                {array.map((elem) => {
                    return (
                        <Grid item xs={4} key={elem}>
                            <Skeleton
                                animation="wave"
                                variant="rectangular"
                                width={'100%'}
                                height={150}
                                className={classes.categoryCard}
                            />
                        </Grid>
                    );
                })}
            </Grid>
        </Box>
    ) : data ? (
        <Box className={classes.categories}>
            <Typography
                variant="h4"
                component="div"
                className={classes.heading}
            >
                <>Shop By Categories</>
            </Typography>
            <Grid container spacing={5}>
                {(data.data[1].categories as Category[]).map(
                    (category: Category) => {
                        return (
                            <Grid item xs={4} key={category.id}>
                                <NavLink
                                    to={`/boafresh-api-react-ts-reduxtoolkit/products/category/${category.id}`}
                                >
                                    <Card className={classes.categoryCard}>
                                        <CardActionArea>
                                            <CardMedia
                                                className={
                                                    classes.categoryImage
                                                }
                                                component="img"
                                                image={category.icon}
                                                alt={category.title}
                                            />
                                            <CardContent
                                                className={classes.categoryText}
                                            >
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
                                                    {category.productCount !== 1
                                                        ? `${category.productCount} Products`
                                                        : `${category.productCount} Product`}
                                                </Typography>
                                                <Stack
                                                    direction="row"
                                                    spacing={1}
                                                >
                                                    <Typography color="primary">
                                                        Shop Now
                                                    </Typography>
                                                    <ShoppingBagIcon color="primary" />
                                                </Stack>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </NavLink>
                            </Grid>
                        );
                    },
                )}
            </Grid>
        </Box>
    ) : (
        <></>
    );
};

export default Categories;
