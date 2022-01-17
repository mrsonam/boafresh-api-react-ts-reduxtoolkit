import React, { useEffect, useState } from 'react';
import { useGetAllProductsQuery } from '../../services/products';
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
    Tabs,
    Tab,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    SelectChangeEvent,
    Pagination,
} from '@mui/material';
import { NavLink } from 'react-router-dom';
import CartDialog from '../sub-components/Cart/CartDialog';
import { GridViewOutlined, ViewListOutlined } from '@mui/icons-material';
import { Product } from '../../types/products';
import { useStyle } from '../styles/products';
import ProductsSkeleton from '../sub-components/Products/ProductsSkeleton';

const Products: React.FC = (): JSX.Element => {
    const classes = useStyle();

    //fetch products
    const { data, error, isLoading } = useGetAllProductsQuery();

    const [products, setProducts] = useState<Product[]>(data?.data || []);

    useEffect(() => {
        setProducts(data?.data || []);
    }, [data]);

    //cart dialog
    const [openCartDialog, setOpenCartDialog] = useState(false);
    const [productId, setProductId] = useState(0);

    const openDialog = (id: number) => {
        setProductId(id);
        setOpenCartDialog(true);
    };

    const closeDialog = () => {
        setOpenCartDialog(false);
    };

    //list view and grid view
    const [view, setView] = useState(0);

    const handleViewChange = (
        event: React.SyntheticEvent,
        newValue: number,
    ) => {
        setView(newValue);
    };

    //sorting
    const [sort, setSort] = useState('');
    const [productsToSort, setProductsToSort] = useState<Product[]>([]);

    const handleSortChange = (event: SelectChangeEvent) => {
        setSort(event.target.value as string);
        setProductsToSort([...products]);
    };

    const sortProducts = () => {
        let sortedProducts: Product[] = [];
        if (sort === 'nameAsc') {
            sortedProducts = productsToSort.sort((a, b) => {
                if (a.title > b.title) return 1;
                else if (b.title > a.title) return -1;
                else return 0;
            });
        } else if (sort === 'nameDesc') {
            sortedProducts = productsToSort.sort((a, b) => {
                if (a.title > b.title) return -1;
                else if (b.title > a.title) return 1;
                else return 0;
            });
        } else if (sort === 'priceAsc') {
            sortedProducts = productsToSort.sort((a, b) => {
                if (a.unitPrice[0].sellingPrice < b.unitPrice[0].sellingPrice)
                    return -1;
                else if (
                    b.unitPrice[0].sellingPrice < a.unitPrice[0].sellingPrice
                )
                    return 1;
                else return 0;
            });
        } else if (sort === 'priceDesc') {
            sortedProducts = productsToSort.sort((a, b) => {
                if (a.unitPrice[0].sellingPrice > b.unitPrice[0].sellingPrice)
                    return -1;
                else if (
                    b.unitPrice[0].sellingPrice > a.unitPrice[0].sellingPrice
                )
                    return 1;
                else return 0;
            });
        }
        setProducts([...sortedProducts]);
    };

    useEffect(sortProducts, [sort]);

    //pagination
    const [page, setPage] = useState(1);
    const [productsPerPage, setProductsPerPage] = useState('10');
    const [indexOfFirst, setIndexOfFirst] = useState(0);
    const [indexOfLast, setIndexOfLast] = useState(parseInt(productsPerPage));

    const handleProductsPerPageChange = (event: SelectChangeEvent) => {
        setProductsPerPage(event.target.value as string);
    };

    const handlePaginationChange = (
        event: React.ChangeEvent<unknown>,
        newPage: number,
    ) => {
        console.log(4 + 1 * parseInt(productsPerPage));
        setPage(newPage);
    };

    useEffect(() => {
        setIndexOfFirst(
            page * parseInt(productsPerPage) - parseInt(productsPerPage),
        );
        setIndexOfLast(page * parseInt(productsPerPage));
    }, [page, productsPerPage]);

    return error ? (
        <>Something is Wrong</>
    ) : isLoading ? (
        <ProductsSkeleton />
    ) : data ? (
        <Box component="main" className={classes.main}>
            <Box className={classes.inner}>
                <Box className={classes.heading}>
                    <Typography variant="h4" component="div">
                        All Products
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        color="text.disabled"
                        component="div"
                    >
                        {data.data.length} Products
                    </Typography>
                </Box>

                <Stack
                    spacing={5}
                    direction="row"
                    className={classes.tabs}
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Tabs value={view} onChange={handleViewChange}>
                        <Tab icon={<GridViewOutlined />} />
                        <Tab icon={<ViewListOutlined />} />
                    </Tabs>
                    <FormControl style={{ minWidth: '300px' }}>
                        <InputLabel>Sort By</InputLabel>
                        <Select
                            value={sort}
                            label="Sort By"
                            onChange={handleSortChange}
                        >
                            <MenuItem value="nameAsc">A-Z</MenuItem>
                            <MenuItem value="nameDesc">Z-A</MenuItem>
                            <MenuItem value="priceAsc">
                                Price (Low-High)
                            </MenuItem>
                            <MenuItem value="priceDesc">
                                Price (High-Low)
                            </MenuItem>
                        </Select>
                    </FormControl>
                </Stack>
                {view === 0 ? (
                    <Grid container spacing={5}>
                        {products
                            .slice(indexOfFirst, indexOfLast)
                            .map((product) => {
                                return (
                                    <Grid item xs={2.4} key={product.id}>
                                        <Card className={classes.productCard}>
                                            <CardActionArea>
                                                <NavLink
                                                    to={`/boafresh-api-react-ts-reduxtoolkit/product/${product.id}`}
                                                >
                                                    <CardMedia
                                                        component="img"
                                                        image={
                                                            product.images[0]
                                                                .imageName
                                                        }
                                                        alt={product.title}
                                                    />
                                                </NavLink>
                                            </CardActionArea>
                                            <CardContent>
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
                                                        onClick={() =>
                                                            openDialog(
                                                                product.id,
                                                            )
                                                        }
                                                    >
                                                        Add To Cart
                                                    </Button>
                                                </Stack>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                );
                            })}
                    </Grid>
                ) : (
                    <Grid container spacing={5}>
                        {products
                            .slice(indexOfFirst, indexOfLast)
                            .map((product) => {
                                return (
                                    <Grid item xs={12} key={product.id}>
                                        <Card className={classes.productCard}>
                                            <Stack direction="row" spacing={5}>
                                                <CardActionArea
                                                    style={{
                                                        width: '280px',
                                                        borderRadius: '20px',
                                                    }}
                                                >
                                                    <NavLink
                                                        to={`/boafresh-api-react-ts-reduxtoolkit/product/${product.id}`}
                                                    >
                                                        <CardMedia
                                                            component="img"
                                                            image={
                                                                product
                                                                    .images[0]
                                                                    .imageName
                                                            }
                                                            style={{
                                                                borderRadius:
                                                                    '20px',
                                                            }}
                                                            alt={product.title}
                                                        />
                                                    </NavLink>
                                                </CardActionArea>
                                                <CardContent
                                                    style={{ width: '300px' }}
                                                >
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
                                                                product
                                                                    .unitPrice[0]
                                                                    .sellingPrice
                                                            }
                                                        </Typography>
                                                        <Button
                                                            size="small"
                                                            variant="contained"
                                                            onClick={() =>
                                                                openDialog(
                                                                    product.id,
                                                                )
                                                            }
                                                        >
                                                            Add To Cart
                                                        </Button>
                                                    </Stack>
                                                </CardContent>
                                            </Stack>
                                        </Card>
                                    </Grid>
                                );
                            })}
                    </Grid>
                )}
                <Stack
                    spacing={5}
                    direction="row"
                    className={classes.tabs}
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <FormControl style={{ minWidth: '300px' }}>
                        <InputLabel>Products Per Page</InputLabel>
                        <Select
                            value={productsPerPage}
                            label="Products Per Page"
                            onChange={handleProductsPerPageChange}
                        >
                            <MenuItem value={5}>5</MenuItem>
                            <MenuItem value={10}>10</MenuItem>
                            <MenuItem value={15}>15</MenuItem>
                        </Select>
                    </FormControl>
                    <Pagination
                        color="primary"
                        count={Math.ceil(
                            products.length / parseInt(productsPerPage),
                        )}
                        onChange={handlePaginationChange}
                    />
                </Stack>
                <CartDialog
                    open={openCartDialog}
                    productId={productId}
                    closeDialog={closeDialog}
                />
            </Box>
        </Box>
    ) : (
        <></>
    );
};

export default Products;
