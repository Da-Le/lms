import * as React from 'react';
import {
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    Box,
    Grid,
} from '@mui/material';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ClassIcon from '@mui/icons-material/Class';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import StorageIcon from '@mui/icons-material/Storage';
import InfoIcon from '@mui/icons-material/Info';
import Logo from '../../../assets/img/jpg/RendezvousNewLogo.jpg'

import { Link } from 'react-router-dom'


const style = {
    root: {
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
    },
    listItemIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        fontSize: 18,
        fontWeight: 500,
        width: 50,
        color: 'black',
        marginLeft: 0.5
    },
    iconLogo: {
        marginTop: '-25px',
        marginLeft: '-16px',
        height: '72px',
        width: '72px'
    },
    imgStyle: {
        height: 90,
        width: 90,
        marginTop: -2,
        marginLeft: -1
    },
}

export default function DrawerList() {

    return (
        <List
            sx={style.root}
            component="nav"
            aria-labelledby="nested-list-subheader"
        >
            <ListItem>
                <Box component={Grid} container justifyContent="center" alignItems="center">
                    <Box
                        component="img"
                        src={Logo}
                        alt="imagecontact"
                        sx={style.imgStyle}
                    />
                </Box>
            </ListItem>

            <ListItemButton 
             component={Link}
             to='/dashboardprofile'
            >
                <ListItemIcon sx={style.listItemIcon} >
                    <AccountCircleIcon />
                    Profile
                </ListItemIcon>
            </ListItemButton>

            <ListItemButton
                component={Link}
                to='/dashboarduser'>
                <ListItemIcon sx={style.listItemIcon} >
                    <DashboardIcon />
                    Dashboard
                </ListItemIcon>
            </ListItemButton>

            <ListItemButton
                component={Link}
                to='/dashboardclass'
            >
                <ListItemIcon sx={style.listItemIcon} >
                    <ClassIcon />
                    Class
                </ListItemIcon>
            </ListItemButton>

            <ListItemButton
                component={Link}
                to='/dashboardcalendar'
            >
                <ListItemIcon sx={style.listItemIcon} >
                    <CalendarTodayIcon />
                    Calendar
                </ListItemIcon>
            </ListItemButton>

            <ListItemButton
                component={Link}
                to='/dashboardfile'
            >
                <ListItemIcon sx={style.listItemIcon} >
                    <StorageIcon />
                    Files
                </ListItemIcon>
            </ListItemButton>

            <ListItemButton
                component={Link}
                to='/dashboardabout'
            >
                <ListItemIcon sx={style.listItemIcon} >
                    <InfoIcon />
                    About
                </ListItemIcon>
            </ListItemButton>

        </List>
    );
}
