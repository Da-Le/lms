import React from 'react';

import {
    Box,
    Button,
    Typography,
    Grid,
} from '@mui/material';

import LiveTvIcon from '@mui/icons-material/LiveTv';

const style = {
    //helper
    marginTop3: {
        marginTop: 3
    },
    marginLeft1: {
        marginLeft: {
            xs: 1,
            sm: 5,
        }
    },
    root: {
        backgroundColor: (theme) => theme.palette.background.default,
    },
    menuLink: {
        fontSize: "1.2rem",
        marginLeft: 2,
        "&:hover": {
            color: (theme) => theme.palette.secondary.main,
        }
    },
    section1: {
        padding: "140px 0px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "320px",
        width: 1800,
        marginLeft: {
            xs: 0,
            sm: 5,
            md: 10
        }
    },

    headingStyle1: {
        textAlign: "center",
        fontWeight: 700,
        fontSize: {
            xs: "1.0rem",
            sm: "1.2rem",
            md: "2.8rem",
        },
        fontFamily: "ComicSans"
    },
    subtitle1: {
        textAlign: "center",
        fontSize: {
            xs: "1rem",
            sm: "1.2rem",
            md: "1.5rem",
        },
    },
    section2: {
        backgroundColor: (theme) => theme.palette.primary.main,
        padding: "26px 0",
        width: '100%',
    },
    userImage: {
        height: {
            xs: 200,
            sm: 250
        },
        width: {
            xs: 200,
            sm: 250
        },
    },
    images: {
        height: 400
    },
    columnContainer: {
        display: "flex",
        justifyContent: "center",
        padding: 5
    }
}

export default function HomeComponent() {


    return (
        <Box component={Grid} container justifyContent="center" id="Home">
            <Box sx={style.section1}>
                <Grid container justifyContent="flex-start">
                    <Typography variant="h1" color="textPrimary" sx={{ ...style.headingStyle1, ...style.marginTop3, ...style.marginLeft1 }}>
                        In learning you will teach, and in teaching you will learn
                    </Typography>
                </Grid>
                <Grid container justifyContent="flex-start">
                    <Typography variant="subtitle1" sx={{ ...style.marginLeft1, ...style.marginTop3 }}>Learning is not attained by chance, it must be sought for with ardor and attended to with diligence</Typography>
                </Grid>
                <Grid container justifyContent="flex-start">
                    <Button variant="contained" sx={{ ...style.marginLeft1, ...style.marginTop3 }}>Learn More</Button>
                </Grid>
            </Box>
            {/* This is a component section 2 */}
            <Box sx={style.section2}>
                <Grid container justifyContent="center">
                    <Grid sm item sx={style.columnContainer}>
                        <LiveTvIcon />
                        <Grid>
                            <Typography>968 online courses</Typography>
                            <Typography>968 online courses</Typography>
                        </Grid>

                    </Grid>
                    <Grid sm item>
                        <Grid sm item sx={style.columnContainer}>
                            <LiveTvIcon />
                            <Grid>
                                <Typography>968 online courses</Typography>
                                <Typography>968 online courses</Typography>
                            </Grid>

                        </Grid>
                    </Grid>
                    <Grid sm item>
                        <Grid sm item sx={style.columnContainer}>
                            <LiveTvIcon />
                            <Grid>
                                <Typography>968 online courses</Typography>
                                <Typography>968 online courses</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}
