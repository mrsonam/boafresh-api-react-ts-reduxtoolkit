import React, { useEffect, useState } from 'react';
import { useGetSearchedProductsQuery } from '../../services/products';
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
    SelectChangeEvent,
    Tabs,
    Tab,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Pagination,
} from '@mui/material';
import { GridViewOutlined, ViewListOutlined } from '@mui/icons-material';
import { NavLink, useParams } from 'react-router-dom';
import CartDialog from '../sub-components/Cart/CartDialog';
import { Product } from '../../types/products';
import { useStyle } from '../styles/products';
import ProductsSkeleton from '../sub-components/Products/ProductsSkeleton';

const SearchedProducts: React.FC = (): JSX.Element => {
    const [open, setOpen] = useState(false);
    const [productId, setProductId] = useState(0);

    const classes = useStyle();

    const { searchQuery } = useParams<Record<string, string | undefined>>();

    const { data, error, isLoading } = useGetSearchedProductsQuery(
        searchQuery || '',
    );

    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        setProducts(data?.data || []);
    }, [data]);

    const openDialog = (id: number) => {
        setProductId(id);
        setOpen(true);
    };

    const closeDialog = () => {
        setOpen(false);
    };

    const [value, setValue] = useState(0);

    const handleViewChange = (
        event: React.SyntheticEvent,
        newValue: number,
    ) => {
        setValue(newValue);
    };

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
        <ProductsSkeleton/>
    ) : data ? (
        <Box component="main" className={classes.main}>
            <Box className={classes.inner}>
                <Box className={classes.heading}>
                    <Typography variant="h4" component="div">
                        Searched Products : {searchQuery}
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        color="text.disabled"
                        component="div"
                    >
                        {data.data.length !== 1
                            ? `${data.data.length} Products`
                            : `${data.data.length} Product`}
                    </Typography>
                </Box>
                <Stack
                    spacing={5}
                    direction="row"
                    className={classes.tabs}
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Tabs value={value} onChange={handleViewChange}>
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
                {value === 0 ? (
                    <Grid container spacing={5}>
                        {products
                            .slice(indexOfFirst, indexOfLast)
                            .map((product) => {
                                return (
                                    <Grid item xs={2.4} key={product.id}>
                                        <Card
                                            sx={{ borderRadius: '20px' }}
                                            className={classes.productCard}
                                        >
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
                                    <Grid
                                        item
                                        xs={12}
                                        key={product.id}
                                    >
                                        <Card
                                            sx={{ borderRadius: '20px' }}
                                            className={classes.productCard}
                                        >
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
                {products.length < 5 ? (
                    <></>
                ) : (
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
                )}
                <CartDialog
                    open={open}
                    productId={productId}
                    closeDialog={closeDialog}
                />
            </Box>
        </Box>
    ) : (
        <></>
    );
};

export default SearchedProducts;
