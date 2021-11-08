/* eslint-disable array-callback-return */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import { CryptoState } from "../../CryptoContext"
import { Avatar } from '@material-ui/core';
import { signOut } from '@firebase/auth';
import { auth, db } from '../../firebase';
import { numberWithCommas } from '../Banner/Carousel';
import { ImCross } from "react-icons/im"
import { BsFillEyeFill } from "react-icons/bs"
import { doc, setDoc } from '@firebase/firestore';

const useStyles = makeStyles({
    container: {
        width: 350,
        padding: 25,
        height: "100%",
        display: "flex",
        flexDirection: "column",
    },
    profile: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
        height: "92%",
    },
    picture: {
        width: 200,
        height: 200,
        cursor: "pointer",
        backgroundColor: "#EEBC1D",
        objectFit: "contain",
    },
    logout: {
        height: "8%",
        width: "100%",
        backgroundColor: "#EEBC1D",
        marginTop: 20,
        // fontWeight: "bold",
    },
    watchlist: {
        flex: 1,
        width: "100%",
        // backgroundColor: "grey",
        borderRadius: 10,
        padding: 15,
        paddingTop: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
        overflowY: "scroll",
    },
    coin: {
        padding: 10,
        borderRadius: 5,
        color: "black",
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#fff",
        // boxShadow: "0 0 3px black"
    }
});

export default function UserSidebar() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        right: false,
    });

    const { user, setAlert, watchlist, coins, symbol } = CryptoState();

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const removeFromWatchlist = async (coin) => {
        const coinRef = doc(db, "watchlist", user.uid);
        try {
            await setDoc(coinRef,
                { coins: watchlist.filter((watch) => watch !== coin?.id) },
                { merge: "true" }
            )

            setAlert({
                open: true,
                message: `${coin.name} removed from the watchlist !`,
                type: "success"
            })
        } catch (error) {
            setAlert({
                open: true,
                message: error.message,
                type: "error"
            })
        }
    }

    const logOut = () => {
        signOut(auth)
        setAlert({
            open: true,
            type: "success",
            message: "Logout Successfull !",
        });
        toggleDrawer();
    }

    const closeSidebar = () => {

    }

    return (
        <div>
            {['right'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <Avatar
                        onClick={toggleDrawer(anchor, true)}
                        style={{
                            height: 38,
                            width: 38,
                            narginleft: 15,
                            cursor: "pointer",
                            background: "#EEBC1D",
                        }}
                        src={user.photoURL}
                        alt={user.displayName || user.email}
                    />
                    <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                        <div className={classes.container}>
                            {/* close Drawer icon */}
                            <ImCross style={{ cursor: "pointer" }} onClick={closeSidebar} />

                            <div className={classes.profile}>
                                <Avatar
                                    className={classes.picture}
                                    src={user.photoURL}
                                    alt={user.displayName || user.email}
                                />
                                <span style={{
                                    width: "100%",
                                    fontSize: 20,
                                    textAlign: "center",
                                    fontWeight: "bold",
                                    wordWrap: "break-word",
                                }}>
                                    {user.displayName || user.email}
                                </span>
                                <div className={classes.watchlist}>
                                    <span
                                        style={{
                                            color: "#fff",
                                            fontsize: 15,
                                            fontWeight: "bold",
                                            textShadow: "0 0 3px black",
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyContent: "space-evenly",
                                        }}>
                                        Watchlist
                                        &nbsp;
                                        <BsFillEyeFill style={{ color: "#EEBC1D" }} />
                                    </span>
                                    {coins.map(coin => {
                                        if (watchlist.includes(coin.id))
                                            return (
                                                <div className={classes.coin}>
                                                    <span>{coin.name}</span>
                                                    <span style={{ display: "flex", gap: 8 }}>
                                                        {symbol}
                                                        {numberWithCommas(coin.current_price.toFixed(2))}
                                                        <ImCross
                                                            style={{ color: "#ff0000", cursor: "pointer", fontSize: 16 }}
                                                            onClick={() => { removeFromWatchlist(coin) }}
                                                        />
                                                    </span>
                                                </div>
                                            )
                                    })}
                                </div>
                            </div>
                            <Button
                                variant="contained"
                                className={classes.logout}
                                onClick={logOut}
                            >
                                Log Out
                            </Button>
                        </div>
                    </Drawer>
                </React.Fragment>
            ))
            }
        </div >
    );
}