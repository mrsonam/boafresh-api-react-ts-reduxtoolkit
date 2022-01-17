import React, { useState } from 'react';
import { useGetSingleProductQuery } from '../../services/products';
import {
    Box,
    Card,
    CardMedia,
    Typography,
    CardContent,
    Button,
    Stack,
    ButtonGroup,
    Snackbar,
    Alert
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { useAddToCartMutation } from '../../services/cart';
import {useStyle} from '../styles/product'
import ProuctSkeleton from '../sub-components/Products/ProuctSkeleton';

const Product: React.FC = (): JSX.Element => {
    const classes = useStyle();

    const [item, setItem] = useState({
        productId: 0,
        priceId: 0,
        quantity: 0,
        note: '',
    });

    const [count, setCount] = useState(1);

    const [open, setOpen] = useState(true);

    const { productId } = useParams();
    const { data, error, isLoading } = useGetSingleProductQuery(
        parseInt(productId || ''),
    );

    const [addToCart, responseInfo] = useAddToCartMutation();

    const addItemToCart = () => {
        setItem({
            ...item,
            productId: data?.data.id || 0,
            priceId: data?.data.unitPrice[0].id || 0,
            quantity: count,
        });
        addToCart(item);
        setOpen(true);
    };
    return error ? (
        <>Something is Wrong</>
    ) : isLoading ? (
        <ProuctSkeleton/>
    ) : data ? (
        <Box component="main" className={classes.main}>
            <Box className={classes.inner}>
                <Box className={classes.heading}>
                    <Typography variant="h4" component="div">
                        {data.data.title}
                    </Typography>
                </Box>
                <Card className={classes.productCard}>
                    <CardMedia
                        component="img"
                        className={classes.cardImg}
                        image={data.data.images[0].imageName}
                        alt={data.data.title}
                    />
                    <CardContent>
                        <Stack spacing={3}>
                            <Typography noWrap variant="h5" component="div">
                                {data.data.title}
                            </Typography>
                            <Typography component="div">
                                Category: {data.data.categoryTitle}
                            </Typography>
                            <Typography
                                variant="h6"
                                color="secondary"
                                component="div"
                            >
                                Rs. {data.data.unitPrice[0].sellingPrice * count}
                            </Typography>
                            <ButtonGroup
                                variant="outlined"
                                aria-label="outlined button group"
                            >
                                <Button
                                    onClick={() => {
                                        if (count > 1) setCount(count - 1);
                                    }}
                                >
                                    -
                                </Button>
                                <Button>{count}</Button>
                                <Button
                                    onClick={() => {
                                        if (count < 10) setCount(count + 1);
                                    }}
                                >
                                    +
                                </Button>
                            </ButtonGroup>
                            <Button variant="contained" onClick={addItemToCart}>
                                Add To Cart
                            </Button>
                        </Stack>
                        {responseInfo.isSuccess ? (
                            <Snackbar
                                open={open}
                                autoHideDuration={5000}
                                onClose={() => setOpen(false)}
                            >
                                <Alert
                                    severity="success"
                                    sx={{ width: '100%' }}
                                    onClose={() => setOpen(false)}
                                >
                                    Item Added to Cart
                                </Alert>
                            </Snackbar>
                        ) : responseInfo.isError ? (
                            <Snackbar
                                open={open}
                                autoHideDuration={5000}
                                onClose={() => setOpen(false)}
                            >
                                <Alert
                                    severity="error"
                                    sx={{ width: '100%' }}
                                    onClose={() => setOpen(false)}
                                >
                                    Something went wrong while updating your
                                    Cart
                                </Alert>
                            </Snackbar>
                        ) : (
                            <></>
                        )}
                    </CardContent>
                </Card>
            </Box>
        </Box>
    ) : (
        <></>
    );
};

export default Product;
