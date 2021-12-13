import React from 'react'

import {
    Box,
    AppBar,
    Toolbar,
    Typography,
    Grid,
} from '@mui/material';

import Clipdrawer from '../dashboardcomponent/ClipDrawer';

import logo from '../../../assets/img/jpg/RendezvousNewLogo.jpg'

const drawerWidth = 80;

const style = {
    imageStyle: {
        height: 180,
        width: 180,
    },
    textStyle: {
        marginTop: 80,
        marginLeft: 20
    },
    margin: {
        marginLeft: 40
    },
    paperstyle: {
        width: 800,
        marginTop: 90,
        marginLeft: 80,
    },
    aboutInfoContainer: {
        marginTop: 40,
        marginLeft: 140,
    },
    text: {
        textAlign: "center",
        marginBottom: 5,
        marginTop: 10,
        fontSize: 25,
        fontWeight: 500
    },
    titleClass: {
        fontSize: {
            xs: 18,
            sm: 25,
            md: 25
        },
        fontWeight: 480,
        marginLeft: 2
    },
}


export default function DashboardAbout() {
    return (
        <Box>
            <Clipdrawer>
                <Box component={Grid} container justify="center" alignItems="center" alignContent="center">
                    <AppBar
                        position="fixed"
                        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
                    >
                        <Toolbar>
                            <Typography noWrap component="div" sx={style.titleClass}>
                                ABOUT
                            </Typography>
                        </Toolbar>
                    </AppBar>
                </Box>
                <Box component={Grid} container justifyContent="center" sx={{paddingTop: 5}}>
                    <Grid sm item >
                        <Box component={Grid} container justifyContent='center'>
                            <img src={logo} alt="photo1" style={style.imageStyle} />
                        </Box>
                        <Box component={Grid} container justify='center'>
                            <Typography sx={{ textAlign: "center" }}>
                                Rendezvous is a online platform for new normal education and provide
                                user friendly environment for students, teacher and School Administrator.
                                The Student can pick an appointment date and time for his school documents
                                or concern.
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid sm item sx={{ padding: 2, marginTop: -5 }}>
                        <Box component={Grid} container justifyContent='center'>
                            <Typography sx={style.text}>
                                Mission
                            </Typography>
                            <Typography sx={{ textAlign: "center" }}>
                                Rendezvous is a online platform for new normal education and provide
                                user friendly environment for students, teacher and School Administrator.
                                The Student can pick an appointment date and time for his school documents
                                or concern.
                            </Typography>
                        </Box>
                        <Box component={Grid} container justifyContent='center'>
                            <Typography sx={style.text}>
                                Vission
                            </Typography>
                            <Typography sx={{ textAlign: "center" }}>
                                Rendezvous is a online platform for new normal education and provide
                                user friendly environment for students, teacher and School Administrator.
                                The Student can pick an appointment date and time for his school documents
                                or concern.
                            </Typography>
                        </Box>
                    </Grid>

                    <Box component={Grid} container justifyContent='center'>
                        <Grid item sm={3}>
                            <Box component={Grid} container justifyContent='center'>
                                <Typography sx={style.text}>Contact Us</Typography>
                                <Grid container>
                                    <Grid container justifyContent='center'>
                                        <Typography>(+63) 99231312313</Typography>
                                    </Grid>
                                    <Grid container justifyContent='center'>
                                        <Typography>(+63) 99231312313</Typography>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                        <Grid item sm={3}>
                            <Box component={Grid} container justifyContent='center'>
                                <Typography sx={style.text}>Email</Typography>
                                <Grid container>
                                    <Grid container justifyContent='center'>
                                        <Typography>Rendezvous@gmail.com</Typography>
                                    </Grid>
                                    <Grid container justifyContent='center'>
                                        <Typography>Rendezvous@yahoo.com</Typography>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                        <Grid item sm={3}>
                            <Box component={Grid} container justifyContent='center'>
                                <Typography sx={style.text}>Social Media</Typography>
                                <Grid container>
                                    <Grid container justifyContent='center'>
                                        <Typography>Facebook: facebook.com/rdv</Typography>
                                    </Grid>
                                    <Grid container justifyContent='center'>
                                        <Typography>Twitter: @rdv</Typography>
                                    </Grid>
                                    <Grid container justifyContent='center'>
                                        <Typography>Instagram: @_rdv</Typography>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                    </Box>
                </Box>
            </Clipdrawer>
        </Box>
    )
}
