import React, {useEffect} from 'react';

import {
    Box,
    Button,
    AppBar,
    Toolbar,
    Typography,
    Grid,
} from '@mui/material';

import Clipdrawer from '../dashboardcomponent/ClipDrawer';

import {getDocsByCollection} from '../../../utils/firebaseUtil';

const drawerWidth = 80;

const style = {
    dashboariconStyle: {
        color: 'black',
        fontSize: '1.9rem',
        marginRight: "15px",
    },
    gridcontainer: {
        marginTop: 2,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        padding: 3
    },
    titleClass: {
        fontSize:{
            xs: 18,
            sm: 25,
            md: 25
        },
        fontWeight: 480,
        marginLeft: 2
    },
}

export default function DashboardUser() {

    useEffect(() => {
        // getDocsByCollection('createclass')
        // .then(item => {
        //     console.log(item)
        // })
      }, []);

      const getData = () => {
        getDocsByCollection('createclass')
        .then(item => {
            console.log(item)
        })
      }

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
                                DASHBOARD
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <Box component={Grid} container justifyContent="flex-start" sx={{ paddingTop: 5 }}>
                        <Grid container sx={style.gridcontainer} justifyContent='space-between'>
                            <Grid item>
                                <Typography>June 2, 2021</Typography>
                                <Typography sx={{ marginTop: 3 }}>Subject: Data Structure</Typography>
                            </Grid>
                            <Grid item>
                                <Typography sx={{ marginTop: 6 }}>Assignment #01:</Typography>
                            </Grid>
                            <Grid item>
                                <Typography sx={{ marginTop: 6 }}>Deadline:June 6, 2021</Typography>
                            </Grid>
                            <Grid item>
                                <Button variant="contained" color="primary" sx={{ marginTop: 5 }}>VIEW</Button>
                            </Grid>
                        </Grid>
                        <Grid container sx={style.gridcontainer} justifyContent='space-between'>
                            <Grid item>
                                <Typography>June 2, 2021</Typography>
                                <Typography sx={{ marginTop: 3 }}>Subject: Data Structure</Typography>
                            </Grid>
                            <Grid item>
                                <Typography sx={{ marginTop: 6 }}>Assignment #01:</Typography>
                            </Grid>
                            <Grid item>
                                <Typography sx={{ marginTop: 6 }}>Deadline:June 6, 2021</Typography>
                            </Grid>
                            <Grid item>
                                <Button variant="contained" color="primary" sx={{ marginTop: 5 }}>VIEW</Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Clipdrawer>
        </Box>
    )
}
