import { makeStyles } from '@material-ui/styles'
import React from 'react'

const SelectButton = ({ selected, children, onClick }) => {

    const useStyles = makeStyles({
        selectbutton: {
            border: "1px solid gold",
            borderRadius: 5,
            padding: 10,
            paddingLeft: 20,
            paddingRight: 20,
            fontFamily: "Montserrat",
            cursor: "pointer",
            backgroundColor: selected ? "gold" : "",
            color: selected ? "black" : "",
            fontWeight: selected ? 700 : 500,
            transition: "all 0.1s ease-in-out",
            "&:hover": {
                backgroundColor: "gold",
                color: "black",
                // fontWeight: 600,
            },
            width: "22%",
            //   margin: 5,
        },
    })

    const classes = useStyles();

    return (
        <span onClick={onClick} className={classes.selectbutton}>
            {children}
        </span>
    )
}

export default SelectButton
