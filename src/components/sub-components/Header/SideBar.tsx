import React from 'react';
import {
    Toolbar,
    List,
    Typography,
    ListItem,
    ListItemText,
    Drawer,
    ListSubheader,
    Box,
    Skeleton,
} from '@mui/material';
import { useGetAllCategoriesQuery } from '../../../services/category';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@mui/styles';

const useStyle = makeStyles({
    brandName: {
        margin: '15px auto',
        textAlign: 'center',
        fontWeight: 700,
    },
    sideBar: {
        flexShrink: 0,
        '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
        },
    },
});

const SideBar = () => {
    const classes = useStyle();
    const array = [1, 2, 3, 4, 5, 6];
    const { data, error, isLoading } = useGetAllCategoriesQuery();
    return error ? (
        <>Something is Wrong</>
    ) : (
        <Drawer className={classes.sideBar} variant="permanent" anchor="left">
            <Toolbar>
                <NavLink to="/">
                    <Box display={'flex'} className={classes.brandName}>
                        <Typography
                            color="primary"
                            variant="h4"
                            component="div"
                            align="center"
                        >
                            Boa
                        </Typography>
                        <Typography
                            color="secondary"
                            variant="h4"
                            component="div"
                            align="center"
                        >
                            Fresh
                        </Typography>
                        <Typography
                            variant="h4"
                            color='text.disabled'
                            fontWeight={600}
                            component="div"
                            align="center"
                        >
                            .
                        </Typography>
                    </Box>
                </NavLink>
            </Toolbar>
            <List
                aria-labelledby="categories-subheader"
                subheader={
                    <ListSubheader component="div" id="categories-subheader">
                        Product Categories
                    </ListSubheader>
                }
            >
                <NavLink to="/products">
                    <ListItem button key="products">
                        <ListItemText primary="All Products" />
                    </ListItem>
                </NavLink>

                {isLoading ? (
                    <Box>
                        {array.map((elem) => {
                            return (
                                <Box key={elem}>
                                    <Skeleton
                                        animation="wave"
                                        variant="text"
                                        width={200}
                                        height={50}
                                        style={{ marginLeft: '15px' }}
                                    />
                                </Box>
                            );
                        })}
                    </Box>
                ) : data ? (
                    data.data.map((category) => {
                        return (
                            <NavLink
                                to={`/products/category/${category.id}`}
                                key={category.id}
                            >
                                <ListItem button key={category.title}>
                                    <ListItemText
                                        primary={category.title
                                            .split(' ')
                                            .map((title): string => {
                                                return (
                                                    title.charAt(0) +
                                                    title
                                                        .slice(1)
                                                        .toLowerCase() +
                                                    ' '
                                                );
                                            })}
                                    />
                                </ListItem>
                            </NavLink>
                        );
                    })
                ) : (
                    <></>
                )}
            </List>
            <List
                aria-labelledby="categories-subheader"
                subheader={
                    <ListSubheader component="div" id="categories-subheader">
                        Accounts
                    </ListSubheader>
                }
            >
                <NavLink to="/signup">
                    <ListItem button key="signup">
                        <ListItemText primary="Create Account" />
                    </ListItem>
                </NavLink>
                <NavLink to="/login">
                    <ListItem button key="login">
                        <ListItemText primary="Login" />
                    </ListItem>
                </NavLink>
            </List>
        </Drawer>
    );
};

export default SideBar;
