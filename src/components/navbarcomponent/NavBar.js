import React from 'react'
import {
    Box,
    Button,
    AppBar,
    Toolbar,
    Typography,
    Grid,
    useMediaQuery,
    Link
} from '@mui/material';

import { Link as ReactLink } from 'react-router-dom';

import Scroll from "react-scroll";

import { useTheme } from '@mui/material/styles';

// import logoRendezvous from '../../assets/img/jpg/RendezvousNewLogo.jpg';

import SideDrawer from './drawercomponent/SideDrawer';

const ScrollLink = Scroll.Link;

const style = {
    accountButton: {
        fontSize: '20px',
        width: '100%',
        color: (theme) => theme.colors.navButton,
        '&:hover': {
            color: (theme) => theme.colors.navButtonHover,
        }
    },
    logoStyle: {
        height: "100&",
        width: "auto",
    },
    title: {
        fontSize: '25px',
        marginLeft: 1,
        color: (theme) => theme.colors.navButton
    },
    menuLinks: {
        marginLeft: 8,
        '&:hover': {
            background: '#4877c2',
            color: (theme) => theme.colors.navButton,
        }
    },
    linkStyle: {
        textDecoration: "none",
    },
    btnLinks: {
        marginLeft: 3,
        fontSize: '25px',
        width: '100px',
        textDecoration: 'none',
        color: (theme) => theme.colors.navButton,
        textTransform: 'none',
        '&:hover': {
            color: (theme) => theme.colors.navButtonHover,
        }
    },
    linkContainer: {
        justifyContent: 'end',
        flexGrow: {
            xs: '1',
            sm: '1',
            md: '0'
        }
    },
    toolbarStyle: {
        padding: {
            xs: 1,
            sm: 1,
            md: 2
        },
        width: 1800
    }
}

export default function NavBar() {

    const theme = useTheme();

    const matchMD = useMediaQuery(theme.breakpoints.up('md'));

    

    return (
        <Box component={Grid} container justifyContent="center">
            <AppBar position="relative" color="transparent" elevation={0}>
                <Grid container justifyContent="center">
                    <Toolbar sx={style.toolbarStyle}>
                        
                        <Link href="#" sx={style.linkStyle}>
                            <img
                                src={'assets/img/logo.png'}
                                alt="Rendezvous Logo"
                                style={style.logoStyle}
                            />
                        </Link>
                        <Box component="span" style={style.linkContainer} />
                        {!matchMD ? <SideDrawer /> :
                            <>
                                <Box component="span" sx={{ flexGrow: 1 }} align="right" style={style.linkContainer}>
                                    <Grid container justifyContent="center">
                                        <ScrollLink
                                            className="navy"
                                            smooth={true}
                                            duration={500}
                                            to="Home"
                                        >
                                            <Button sx={style.btnLinks} >
                                                Home
                                            </Button>
                                        </ScrollLink>
                                        <ScrollLink
                                            className="navy"
                                            smooth={true}
                                            duration={500}
                                            to="Guide"
                                        >
                                            <Button sx={style.btnLinks} >
                                                Guide
                                            </Button>
                                        </ScrollLink>
                                        <ScrollLink
                                            className="navy"
                                            smooth={true}
                                            duration={500}
                                            to="About"
                                        >
                                            <Button sx={style.btnLinks} >
                                                About
                                            </Button>
                                        </ScrollLink>
                                        <ScrollLink
                                            className="navy"
                                            smooth={true}
                                            duration={500}
                                            to="Contact"
                                        >
                                            <Button sx={style.btnLinks} >
                                                Contact
                                            </Button>
                                        </ScrollLink>
                                        <Link component={ReactLink} to="/login" sx={style.linkStyle}>
                                            <Button sx={style.accountButton}>
                                                Log in
                                            </Button>
                                        </Link>
                                        <Link component={ReactLink} to="/register" sx={style.linkStyle}>
                                            <Button sx={style.accountButton} >
                                                Sign up
                                            </Button>
                                        </Link>
                                    </Grid>
                                </Box>

                                
                            </>
                        }
                    </Toolbar>
                </Grid>
            </AppBar>
        </Box>
    )
}
