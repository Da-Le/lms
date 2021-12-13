import React from 'react'
import {
    Box,
    Typography,
    Link,
} from '@mui/material';
const style = {
    //helper
    marginTop: {
        marginTop: 2
    },
    textfieldStyle: {
        width: 300,
        height: 55,
        backgroundColor: "#fff",
    },
    textStyle: {
        marginLeft: 2,
        fontWeight: 400,
    },
    section1: {
        padding: "70px 0px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: (theme) => theme.palette.primary.main
    },
    contactContainer: {
        backgroundColor: "#fff",
        marginTop: 2,
        height: 56,
        width: 300,
        padding: 2
    },
    logoContainer: {
        flexDirection: 'row'
    },
    logoStyle: {
        marginLeft: 4
    }
}

export default function Footer() {
    return (
        <Box>
            <Box sx={style.section1}>
                <Typography variant="body2" color="textSecondary" align="center" sx={{ fontSize: 20, color: "white" }}>
                    {'Made with ❤️ by Team Payaman. Copyright © '}
                    <Link color="inherit" href="#">
                        Rendezvous
                    </Link>{' '}
                    {new Date().getFullYear()}
                    {'.'}
                </Typography>
            </Box>
        </Box>
    )
}
