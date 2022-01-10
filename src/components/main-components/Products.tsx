import React, { useState } from 'react';
import { useGetAllProductsQuery } from '../../services/products';
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
    Skeleton,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { NavLink } from 'react-router-dom';
import CartDialog from '../sub-components/Cart/CartDialog';

const useStyle = makeStyles({
    heading: {
        marginBottom: '30px',
    },
    productCard: {
        borderRadius: '20px',
    },
    main: {
        maxWidth: '100vw',
        marginTop: '15px',
        marginLeft: 240,
    },
    products: {
        margin: '0 50px',
    },
});

const Products: React.FC = (): JSX.Element => {
    const [open, setOpen] = useState(false);
    const [productId, setProductId] = useState(0);

    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    const classes = useStyle();

    const { data, error, isLoading } = useGetAllProductsQuery();

    const openDialog = (id: number) => {
        setProductId(id);
        setOpen(true);
    };

    const closeDialog = () => {
        setOpen(false);
    };

    return error ? (
        <>Something is Wrong</>
    ) : isLoading ? (
        <Box component="main" className={classes.main}>
            <Box className={classes.products}>
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
    ) : data ? (
        <Box component="main" className={classes.main}>
            <Box className={classes.products}>
                <Box className={classes.heading}>
                    <Typography variant="h4" component="div">
                        All Products
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        color="text.disabled"
                        component="div"
                    >
                        {data.data.length} Products
                    </Typography>
                </Box>
                <Grid container spacing={5}>
                    {data.data.map((product) => {
                        return (
                            <Grid item xs={2.4} key={product.id}>
                                <Card
                                    sx={{ borderRadius: '20px' }}
                                    className={classes.productCard}
                                >
                                    <CardActionArea>
                                        <NavLink
                                            to={`/boafresh-api-react-ts-reduxtoolkit/product/${product.id}`}
                                        >
                                            <CardMedia
                                                component="img"
                                                image={
                                                    product.images[0].imageName
                                                }
                                                alt={product.title}
                                            />
                                        </NavLink>
                                    </CardActionArea>
                                    <CardContent>
                                        <Stack spacing={1}>
                                            <Typography
                                                noWrap
                                                variant="h6"
                                                component="div"
                                            >
                                                {product.title}
                                            </Typography>
                                            <Typography
                                                variant="subtitle1"
                                                color="secondary"
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
                                                onClick={()=>openDialog(product.id)}
                                            >
                                                Add To Cart
                                            </Button>
                                        </Stack>
                                    </CardContent>
                                </Card>
                            </Grid>
                        );
                    })}
                </Grid>
                <CartDialog
                    open={open}
                    productId={productId}
                    closeDialog={closeDialog}
                />
            </Box>
        </Box>
    ) : (
        <></>
    );
};

export default Products;