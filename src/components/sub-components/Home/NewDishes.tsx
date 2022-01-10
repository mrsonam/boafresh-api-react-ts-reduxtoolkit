import React, {useState} from 'react';
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
import { useGetHomeQuery } from '../../../services/home';
import { makeStyles } from '@mui/styles';
import { Product } from '../../../types/products';
import { NavLink } from 'react-router-dom';
import CartDialog from '../Cart/CartDialog';

const useStyle = makeStyles({
    heading: {
        marginBottom: '30px',
    },
    productCard: {
        borderRadius: '20px',
    },
});


const NewDishes = () => {
    const [open, setOpen] = useState(false);
    const [productId, setProductId] = useState(0);

    const array = [1, 2, 3, 4, 5, 6];

    const classes = useStyle();

    const { data, error, isLoading } = useGetHomeQuery();

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
        <Box>
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
    ) : data ? (
        <Box>
            <Typography
                variant="h4"
                component="div"
                className={classes.heading}
            >
                {data.data[4].sectionDetails.title}
            </Typography>

            <Grid container spacing={5}>
                {(data.data[4].sectionDetails.products as Product[]).map(
                    (product: Product) => {
                        return (
                            <Grid item xs={2.4} key={product.id}>
                                <Card
                                    sx={{ borderRadius: '20px' }}
                                    className="productCard"
                                >
                                    <CardActionArea>
                                        <NavLink to={`/boafresh-api-react-ts-reduxtoolkit/product/${product.id}`}>
                                            <CardMedia
                                                className="categoryImage"
                                                component="img"
                                                image={
                                                    product.images[0].imageName
                                                }
                                                alt={product.title}
                                            />
                                        </NavLink>
                                    </CardActionArea>
                                    <CardContent className="productText">
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
                    },
                )}
            </Grid>
            <CartDialog
                    open={open}
                    productId={productId}
                    closeDialog={closeDialog}
                />
        </Box>
    ) : (
        <></>
    );
};
export default NewDishes;
