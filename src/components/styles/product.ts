import { makeStyles } from '@mui/styles';

export const useStyle = makeStyles({
    main: {
        maxWidth: '100vw',
        marginTop: '15px',
        marginLeft: 240,
    },
    inner: {
        margin: '0 50px',
    },
    heading: {
        marginBottom: '30px',
    },
    productCard: {
        display: 'flex',
        background: 'transparent',
        boxShadow: 'none',
    },
    cardImg: {
        height: 'auto',
        width: '30%',
        borderRadius: '20px',
    },
});
