import { makeStyles } from '@mui/styles';

export const useStyle = makeStyles({
    heading: {
        marginBottom: 30,
    },
    main: {
        maxWidth: '100vw',
        marginTop: 15,
        marginLeft: 240,
    },
    inner: {
        margin: '0 50px',
    },
    productCard: {
        alignItems: 'end',
        margin: '20px 0',
        width: 400,
        borderRadius: 20,
    },
    productImg: {
        height: 200,
        width: 'auto',
        borderRadius: 20,
    },
    checkout: {
        margin: '20px 0',
    },
});