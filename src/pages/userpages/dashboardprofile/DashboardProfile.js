import React from 'react';

import {
    Box,
    AppBar,
    Toolbar,
    Typography,
    Grid,
    Avatar,
    Button
} from '@mui/material';

import Clipdrawer from '../dashboardcomponent/ClipDrawer';

import { logoutInitiate } from '../../../redux/actions/userAction';

import { useSelector, useDispatch } from 'react-redux';

import { useHistory } from 'react-router';

const drawerWidth = 80;

const style = {
    dashboariconStyle: {
        color: 'black',
        fontSize: '1.9rem',
        marginRight: "15px",
    },
    gridcontainer: {

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
    profileContainer: {
        width: '100%',
        marginTop: 2,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        padding: 10,
        flexDirection: "column"
    }
}


export default function DashboardProfile() {

    const history = useHistory();

    const dispatch = useDispatch();

    const { user } = useSelector((state) => state);

    const handleLogout = () => {
        if (user) {
            dispatch(logoutInitiate());
            history.push('/');
        }
    }
    console.log(user);

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
                                Profile
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <Box component={Grid} container justifyContent="flex-start" sx={{ paddingTop: 8 }}>
                        <Box component={Grid} container sx={style.profileContainer}>
                            <Grid container justifyContent="center">
                                <Avatar alt="Remy Sharp" sx={{ width: 100, height: 100 }} src={user.currentUser.photoURL}/>
                            </Grid>
                            <Typography variant="h6" sx={{ margin: 3, textAlign: "center" }}>Name: {user.currentUser.displayName} </Typography>
                            <Typography variant="h6" sx={{ margin: 3, textAlign: "center" }}>Email:  {user.currentUser.email} </Typography>
                            <Typography variant="h6" sx={{ margin: 3, textAlign: "center" }}>Uid:  {user.currentUser.uid} </Typography>
                            <Grid container justifyContent="center">
                                <Button variant="outlined" sx={{ width: 200 }} onClick={handleLogout}>
                                    Logout
                                </Button>
                            </Grid>
                        </Box>
                    </Box>
                </Box>
            </Clipdrawer>
        </Box>
    )
}
