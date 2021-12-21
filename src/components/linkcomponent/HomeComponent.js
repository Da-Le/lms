import React, {useEffect, useState} from 'react';
import {getDocsByCollection} from '../../utils/firebaseUtil'
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
        padding: "140px 0px 0px 0px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        // height: "320px",
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
        padding: 5,
        h2: {
            textAlign: "center",
            fontSize: {
                xs: "2rem",
                sm: "2.2rem",
                md: "2.5rem",
            },
            color: (theme) => theme.colors.textColor
        }
    }
}

export default function HomeComponent() {
    const [users, setUsers] = useState(0)
    const [classRooms, setClassRooms] = useState(0)

    useEffect(() => {
        getDocsByCollection('users').then(item => {
            setUsers(item.length)
        })
        getDocsByCollection('createclass').then(item => {
            setClassRooms(item.length)
        })
      }, []);

    return (
        <Box component={Grid} container justifyContent="center" id="Home">
            <Box sx={style.section1}>
                <Grid container justifyContent="flex-start">
                    <Grid item xs={6}>
                        <Typography variant="h1" color="textPrimary" sx={{ ...style.headingStyle1, ...style.marginTop3, ...style.marginLeft1 }}>
                            Learning never exhausts the mind
                        </Typography>
                        <Typography variant="subtitle1" color="textPrimary" sx={{ ...style.subtitle1, ...style.marginTop3 }}>
                            Rendezvous aims to create an innovative e-learning environment for the teachers and students
                        </Typography>
                        <div style={{ display: 'flex', justifyContent:'center' }}>
                            <Button variant="contained">Start Now</Button>
                        </div>
                        
                    </Grid>
                    <Grid item xs={6}>
                    <img
                        src={"assets/img/section1.png"}
                    />
                    </Grid>
                    
                </Grid>
            </Box>
            {/* This is a component section 2 */}
            <Box sx={style.section2}>
                <Grid container justifyContent="center">
                    <Grid sm item sx={style.columnContainer}>
                        <Typography variant="h2">{users} Users</Typography>
                    </Grid>
                    <Grid sm item sx={style.columnContainer}>
                        <Typography variant="h2">{classRooms} Classrooms</Typography>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}
