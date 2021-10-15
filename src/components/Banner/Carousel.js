import { makeStyles } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import axios from "axios"
import { CryptoState } from '../../CryptoContext'
import { TrendingCoins } from "../../config/api"
import AliceCarousel from 'react-alice-carousel'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    carousel: {
        height: "50%",
        display: "flex",
        alignItems: "center",
    },
    carouselItem: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        cursor: "pointer",
        textTransform: "uppercase",
        color: "white",
        fontFamily: "Montserrat,sans-serif"
    },
}))

export const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Carousel = () => {
    const [trending, setTrending] = useState([])
    const classes = useStyles()
    const { currency, symbol } = CryptoState();

    const fetchTrendingCoins = async () => {
        const { data } = await axios.get(TrendingCoins(currency));

        setTrending(data);
    };

    useEffect(() => {
        fetchTrendingCoins();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currency]);

    const responsive = {
        0: {
            items: 2,
        },
        512: {
            items: 4,
        },
    };

    const items = trending.map((coin) => {
        let profit = coin.price_change_percentage_24h >= 0;

        return (
            < Link
                className={classes.carouselItem}
                to={`/coin/${coin.id}`}
            >

                <img
                    src={coin?.image}
                    alt={coin.name}
                    height="80"
                    style={{ marginBottom: 10 }}
                />
                <span>
                    {coin?.symbol}
                    &nbsp;
                    <span style={{
                        color: profit > 0 ? "#32c900" : "#ff0000",
                        fontWeight: "bold",
                    }}>
                        {profit && "+"} {coin?.price_change_percentage_24h?.toFixed(2)}%
                    </span>
                </span>
                <span style={{ fontSize: 22, fontWeight: 500 }}>
                    {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
                </span>
            </Link >
        )
    })

    return (
        <div className={classes.carousel}>
            <AliceCarousel
                mouseTracking
                infinite
                autoPlayInterval={1000}
                animationDuration={1500}
                disableDotsControls
                disableButtonsControls
                responsive={responsive}
                autoPlay
                items={items}
            />
        </div>
    )
}

export default Carousel
