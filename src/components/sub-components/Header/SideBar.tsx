import React from 'react';
import {
    Toolbar,
    List,
    Typography,
    ListItem,
    ListItemText,
    Drawer,
} from '@mui/material';
import { useGetAllCategoriesQuery } from '../../../services/category';

const drawerWidth = 240;

const SideBar = () => {
    const { data, error, isLoading } = useGetAllCategoriesQuery();
    return (
        <Drawer
            sx={{
                width: drawerWidth,
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
                <Typography variant="h5" component="div" align="center">
                    Boa Fresh
                </Typography>
            </Toolbar>
            <List>
                {isLoading ? (
                    <ListItemText primary="Loading" />
                ) : data ? (
                    data.data.map((category) => {
                        return (
                            <ListItem button key={category.title}>
                                <ListItemText primary={category.title} />
                            </ListItem>
                        );
                    })
                ) : (
                    <></>
                )}
            </List>
        </Drawer>
    );
};

export default SideBar;
