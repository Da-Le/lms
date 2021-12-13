import React, { useEffect, useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Grid from '@mui/material/Grid';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { LinearProgress } from '@mui/material';
import { useSelector } from "react-redux";

//React Router Dom
import { Link } from 'react-router-dom'

//Material Icons
import AnnouncementIcon from '@mui/icons-material/Announcement';
import AssessmentIcon from '@mui/icons-material/Assessment';
import DuoIcon from '@mui/icons-material/Duo';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(9)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export default function MiniDrawer({ children }) {

    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const [loading, setLoading] = useState(true)

    const { classUser } = useSelector((state) => state);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        if (classUser) {
            setLoading(false);
        }
    }, [classUser])

    console.log(classUser);

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: '36px',
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Grid container justifyContent="center">
                        <Typography variant="h6" noWrap component="div">
                            {classUser.classData.className}
                        </Typography>
                    </Grid>
                </Toolbar>
                {loading ?
                    (
                        <LinearProgress />
                    ) :
                    (
                        ""
                    )}
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <Typography variant="h5" sx={{ color: 'black', marginRight: 2 }}>Rendezvous</Typography>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    <ListItem
                        button
                        component={Link}
                        to={`/classannouncement/${classUser.classData.classCode}`}
                    >
                        <ListItemIcon> <AnnouncementIcon color="primary" /></ListItemIcon>
                        <ListItemText>Announcement</ListItemText>
                    </ListItem>
                    <ListItem
                        button
                        component={Link}
                        to={`/classwork/${classUser.classData.classCode}`}
                    >
                        <ListItemIcon> <AssessmentIcon color="primary" /></ListItemIcon>
                        <ListItemText>Classwork</ListItemText>
                    </ListItem>
                    <ListItem
                        button
                        component={Link}
                        to={`/classjoinmeet/${classUser.classData.classCode}`}
                    >
                        <ListItemIcon> <DuoIcon color="primary" /></ListItemIcon>
                        <ListItemText>Join Meeting</ListItemText>
                    </ListItem>
                    <ListItem
                        button
                        component={Link}
                        to={`/classpeople/${classUser.classData.classCode}`}
                    >
                        <ListItemIcon> <PeopleIcon color="primary" /></ListItemIcon>
                        <ListItemText>People</ListItemText>
                    </ListItem>
                    <ListItem
                        button
                        component={Link}
                        to={`/classsetting/${classUser.classData.classCode}`}
                    >
                        <ListItemIcon> <SettingsIcon color="primary" /></ListItemIcon>
                        <ListItemText>Settings</ListItemText>
                    </ListItem>
                    <ListItem
                        button
                        component={Link}
                        to={'/dashboardclass'}
                    >
                        <ListItemIcon> <ExitToAppIcon color="primary" /></ListItemIcon>
                        <ListItemText>Back</ListItemText>
                    </ListItem>
                </List>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                {children}
            </Box>
        </Box>
    );
}
