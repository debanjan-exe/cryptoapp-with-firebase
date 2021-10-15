import React, { useEffect, useState } from 'react'
import { CoinList } from '../config/api'
import { CryptoState } from '../CryptoContext'
import axios from "axios"
import { Container, createTheme, LinearProgress, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider, Typography } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { numberWithCommas } from "./Banner/Carousel"
import { Pagination } from '@material-ui/lab'

const CoinsTable = () => {
    const [coins, setCoins] = useState([])
    const [loading, setLoading] = useState(false)
    const { currency, symbol } = CryptoState()
    const [search, setSearch] = useState("")
    const history = useHistory()
    const [page, setPage] = useState(1)

    const fetchCoins = async () => {
        setLoading(true);
        const { data } = await axios.get(CoinList(currency));
        setCoins(data);
        setLoading(false);
    }

    useEffect(() => {
        fetchCoins();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currency]);

    const darkTheme = createTheme({
        palette: {
            primary: {
                main: "#fff",
            },
            type: "dark",
        },
    })

    const handleSearch = () => {
        return coins.filter((coin) => (
            coin.name.toLowerCase().includes(search) ||
            coin.symbol.toLowerCase().includes(search)
        ))
    }

    const useStyles = makeStyles(() => ({
        row: {
            backgroundColor: "#16171a",
            cursor: "pointer",
            fontFamily: "Montserrat",
            "&:hover": {
                backgroundColor: "#131111",
            }
        },
        pagination: {
            "& .MuiPaginationItem-root": {
                color: "gold",
            },
        },
    }));

    const classes = useStyles();

    return (
        <ThemeProvider theme={darkTheme}>
            <Container style={{ textAlign: "center" }}>
                <Typography variant="h4"
                    style={{ margin: 18, fontFamily: "Montserrat" }}
                >
                    Cryptocurrency Prices By Market Cap
                </Typography>
                <TextField
                    label="Search for a crypto currency"
                    variant="outlined"
                    style={{ width: "100%", marginBottom: 20 }}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <TableContainer>
                    {
                        loading ? (
                            <LinearProgress style={{ backgroundColor: "gold" }} />
                        ) : (
                            <Table>
                                <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                                    <TableRow>
                                        {
                                            ["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                                                <TableCell style={{
                                                    color: "black",
                                                    fontWeight: "700",
                                                    fontFamily: "Montserrat",
                                                }}
                                                    key={head}
                                                    align={head === "Coin" ? "" : "right"}
                                                >
                                                    {head}
                                                </TableCell>
                                            ))
                                        }
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {handleSearch().slice((page - 1) * 10, (page - 1) * 10 + 10).map(row => {
                                        const profit = row.price_change_percentage_24h > 0;

                                        return (
                                            <TableRow onClick={() => history.push(`/coin/${row.id}`)}
                                                className={classes.row}
                                                key={row.name}>
                                                <TableCell component='th' scope="row"
                                                    style={{
                                                        display: "flex",
                                                        gap: 15,
                                                    }}>
                                                    <img
                                                        src={row?.image}
                                                        alt={row.name}
                                                        height="50"
                                                        style={{ marginBottom: 10 }}
                                                    />
                                                    <div style={{ display: "flex", flexDirection: "column" }}>
                                                        <span
                                                            style={{
                                                                textTransform: "uppercase",
                                                                fontSize: 22,
                                                            }}
                                                        >
                                                            {row.symbol}
                                                        </span>
                                                        <span style={{ color: "darkgrey" }}>
                                                            {row.name}
                                                        </span>
                                                    </div>
                                                </TableCell>

                                                <TableCell align="right" style={{ fontWeight: "500" }}>
                                                    {symbol}{" "}
                                                    {numberWithCommas(row.current_price.toFixed(2))}
                                                </TableCell>

                                                <TableCell
                                                    align="right"
                                                    style={{
                                                        color: profit > 0 ? "#32c900" : "#ff0000",
                                                        fontWeight: 500,
                                                    }}
                                                >
                                                    {profit && "+"}
                                                    {row.price_change_percentage_24h.toFixed(2)}%
                                                </TableCell>

                                                <TableCell align="right">
                                                    {symbol} {" "}
                                                    {numberWithCommas(row.market_cap.toString().slice(0, -6))} M
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })}
                                </TableBody>
                            </Table>
                        )
                    }
                </TableContainer>
                <Pagination
                    style={{
                        padding: 20,
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                    }}
                    className={classes.pagination}
                    count={(handleSearch()?.length / 10).toFixed(0)}
                    onChange={(_, value) => {
                        setPage(value);
                        window.scroll(0, 463);
                    }}
                />
            </Container>
        </ThemeProvider>
    )
}

export default CoinsTable
