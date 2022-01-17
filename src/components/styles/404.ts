import { makeStyles } from '@mui/styles';

export const useStyle = makeStyles({
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