import {
    Box,
    Card,
    CardMedia,
    Typography,
    CardContent,
    Button,
    CardActionArea,
    Grid,
    Stack
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { useGetProductsByCategoryQuery } from '../../services/products';
import './Products.css';

const ProductsByCategory = () => {
    const { categoryId } = useParams<Record<string, string | undefined>>();
    const { data, error, isLoading } = useGetProductsByCategoryQuery(
        categoryId || '',
    );

    return (
        <Box component="main" className="main">
            <Box className="products">
                {data ? (
                    <Box className='heading'>
                        <Typography variant="h4" component="div">
                            {data.data[0].categoryTitle.charAt(0) +
                                data.data[0].categoryTitle
                                    .slice(1)
                                    .toLowerCase()}
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            color="text.disabled"
                            component="div"
                        >
                            {data.data.length} Products
                        </Typography>
                    </Box>
                ) : (
                    <></>
                )}
                <Grid container spacing={5}>
                    {isLoading ? (
                        <Typography variant="h6" component="div">
                            Loading...
                        </Typography>
                    ) : data ? (
                        data.data.map((product) => {
                            return (
                                <Grid item xs={2.4}>
                                    <Card
                                        sx={{ borderRadius: '20px' }}
                                        className="productCard"
                                    >
                                        <CardActionArea>
                                            <CardMedia
                                                className="categoryImage"
                                                component="img"
                                                image={
                                                    product.images[0].imageName
                                                }
                                                alt={product.title}
                                            />
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
                                                variant="subtitle2"
                                                color="text.disabled"
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
                                            >
                                                Add To Cart
                                            </Button>
                                            </Stack>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            );
                        })
                    ) : (
                        <></>
                    )}
                </Grid>
            </Box>
        </Box>
    );
};

export default ProductsByCategory;
