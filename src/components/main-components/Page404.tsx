import { Box, Button, CardMedia, Stack, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { NavLink } from 'react-router-dom';

const useStyle = makeStyles({
    main: {
        maxWidth: '100vw',
        marginLeft: '240px',
    },
    home: {
        margin: '0',
    },
    backgroundImg: {
        position: 'relative',
        margin: '0 auto',
        width: '80%',
        height: '700px',
        backgroundImage: `url(${'https://i.ibb.co/28z8FwR/404-bgnew.png'})`,
    },
    cardImg: {
        position: 'absolute',
        width: '500px',
        margin: '0 auto',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    },
    heading: {
        marginBottom: '30px',
        textAlign: 'center',
    },
    button: {
        width: '200px',
        margin: 'auto',
    },
});

const Page404 : React.FC = (): JSX.Element => {
    const classes = useStyle();
    return (
        <Box className={classes.main} component="main">
            <Box className={classes.home}>
                <Box className={classes.backgroundImg}>
                    <Typography
                        variant="h3"
                        component="div"
                        className={classes.heading}
                    >
                        Page Not Found!
                    </Typography>
                    <CardMedia
                        component="img"
                        className={classes.cardImg}
                        image={`https://i.ibb.co/WPXP6dV/404.png`}
                        alt="404 Page Not Found"
                    />
                </Box>
                <Stack>
                    <Typography
                        variant="h5"
                        component="div"
                        className={classes.heading}
                    >
                        The page you are looking for does not exist!
                    </Typography>
                    <Button variant="contained" className={classes.button}>
                        <NavLink to="/boafresh-api-react-ts-reduxtoolkit" style={{color: '#fff'}}>Go Back to Homepage</NavLink>
                    </Button>
                </Stack>
            </Box>
        </Box>
    );
};

export default Page404;
