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
} from '@mui/material';
import { useGetAllCategoriesQuery } from '../../../services/category';
import './SideBar.css';
import { NavLink } from 'react-router-dom';

const drawerWidth = 240;

const SideBar = () => {
    const { data, error, isLoading } = useGetAllCategoriesQuery();
    return (
        <Drawer
            className="sideBar"
            sx={{
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                },
            }}
            variant="permanent"
            anchor="left"
        >
            <Toolbar>
                <NavLink to="/">
                    <Box display={'flex'} className="brandName">
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
                    <Typography variant="h6" component="div">
                        Loading...
                    </Typography>
                ) : data ? (
                    data.data.map((category) => {
                        return (
                            <NavLink to={`/products/category/${category.id}`} key={category.id}>
                                <ListItem button key={category.title}>
                                    <ListItemText
                                        primary={
                                            category.title.charAt(0) +
                                            category.title
                                                .slice(1)
                                                .toLowerCase()
                                        }
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
