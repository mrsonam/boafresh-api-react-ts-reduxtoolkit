import React, { useState } from 'react';
import { useGetSingleProductQuery } from '../../services/products';
import {
    Box,
    Typography,
    Stack,
    Skeleton,
    ButtonGroup,
    Snackbar,
    Alert,
    Table,
    TableBody,
    TableRow,
    TableContainer,
    TableCell,
    TableHead,
    Paper,
    Button
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useGetCartQuery } from '../../services/cart';

const useStyle = makeStyles({
    heading: {
        marginBottom: '30px',
    },
    productCard: {
        display: 'flex',
        background: 'transparent',
        boxShadow: 'none',
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
});

const Cart: React.FC = (): JSX.Element => {
    const classes = useStyle();

    const [open, setOpen] = useState(true);

    const [count, setCount] = useState(1);

    const { data, isError, isSuccess, isLoading } = useGetCartQuery();

    return isError ? (
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
                <Stack
                    direction="row"
                    spacing={3}
                    className={classes.productCard}
                >
                    <Skeleton
                        animation="wave"
                        variant="rectangular"
                        width={450}
                        height={450}
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
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.data.cartProducts.map((product) => (
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
                                                onClick={() => {
                                                    if (product.quantity > 1)
                                                        setCount(product.quantity - 1);
                                                }}
                                            >
                                                -
                                            </Button>
                                            <Button>{product.quantity}</Button>
                                            <Button
                                                onClick={() => {
                                                    if (product.quantity < 10)
                                                        setCount(product.quantity + 1);
                                                }}
                                            >
                                                +
                                            </Button>
                                        </ButtonGroup>
                                    </TableCell>
                                    <TableCell>{product.price}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    ) : (
        <></>
    );
};

export default Cart;
