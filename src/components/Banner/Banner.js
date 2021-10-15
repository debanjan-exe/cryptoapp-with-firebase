import { Container, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import Carousel from "./Carousel"

const useStyles = makeStyles(() => ({
    Banner: {
        backgroundImage: "url(./banner2.jpg)",
    },
    bannerContent: {
        height: 400,
        display: "flex",
        flexDirection: "column",
        paddingTop: 25,
        justifyContent: "space-around",
    },
    tagline: {
        display: "flex",
        height: "40%",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
    }
}))

const Banner = () => {
    const classes = useStyles();

    return (
        <div className={classes.Banner}>
            <Container className={classes.bannerContent}>
                <div className={classes.tagline}>
                    <Typography variant="h2" style={{
                        fontWeight: 400,
                        marginBottom: 15,
                        fontFamily: "'Bebas Neue', sans serif",
                        textTransform: "uppercase",
                        textShadow: "2px 2px 4px #000000",

                    }}>
                        Cryptogram💵
                    </Typography>
                    <Typography variant="subtitle2" style={{
                        color: "gold",
                        textTransform: "capitalize",
                        fontFamily: "Montserrat",
                        textShadow: "2px 2px 4px #000000",
                    }}>
                        Get the info regarding your favourite Crypto Currency
                    </Typography>
                </div>
                <Carousel />
            </Container>
        </div>
    )
}

export default Banner
