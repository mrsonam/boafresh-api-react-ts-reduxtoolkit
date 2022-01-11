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
import { NavLink, useLocation } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';

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
    list: {
        padding: '0 20px',
    },
    link: {
        backgroundImage: `url${'https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'}`,
        color: '#ee4238',
        '&:hover': {
            boxShadow: 'none',
            color: '#ee4238',
        },
        '&:active': {
            boxShadow: 'none',
            color: '#ee4238',
        },
    },
});

const SideBar: React.FC = (): JSX.Element => {
    const classes = useStyle();

    const location = useLocation();

    const array = [1, 2, 3, 4, 5, 6];

    const { data, error, isLoading } = useGetAllCategoriesQuery();

    const token = localStorage.getItem('token');

    return error ? (
        <>Something is Wrong</>
    ) : (
        <Drawer className={classes.sideBar} variant="permanent" anchor="left">
            <Toolbar>
                <NavLink to="/boafresh-api-react-ts-reduxtoolkit">
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
                            color="text.disabled"
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
                className={classes.list}
                aria-labelledby="categories-subheader"
                subheader={
                    <ListSubheader component="div" style={{ fontSize: '12px' }}>
                        Product Categories
                    </ListSubheader>
                }
            >
                <NavLink to="/boafresh-api-react-ts-reduxtoolkit/products">
                    <ListItem
                        selected={
                            location.pathname ===
                            '/boafresh-api-react-ts-reduxtoolkit/products'
                        }
                        button
                        key="products"
                        classes={{ selected: classes.link }}
                    >
                        <ListItemText primary="All Products" />
                        {location.pathname ===
                        '/boafresh-api-react-ts-reduxtoolkit/products' ? (
                            <ChevronRightOutlinedIcon />
                        ) : (
                            <></>
                        )}
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
                                to={`/boafresh-api-react-ts-reduxtoolkit/products/category/${category.id}`}
                                key={category.id}
                            >
                                <ListItem
                                    selected={
                                        location.pathname ===
                                        `/boafresh-api-react-ts-reduxtoolkit/products/category/${category.id}`
                                    }
                                    button
                                    key={category.title}
                                    classes={{ selected: classes.link }}
                                >
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
                                    {location.pathname ===
                                    `/boafresh-api-react-ts-reduxtoolkit/products/category/${category.id}` ? (
                                        <ChevronRightOutlinedIcon />
                                    ) : (
                                        <></>
                                    )}
                                </ListItem>
                            </NavLink>
                        );
                    })
                ) : (
                    <></>
                )}
            </List>
            <List
                className={classes.list}
                aria-labelledby="categories-subheader"
                subheader={
                    <ListSubheader component="div" style={{ fontSize: '12px' }}>
                        Accounts
                    </ListSubheader>
                }
            >
                {token !== null ? (
                    <>
                        <NavLink to="/boafresh-api-react-ts-reduxtoolkit/profile">
                            <ListItem
                                selected={location.pathname === '/boafresh-api-react-ts-reduxtoolkit/profile'}
                                button
                                classes={{ selected: classes.link }}
                            >
                                <ListItemText primary="Profile" />
                                {location.pathname === '/boafresh-api-react-ts-reduxtoolkit/profile' ? (
                                    <ChevronRightOutlinedIcon />
                                ) : (
                                    <></>
                                )}
                            </ListItem>
                        </NavLink>
                        <NavLink to="/boafresh-api-react-ts-reduxtoolkit/changePassword">
                            <ListItem
                                selected={location.pathname === '/boafresh-api-react-ts-reduxtoolkit/changePassword'}
                                button
                                classes={{ selected: classes.link }}
                            >
                                <ListItemText primary="Change Password" />
                                {location.pathname === '/boafresh-api-react-ts-reduxtoolkit/changePassword' ? (
                                    <ChevronRightOutlinedIcon />
                                ) : (
                                    <></>
                                )}
                            </ListItem>
                        </NavLink>
                        <ListItem
                            classes={{ selected: classes.link }}
                            button
                            onClick={() => {
                                localStorage.removeItem('token');
                                window.location.href = './';
                            }}
                        >
                            <ListItemText primary="Logout" />
                        </ListItem>
                    </>
                ) : (
                    <>
                        <NavLink to="/boafresh-api-react-ts-reduxtoolkit/signup">
                            <ListItem
                                selected={location.pathname === '/boafresh-api-react-ts-reduxtoolkit/signup'}
                                button
                                key="signup"
                                classes={{ selected: classes.link }}
                            >
                                <ListItemText primary="Create Account" />
                                {location.pathname === '/boafresh-api-react-ts-reduxtoolkit/signup' ? (
                                    <ChevronRightOutlinedIcon />
                                ) : (
                                    <></>
                                )}
                            </ListItem>
                        </NavLink>
                        <NavLink to="/boafresh-api-react-ts-reduxtoolkit/login">
                            <ListItem
                                selected={location.pathname === '/boafresh-api-react-ts-reduxtoolkit/login'}
                                button
                                key="login"
                                classes={{ selected: classes.link }}
                            >
                                <ListItemText primary="Login" />
                                {location.pathname === '/boafresh-api-react-ts-reduxtoolkit/login' ? (
                                    <ChevronRightOutlinedIcon />
                                ) : (
                                    <></>
                                )}
                            </ListItem>
                        </NavLink>
                    </>
                )}
            </List>
        </Drawer>
    );
};

export default SideBar;
