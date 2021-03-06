import React, { useState } from 'react';
import {
    Box,
    Typography,
    Stack,
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
import {
    useDeleteCartItemMutation,
    useDeleteCartMutation,
    useGetCartQuery,
    useUpdateCartMutation,
} from '../../services/cart';
import { NavLink } from 'react-router-dom';
import { CartProductData } from '../../types/cart';
import { DeleteOutlined } from '@mui/icons-material';
import { useStyle } from '../styles/cart';
import CartSkeleton from '../sub-components/Cart/CartSkeleton';

const Cart: React.FC = (): JSX.Element => {
    if(localStorage.getItem('token') === null){
        window.location.href = '/boafresh-api-react-ts-reduxtoolkit/login'
    }

    const classes = useStyle();

    const [openAlert, setOpenAlert] = useState(true);

    const { data, isError, isLoading } = useGetCartQuery();

    const [updateCart, updateResponse] = useUpdateCartMutation();
    const [deleteCart, deleteResponse] = useDeleteCartMutation();

    const [deleteCartItem, deleteItemResponse] = useDeleteCartItemMutation();

    const handleUpdateCart = (cartId: number, quantity: number) => {
        updateCart({ cartId, quantity });
    };

    return isError ? (
        <>Something is Wrong</>
    ) : isLoading ? (
        <CartSkeleton/>
    ) : data ? (
        <Box component="main" className={classes.main}>
            <Box className={classes.inner}>
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
