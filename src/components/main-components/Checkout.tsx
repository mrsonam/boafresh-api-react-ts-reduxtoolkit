import React, { useState } from 'react';
import {
    Box,
    Card,
    Typography,
    CardContent,
    Button,
    Stack,
    Divider,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
} from '@mui/material';
import { useDeleteCartMutation, useGetCartQuery } from '../../services/cart';
import { CartProductData } from '../../types/cart';
import {
    useGetAddressQuery,
    useGetPaymentMethodQuery,
} from '../../services/delivery';
import AddressDialog from '../sub-components/Checkout/AddressDialog';
import { useForm } from 'react-hook-form';
import { useStyle } from '../styles/checkout';
import CheckoutSkeleton from '../sub-components/Checkout/CheckoutSkeleton';


const Checkout: React.FC = (): JSX.Element => {
    if(localStorage.getItem('token') === null){
        window.location.href = '/boafresh-api-react-ts-reduxtoolkit/login'
    }
    
    const classes = useStyle();

    const [openAddressDialog, setOpenAddressDialog] = useState(false);

    const [address, setAddress] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');

    const getCart = useGetCartQuery();

    const getAddress = useGetAddressQuery();

    const getPaymentMethod = useGetPaymentMethodQuery();

    const [checkout, checkoutRponse] = useDeleteCartMutation();

    if(checkoutRponse.isSuccess){
        window.location.href = "/boafresh-api-react-ts-reduxtoolkit"
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const openDialog = () => {
        setOpenAddressDialog(true);
    };

    const closeDialog = () => {
        setOpenAddressDialog(false);
    };

    const handleAddressChange = (event: SelectChangeEvent) => {
        setAddress(event.target.value as string);
    };

    const handlePaymentChange = (event: SelectChangeEvent) => {
        setPaymentMethod(event.target.value as string);
    };
    return getCart.error ? (
        <>Something is Wrong</>
    ) : getCart.isLoading ? (
        <CheckoutSkeleton/>
    ) : getCart.data ? (
        <Box component="main" className={classes.main}>
            <Box className={classes.inner}>
                <Box className={classes.heading}>
                    <Typography variant="h4" component="div">
                        Checkout
                    </Typography>
                </Box>
                <form
                    onSubmit={handleSubmit(() => {
                        checkout();
                    })}
                >
                    <Stack
                        spacing={5}
                        direction="row"
                        justifyContent="space-between"
                        alignItems="top"
                    >
                        <Card className={classes.deliveryCard}>
                            <CardContent>
                                <Stack spacing={3}>
                                    <Typography
                                        noWrap
                                        variant="h5"
                                        component="div"
                                    >
                                        Delivery Details
                                    </Typography>
                                    <Divider />
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">
                                            Delivery Address
                                        </InputLabel>
                                        <Select
                                            {...register('deliveryAddress', {
                                                required:
                                                    'Delivery Address cannot be empty',
                                            })}
                                            value={address}
                                            label="Delivery Address"
                                            onChange={handleAddressChange}
                                        >
                                            {getAddress.data?.data.map(
                                                (address) => (
                                                    <MenuItem
                                                        key={address.id}
                                                        value={10}
                                                    >
                                                        {address.title}
                                                    </MenuItem>
                                                ),
                                            )}
                                        </Select>
                                    </FormControl>
                                    <Typography
                                        color={'error'}
                                        variant="subtitle2"
                                    >
                                        {errors.deliveryAddress?.message}
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        fullWidth
                                        onClick={openDialog}
                                    >
                                        Add New Address
                                    </Button>
                                    <Divider />
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">
                                            Payment Method
                                        </InputLabel>
                                        <Select
                                            {...register('paymentMethod', {
                                                required:
                                                    'Payment Method cannot be empty',
                                            })}
                                            value={paymentMethod}
                                            label="Payment Method"
                                            onChange={handlePaymentChange}
                                        >
                                            {getPaymentMethod.data?.data.map(
                                                (method) => (
                                                    <MenuItem
                                                        key={method.id}
                                                        value={10}
                                                    >
                                                        {method.title}
                                                    </MenuItem>
                                                ),
                                            )}
                                        </Select>
                                    </FormControl>
                                    <Typography
                                        color={'error'}
                                        variant="subtitle2"
                                    >
                                        {errors.paymentMethod?.message}
                                    </Typography>
                                </Stack>
                            </CardContent>
                        </Card>
                        <AddressDialog
                            open={openAddressDialog}
                            closeDialog={closeDialog}
                        />

                        <Card className={classes.cartCard}>
                            <CardContent>
                                <Stack spacing={3}>
                                    <Typography
                                        noWrap
                                        variant="h5"
                                        component="div"
                                    >
                                        Your Order
                                    </Typography>
                                    <Divider />
                                    {(
                                        getCart.data.data
                                            .cartProducts as CartProductData[]
                                    ).map((product) => (
                                        <Stack
                                            spacing={5}
                                            direction="row"
                                            justifyContent="space-between"
                                            alignItems="center"
                                            key={product.product.id}
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
                                            Nrs {getCart.data?.data.subTotal}
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
                                            Nrs {getCart.data?.data.discount}
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
                                            Nrs{' '}
                                            {getCart.data?.data.deliveryCharge}
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
                                            Nrs {getCart.data?.data.total}
                                        </Typography>
                                    </Stack>

                                    <Button
                                        type="submit"
                                        variant="contained"
                                        fullWidth
                                    >
                                        Checkout
                                    </Button>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Stack>
                </form>
            </Box>
        </Box>
    ) : (
        <></>
    );
};

export default Checkout;
