import React from 'react'
import { useHistory } from 'react-router-dom';
import {
    AppBar,
    Container,
    createTheme,
    makeStyles,
    MenuItem,
    Select,
    Toolbar,
    Typography,
    ThemeProvider,
} from '@material-ui/core'
import { CryptoState } from '../CryptoContext';

const useStyles = makeStyles(() => ({
    title: {
        flex: 1,
        color: "gold",
        // fontFamily: "'Satisfy', cursive;",
        fontFamily: "Grand Hotel",
        fontWeight: 400,
        cursor: "pointer",
    },
}))

const Header = () => {

    const classes = useStyles();
    const history = useHistory();

    const { currency, setCurrency } = CryptoState();

    const darkTheme = createTheme({
        palette: {
            primary: {
                main: "#fff",
            },
            type: 'dark',
        },
    });

    return (
        <ThemeProvider theme={darkTheme}>
            <AppBar color="transparent" position="static">
                <Container>
                    <Toolbar>
                        <Typography
                            onClick={() => history.push("/")}
                            className={classes.title}
                            variant="h5"
                        >
                            Cryptogram
                        </Typography>
                        <Select
                            variant="outlined"
                            style={{
                                width: 100,
                                height: 40,
                                marginRight: 15,
                            }}
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                        >
                            <MenuItem value={"USD"}>USD</MenuItem>
                            <MenuItem value={"INR"}>INR</MenuItem>
                        </Select>
                    </Toolbar>
                </Container>
            </AppBar>
        </ThemeProvider>
    )
}

export default Header
