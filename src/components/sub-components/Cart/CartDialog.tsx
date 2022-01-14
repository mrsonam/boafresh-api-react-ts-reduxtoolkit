import { useEffect, useState } from 'react';
import { useGetSingleProductQuery } from '../../../services/products';
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
    Dialog,
    DialogTitle,
    Divider,
    IconButton,
} from '@mui/material';
import { CloseOutlined } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import { useAddToCartMutation } from '../../../services/cart';

const useStyle = makeStyles({
    dialog: {
        width: '100%',
        height: '100%',
        borderRadius: '20px',
    },
    productCard: {
        display: 'flex',
        background: 'transparent',
        boxShadow: 'none',
    },
    main: {
        maxWidth: '100vw',
    },
    products: {
        margin: '30px',
    },
    cardImg: {
        height: 'auto',
        width: '50%',
        borderRadius: '20px',
    },
});

interface CartDialogProps {
    open: boolean;
    productId: number;
    closeDialog: () => void;
}

const CartDialog = ({ open, productId, closeDialog }: CartDialogProps) => {
    const classes = useStyle();

    const [item, setItem] = useState({
        productId: 0,
        priceId: 0,
        quantity: 0,
        note: '',
    });

    const [count, setCount] = useState(1);

    const [openAlert, setOpenAlert] = useState(true);

    const { data, error, isLoading } = useGetSingleProductQuery(productId || 0);

    const [addToCart, responseInfo] = useAddToCartMutation();

    useEffect(() => {
        setItem({
            ...item,
            productId: data?.data.id || 0,
            priceId: data?.data.unitPrice[0].id || 0,
            quantity: count,
        });
    }, [count, data]);

    const addItemToCart = () => {
        addToCart(item);
        setOpenAlert(true);
        setCount(1);
    };

    return error ? (
        <></>
    ) : (
        <Dialog onClose={closeDialog} open={open} className={classes.dialog}>
            <IconButton
                aria-label="close"
                onClick={closeDialog}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
            >
                <CloseOutlined />
            </IconButton>
            <DialogTitle>Add To Cart</DialogTitle>
            <Divider />
            {isLoading ? (
                <Box component="main" className={classes.main}>
                    <Box className={classes.products}>
                        <Stack
                            direction="row"
                            spacing={3}
                            className={classes.productCard}
                        >
                            <Skeleton
                                animation="wave"
                                variant="rectangular"
                                width={300}
                                height={300}
                                className={classes.cardImg}
                            />
                            <Stack spacing={2}>
                                <Skeleton
                                    animation="wave"
                                    variant="text"
                                    width={150}
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
                        <Card className={classes.productCard}>
                            <CardMedia
                                component="img"
                                className={classes.cardImg}
                                image={data.data.images[0].imageName}
                                alt={data.data.title}
                            />
                            <CardContent>
                                <Stack spacing={3}>
                                    <Typography
                                        noWrap
                                        variant="subtitle1"
                                        component="div"
                                    >
                                        {data.data.title}
                                    </Typography>
                                    <Typography
                                        variant="subtitle2"
                                        component="div"
                                    >
                                        Category: {data.data.categoryTitle}
                                    </Typography>
                                    <Typography
                                        variant="subtitle1"
                                        color="secondary"
                                        component="div"
                                    >
                                        Rs.{' '}
                                        {data.data.unitPrice[0].sellingPrice *
                                            count}
                                    </Typography>
                                    <ButtonGroup
                                        variant="outlined"
                                        aria-label="outlined button group"
                                    >
                                        <Button
                                            onClick={() => {
                                                if (count > 1)
                                                    setCount(count - 1);
                                            }}
                                        >
                                            -
                                        </Button>
                                        <Button>{count}</Button>
                                        <Button
                                            onClick={() => {
                                                if (count < 10)
                                                    setCount(count + 1);
                                            }}
                                        >
                                            +
                                        </Button>
                                    </ButtonGroup>
                                    <Button
                                        variant="contained"
                                        onClick={() => {
                                            addItemToCart();
                                            setTimeout(closeDialog, 3500);
                                        }}
                                    >
                                        Add To Cart
                                    </Button>
                                </Stack>
                                {responseInfo.isSuccess ? (
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
                                            Item Added to Cart
                                        </Alert>
                                    </Snackbar>
                                ) : responseInfo.isError ? (
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
                                            Something went wrong while updating
                                            your Cart
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
            )}
        </Dialog>
    );
};

export default CartDialog;
