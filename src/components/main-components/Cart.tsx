import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    Stack,
    Skeleton,
    ButtonGroup,
    Table,
    TableBody,
    TableRow,
    TableContainer,
    TableCell,
    TableHead,
    Paper,
    Button,
    Card,
    CardContent,
    Snackbar,
    Alert,
    IconButton,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import {
    useDeleteCartItemMutation,
    useDeleteCartMutation,
    useGetCartQuery,
    useUpdateCartMutation,
} from '../../services/cart';
import { NavLink } from 'react-router-dom';
import { CartProductData } from '../../types/cart';
import { DeleteOutlined } from '@mui/icons-material';

const useStyle = makeStyles({
    heading: {
        marginBottom: '30px',
    },
    productCard: {
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
    productImg: {
        height: '200px',
        width: 'auto',
        borderRadius: '20px',
    },
    checkout: {
        margin: '20px 0',
    },
});

const Cart: React.FC = (): JSX.Element => {
    const array = [1, 2, 3, 4, 5];
    const classes = useStyle();

    const [openAlert, setOpenAlert] = useState(true);

    const { data, isError, isLoading, isSuccess } = useGetCartQuery();

    // const defaultCart = {
    //     id: 0,
    //     cartNumber: '',
    //     categoryId: null,
    //     warehouseId: 0,
    //     orderAmount: 0,
    //     discount: 0,
    //     scheme: 0,
    //     subTotal: 0,
    //     deliveryCharge: 0,
    //     extra: [],
    //     message: '',
    //     campaign_message: '',
    //     total: 0,
    //     pickupTotal: 0,
    //     cartProducts: [],
    // };

    // const [cart, setCart] = useState<GetCartData>(defaultCart);
    // useEffect(() => {
    //     setCart(data?.data || defaultCart);
    // }, []);
    const [updateCart, updateResponse] = useUpdateCartMutation();
    const [deleteCart, deleteResponse] = useDeleteCartMutation();

    const [deleteCartItem, deleteItemResponse] = useDeleteCartItemMutation();

    const handleUpdateCart = (cartId: number, quantity: number) => {
        updateCart({ cartId, quantity });
    };

    return isError ? (
        <>Something is Wrong</>
    ) : isLoading ? (
        <Box component="main" className={classes.main}>
            <Box className={classes.products}>
                <Box className={classes.heading}>
                    <Typography variant="h4" component="div">
                        My Cart
                    </Typography>
                </Box>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Image</TableCell>
                                <TableCell>Product Name</TableCell>
                                <TableCell>Unit Price</TableCell>
                                <TableCell>Quantity</TableCell>
                                <TableCell>Sub Total</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {array.map((product) => (
                                <TableRow key={product}>
                                    <TableCell width={500}>
                                        <Skeleton
                                            variant="rectangular"
                                            width={200}
                                            height={200}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton variant="text" height={40} />
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton variant="text" height={40} />
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton
                                            variant="rectangular"
                                            width={150}
                                            height={50}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton variant="text" height={40} />
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton
                                            variant="circular"
                                            height={40}
                                            width={40}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    ) : data ? (
        <Box component="main" className={classes.main}>
            <Box className={classes.products}>
                <Box className={classes.heading}>
                    <Typography variant="h4" component="div">
                        My Cart
                    </Typography>
                </Box>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Image</TableCell>
                                <TableCell>Product Name</TableCell>
                                <TableCell>Unit Price</TableCell>
                                <TableCell>Quantity</TableCell>
                                <TableCell>Sub Total</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {(data?.data.cartProducts as CartProductData[]).map(
                                (product) => (
                                    <TableRow key={product.id}>
                                        <TableCell width={500}>
                                            <img
                                                src={
                                                    product.product.images[0]
                                                        .imageName
                                                }
                                                alt={product.product.title}
                                                className={classes.productImg}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            {product.product.title}
                                        </TableCell>
                                        <TableCell>
                                            NRs.{' '}
                                            {
                                                product.product.unitPrice[0]
                                                    .sellingPrice
                                            }
                                        </TableCell>
                                        <TableCell>
                                            <ButtonGroup
                                                variant="outlined"
                                                aria-label="outlined button group"
                                            >
                                                <Button
                                                    onClick={() =>
                                                        handleUpdateCart(
                                                            product.id,
                                                            product.quantity -
                                                                1,
                                                        )
                                                    }
                                                >
                                                    -
                                                </Button>
                                                <Button>
                                                    {product.quantity}
                                                </Button>
                                                <Button
                                                    onClick={() =>
                                                        handleUpdateCart(
                                                            product.id,
                                                            product.quantity +
                                                                1,
                                                        )
                                                    }
                                                >
                                                    +
                                                </Button>
                                            </ButtonGroup>
                                        </TableCell>
                                        <TableCell>{product.price}</TableCell>
                                        <TableCell>
                                            <IconButton
                                                onClick={() =>
                                                    deleteCartItem(product.id)
                                                }
                                            >
                                                <DeleteOutlined color="error" />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ),
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                {data.data.cartProducts.length === 0 ? (
                    <Stack
                        spacing={5}
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Typography noWrap variant="h5" component="div">
                            Cart is Empty!
                        </Typography>
                        <Button variant="contained">
                            <NavLink
                                to="/boafresh-api-react-ts-reduxtoolkit"
                                style={{ color: '#fff' }}
                            >
                                Go Back to Homepage
                            </NavLink>
                        </Button>
                    </Stack>
                ) : (
                    <Stack
                        spacing={5}
                        direction="row"
                        className={classes.checkout}
                        justifyContent="space-between"
                        alignItems="top"
                    >
                        <Button
                            variant="contained"
                            onClick={() => deleteCart()}
                            style={{ height: 50, width: 200 }}
                        >
                            Clear Cart
                        </Button>

                        <Card className={classes.productCard}>
                            <CardContent>
                                <Stack spacing={3}>
                                    <Typography
                                        noWrap
                                        variant="h5"
                                        component="div"
                                    >
                                        Cart Total
                                    </Typography>
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

                                    <NavLink to="/boafresh-api-react-ts-reduxtoolkit/checkout">
                                        <Button variant="contained" fullWidth>
                                            Proceed To Checkout
                                        </Button>
                                    </NavLink>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Stack>
                )}
                {updateResponse.isSuccess ? (
                    <Snackbar
                        open={openAlert}
                        autoHideDuration={2000}
                        onClose={() => setOpenAlert(false)}
                    >
                        <Alert
                            severity="success"
                            sx={{ width: '100%' }}
                            onClose={() => setOpenAlert(false)}
                        >
                            Cart Updated!
                        </Alert>
                    </Snackbar>
                ) : deleteItemResponse.isSuccess ? (
                    <Snackbar
                        open={openAlert}
                        autoHideDuration={2000}
                        onClose={() => setOpenAlert(false)}
                    >
                        <Alert
                            severity="success"
                            sx={{ width: '100%' }}
                            onClose={() => setOpenAlert(false)}
                        >
                            Product Deleted from Cart!
                        </Alert>
                    </Snackbar>
                ) : deleteResponse.isSuccess ? (
                    <Snackbar
                        open={openAlert}
                        autoHideDuration={2000}
                        onClose={() => setOpenAlert(false)}
                    >
                        <Alert
                            severity="success"
                            sx={{ width: '100%' }}
                            onClose={() => setOpenAlert(false)}
                        >
                            All products Cleared from Cart
                        </Alert>
                    </Snackbar>
                ) : updateResponse.isError ? (
                    <Snackbar
                        open={openAlert}
                        autoHideDuration={2000}
                        onClose={() => setOpenAlert(false)}
                    >
                        <Alert
                            severity="error"
                            sx={{ width: '100%' }}
                            onClose={() => setOpenAlert(false)}
                        >
                            Something went wrong while updating your Cart
                        </Alert>
                    </Snackbar>
                ) : (
                    <></>
                )}
            </Box>
        </Box>
    ) : (
        <></>
    );
};

export default Cart;
