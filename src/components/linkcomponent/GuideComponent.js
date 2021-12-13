import React from 'react'

import {
    Box,
    Typography,
    Grid,
} from '@mui/material';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import Bulb from '../../assets/img/png/bulb.png'
import Find from '../../assets/img/jpg/find.jpg'
import Message from '../../assets/img/jpg/message.jpg'
const style = {
    //helper
    textAlignStyle: {
        textAlign: 'center',
    },
    textStyle: {
        fontSize: 25,
        fontWeight: 500,
        color: (theme) => theme.palette.primary.main
    },
    descriptStyle: {
        fontSize: 18,
        fontWeight: 200
    },

    section1: {
        padding: "100px 0px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: 1800
    },
    cardStyle: {
        maxWidth: 345,
        height: 450,
        marginTop: 10,
    },
    imgStyle: {
        height: 200,
        width: 200
    }
}

export default function GuideComponent() {
    return (
        <Box component={Grid} container justifyContent="center" id="Guide">
            <Box sx={style.section1}>
                <Box component={Grid} container justifyContent="center">
                    <Typography variant="h2">Guide</Typography>
                </Box>
                <Box component={Grid} container justifyContent="center" sx={{ padding: 2 }}>
                    <Grid sm item>
                        <Grid container justifyContent="center">
                            <Card sx={style.cardStyle}>
                                <Grid container justifyContent="center" sx={{ marginTop: -3 }}>
                                    <img src={Bulb} alt="message" style={style.imgStyle} />
                                </Grid>
                                <CardContent>
                                    <Typography gutterBottom sx={{ ...style.textStyle, ...style.textAlignStyle }}>
                                        Focused on K-12 schools just like yours
                                    </Typography>
                                    <Typography variant="body2" sx={{ ...style.textAlignStyle, ...style.descriptStyle }}>
                                        Elementary students don’t learn the same way as college students or adults. Rendezvous was designed for all students—from kindergarten through 12th grade—to be fully engaged with their learning.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                    <Grid sm item>
                        <Grid container justifyContent="center">
                            <Card sx={style.cardStyle}>
                                <Grid container justifyContent="center" sx={{ marginTop: -2 }}>
                                    <img src={Find} alt="message" style={style.imgStyle} />
                                </Grid>
                                <CardContent>
                                    <Typography gutterBottom sx={{ ...style.textStyle, ...style.textAlignStyle }}>
                                        Designed for district success together
                                    </Typography>
                                    <Typography variant="body2" sx={{ ...style.textAlignStyle, ...style.descriptStyle }}>
                                        Rendezvous has spent the last 10 years learning from our 1,600+ customers and more than 20 million users about what products and services classrooms, schools, and entire districts need to be successful.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                    <Grid sm item>
                        <Grid container justifyContent="center">
                            <Card sx={style.cardStyle}>
                                <Grid container justifyContent="center" sx={{ marginTop: -5 }}>
                                    <img src={Message} alt="message" style={style.imgStyle} />
                                </Grid>
                                <CardContent>
                                    <Typography gutterBottom sx={{ ...style.textStyle, ...style.textAlignStyle }}>
                                        Bring your community together
                                    </Typography>
                                    <Typography variant="body2" sx={{ ...style.textAlignStyle, ...style.descriptStyle }}>
                                        Learning is not just about teachers and students. Rendezvous allows you to bring everyone together—students, teachers, coaches, parents, administrators—with one communication and collaboration platform.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>
            </Box >
        </Box >
    )
}
