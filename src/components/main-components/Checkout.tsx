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
    Skeleton,
    ButtonGroup,
    Snackbar,
    Alert,
    Divider,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useParams } from 'react-router-dom';
import { useAddToCartMutation, useGetCartQuery } from '../../services/cart';
import { CartProductData } from '../../types/cart';

const useStyle = makeStyles({
    heading: {
        marginBottom: '30px',
    },
    cartCard: {
        alignItems: 'end',
        margin: '20px 0',
        width: '400px',
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
    cardImg: {
        height: 'auto',
        width: '30%',
        borderRadius: '20px',
    },
});

const Checkout: React.FC = (): JSX.Element => {
    const classes = useStyle();

    const [count, setCount] = useState(1);

    const [open, setOpen] = useState(true);

    const { data, error, isLoading } = useGetCartQuery();

    return error ? (
        <>Something is Wrong</>
    ) : isLoading ? (
        <Box component="main" className={classes.main}>
            <Box className={classes.products}>
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
    ) : data ? (
        <Box component="main" className={classes.main}>
            <Box className={classes.products}>
                <Box className={classes.heading}>
                    <Typography variant="h4" component="div">
                        Checkout
                    </Typography>
                </Box>
                <Stack
                    spacing={5}
                    direction="row"
                    justifyContent="space-between"
                    alignItems="top"
                >
                    <Card className={classes.cartCard}>
                        <CardContent>
                            <Typography noWrap variant="h5" component="div">
                                Delivery Address
                            </Typography>
                            <Divider />
                        </CardContent>
                    </Card>

                    <Card className={classes.cartCard}>
                        <CardContent>
                            <Stack spacing={3}>
                                <Typography noWrap variant="h5" component="div">
                                    Your Order
                                </Typography>
                                <Divider />
                                {(
                                    data.data.cartProducts as CartProductData[]
                                ).map((product) => (
                                    <Stack
                                        spacing={5}
                                        direction="row"
                                        justifyContent="space-between"
                                        alignItems="center"
                                    >
                                        <Typography
                                            variant="subtitle1"
                                            component="div"
                                        >
                                            {product.product.title} X{' '}
                                            {product.quantity}
                                        </Typography>
                                        <Typography
                                            variant="subtitle1"
                                            component="div"
                                        >
                                            Nrs {product.price}
                                        </Typography>
                                    </Stack>
                                ))}
                                <Divider />
                                <Stack
                                    spacing={5}
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems="center"
                                >
                                    <Typography
                                        variant="subtitle1"
                                        component="div"
                                    >
                                        Sub-Total
                                    </Typography>
                                    <Typography
                                        variant="subtitle1"
                                        component="div"
                                    >
                                        Nrs {data?.data.subTotal}
                                    </Typography>
                                </Stack>
                                <Stack
                                    spacing={5}
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems="center"
                                >
                                    <Typography
                                        variant="subtitle1"
                                        component="div"
                                    >
                                        Discount
                                    </Typography>
                                    <Typography
                                        variant="subtitle1"
                                        component="div"
                                    >
                                        Nrs {data?.data.discount}
                                    </Typography>
                                </Stack>
                                <Stack
                                    spacing={5}
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems="center"
                                >
                                    <Typography
                                        variant="subtitle1"
                                        component="div"
                                    >
                                        Delivery Charge
                                    </Typography>
                                    <Typography
                                        variant="subtitle1"
                                        component="div"
                                    >
                                        Nrs {data?.data.deliveryCharge}
                                    </Typography>
                                </Stack>
                                <Divider />
                                <Stack
                                    spacing={5}
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems="center"
                                >
                                    <Typography
                                        fontWeight="bold"
                                        variant="h6"
                                        component="div"
                                        color="primary"
                                    >
                                        Grand-Total
                                    </Typography>
                                    <Typography
                                        fontWeight="bold"
                                        variant="h6"
                                        component="div"
                                    >
                                        Nrs {data?.data.total}
                                    </Typography>
                                </Stack>

                                {/* <NavLink to="/boafresh-api-react-ts-reduxtoolkit/checkout">
                                        <Button variant="contained">
                                            Proceed To Checkout
                                        </Button>
                                    </NavLink> */}
                            </Stack>
                        </CardContent>
                    </Card>
                </Stack>
            </Box>
        </Box>
    ) : (
        <></>
    );
};

export default Checkout;
