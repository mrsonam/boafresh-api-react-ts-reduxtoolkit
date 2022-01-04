import { createTheme } from '@mui/material';

const theme = createTheme({
    typography: {
        fontFamily: ['"Montserrat"', 'Open Sans'].join(','),
    },
    palette: {
        primary: {
            light: '#428940',
            main: '#ee4238',
            dark: '#428940',
            contrastText: '#77777a',
        },
        secondary: {
            main: '#428940',
        },
    },
});

export default theme;
