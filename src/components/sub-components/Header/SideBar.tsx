import React from 'react';
import {
    Toolbar,
    List,
    Typography,
    ListItem,
    ListItemText,
    Drawer,
    ListSubheader,
} from '@mui/material';
import { useGetAllCategoriesQuery } from '../../../services/category';
import './SideBar.css';

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
                <Typography
                    color='primary'
                    variant="h5"
                    component="div"
                    align="center"
                    className="brandName"
                >
                    Boa Fresh
                </Typography>
            </Toolbar>
            <List
                aria-labelledby="categories-subheader"
                subheader={
                    <ListSubheader component="div" id="categories-subheader">
                        Product Categories
                    </ListSubheader>
                }
            >
                {isLoading ? (
                    <Typography variant="h6" component="div">
                    Loading...
                </Typography>
                ) : data ? (
                    data.data.map((category) => {
                        return (
                            <ListItem button key={category.title}>
                                <ListItemText
                                    primary={
                                        category.title.charAt(0) +
                                        category.title.slice(1).toLowerCase()
                                    }
                                />
                            </ListItem>
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
                <ListItem button key='signup'>
                    <ListItemText primary="Create Account" />
                </ListItem>
                <ListItem button key='login'>
                    <ListItemText primary="Login" />
                </ListItem>
                
            </List>
        </Drawer>
    );
};

export default SideBar;
