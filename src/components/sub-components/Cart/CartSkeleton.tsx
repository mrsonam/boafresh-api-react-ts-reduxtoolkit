import React from 'react';
import {
    Box,
    Typography,
    Skeleton,
    Table,
    TableBody,
    TableRow,
    TableContainer,
    TableCell,
    TableHead,
    Paper,
} from '@mui/material';
import { useStyle } from '../../styles/cart';

const CartSkeleton = () => {
    const array = [1, 2, 3, 4, 5];
    const classes = useStyle();
    return (
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
    );
};

export default CartSkeleton;
