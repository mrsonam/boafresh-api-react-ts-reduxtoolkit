import { makeStyles } from '@mui/styles';

export const useStyle = makeStyles({
    main: {
        maxWidth: '100vw',
        marginTop: '15px',
        marginLeft: '240px',
    },
    inner: {
        margin: '100px 150px',
    },
    heading: {
        marginBottom: '30px',
        textAlign: 'center',
    },
    formCard: {
        height: '100%',
        borderRadius: '25px',
        padding: '0 50px 50px',
        backgroundImage: `url(${'https://images.unsplash.com/photo-1490818387583-1baba5e638af?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80'})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
    },
});