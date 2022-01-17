import { makeStyles } from '@mui/styles';

export const useStyle = makeStyles({
    main: {
        maxWidth: '100vw',
        marginTop: '15px',
        marginLeft: '240px',
    },

    inner: {
        margin: '0 50px',
    },
    heading: {
        marginBottom: '30px',
    },
    cartCard: {
        margin: '20px 0',
        width: '600px',
        borderRadius: '20px',
    },
    deliveryCard: {
        margin: '20px 0',
        width: '600px',
        height: '430px',
        borderRadius: '20px',
    },

    cardImg: {
        height: 'auto',
        width: '30%',
        borderRadius: '20px',
    },
});
