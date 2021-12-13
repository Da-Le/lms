import React, { useState, useEffect } from 'react'

import {
    Box,
    AppBar,
    Toolbar,
    Typography,
    Grid,
    useMediaQuery,
    useTheme,
    Menu,
    MenuItem,
    Button,
    LinearProgress
} from '@mui/material';

import Clipdrawer from '../dashboardcomponent/ClipDrawer';

import ControlPointIcon from '@mui/icons-material/ControlPoint';
import CreateClass from './CreateClass';
import JoinClass from './JoinClass';

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import { onSnapshot, collection } from 'firebase/firestore';
import { db } from '../../../utils/firebase';

import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';

import {  toggleClassroomData } from '../../../redux/actions/classAction'

const drawerWidth = 80;

const style = {
    //helper
    hoverColor: {
        cursor: 'pointer',
        '&:hover': {
            color: (theme) => theme.colors.navButtonHover,
        }
    },

    dashboariconStyle: {
        color: 'black',
        fontSize: '1.9rem',
        marginRight: "15px",
    },
    linkBtn: {
        marginRight: 4,
        color: (theme) => theme.colors.textColor,
        fontSize: 22
    },
    linkBtn2: {
        marginRight: 2,
        color: (theme) => theme.colors.textColor,
        fontSize: 22
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
    logoPlusBtn: {
        color: '#FFF',
        fontSize: '2.2rem',
        marginRight: {
            xs: -2
        },
        '&:hover': {
            color: (theme) => theme.colors.navButtonHover,
        },
    },
    gridcontainer: {
        marginTop: 2,
    },
    linkStyle: {
        cursor: 'pointer',
        fontSize: 25,
        fontWeight: 500,
        '&:hover': {
            textDecoration: 'underline'
        },
    }
}

const Classroom = () => {

    const [anchorEl, setAnchorEl] = useState(null)

    const handleClick = (event) => setAnchorEl(event.currentTarget);

    const handleClose = () => setAnchorEl(null);

    //Create Class Dialog
    const [classOpen, setClassOpen] = useState(false);

    const handleOpenClass = () => {
        setClassOpen(!classOpen);
        setAnchorEl(null);
    }

    //Join Class Dialog
    const [joinClassOpen, setOpenJoinClass] = useState(false);

    const handleOpenJoinClass = () => {
        setOpenJoinClass(!joinClassOpen);
        setAnchorEl(null);
    }

    return (
        <Box sx={{ marginLeft: 'auto' }}>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} >
                <ControlPointIcon sx={style.logoPlusBtn} />
            </Button>
            <Menu
                id='simple-menu'
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem sx={style.hoverColor} onClick={handleOpenJoinClass}>
                    JOIN CLASSROOM
                </MenuItem>
                <MenuItem sx={style.hoverColor} onClick={handleOpenClass}>
                    CREATE CLASSROOM
                </MenuItem>
            </Menu>
            <CreateClass
                isClassOpen={classOpen}
                toggleClass={handleOpenClass}
            />
            <JoinClass
                isJoinClassOpen={joinClassOpen}
                toggleJoinClass={handleOpenJoinClass}
            />
        </Box>
    );
}


export default function DashboardClass() {

    const history = useHistory();

    const dispatch = useDispatch();

    const [loading, setLoading] = useState(true)

    //BreakPoint
    const theme = useTheme();

    const isMatch = useMediaQuery(theme.breakpoints.down('md'));

    //menu
    const [anchorEl, setAnchorEl] = useState(null)

    const handleClick = (event) => setAnchorEl(event.currentTarget);

    const handleClose = () => setAnchorEl(null);

    //Create Class Dialog
    const [classOpen, setClassOpen] = useState(false);

    const handleOpenClass = () => {
        setClassOpen(!classOpen);
    }

    //Join Class Dialog
    const [joinClassOpen, setOpenJoinClass] = useState(false);

    const handleOpenJoinClass = () => {
        setOpenJoinClass(!joinClassOpen);
    }

    const [classroom, setClassroom] = useState([]);

    useEffect(
        () =>
            onSnapshot(collection(db, "createclass"), (snapshot) => {
                setClassroom(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
                setLoading(false);
            }
            ),
        []
    );

    const classBtn = (classdata) => {
        dispatch(toggleClassroomData(classdata, history));
    }

    return (
        <Box>
            <Clipdrawer>
                <Box component={Grid} container justify="center" alignItems="center" alignContent="center">
                    <AppBar
                        position="fixed"
                        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`, backgroundColor: '#5182f5' }}
                    >
                        <Toolbar>
                            <Typography noWrap component="div" sx={style.titleClass}>
                                RENEZVOUS CLASSROOM
                            </Typography>
                            <Box component="span" sx={{ flexGrow: 1 }} />
                            {isMatch ? <Classroom /> :
                                <>
                                    <Button
                                        sx={{ ...style.linkBtn, ...style.hoverColor }}
                                        onClick={handleOpenJoinClass}
                                    >
                                        JOIN ClASS
                                    </Button>
                                    <Button
                                        sx={{ ...style.linkBtn, ...style.hoverColor }}
                                        onClick={handleOpenClass}
                                    >
                                        CREATE CLASS
                                    </Button>
                                </>
                            }
                        </Toolbar>
                        {loading ?
                            (
                                <LinearProgress />
                            ) :
                            (
                                ""
                            )}
                    </AppBar>
                    <Box component={Grid} container justifyContent="center" sx={{ paddingTop: 5 }}>
                        <Grid container sx={style.gridcontainer}>
                            {classroom.map((classdata) => (
                                <Box sx={{ minWidth: 300, boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)', padding: 2, margin: 2, }}>

                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }} key={classdata.id}>
                                        <Typography sx={style.linkStyle} onClick={() => classBtn(classdata)}>
                                            {classdata.className}
                                        </Typography>

                                        <MoreHorizIcon sx={{ marginTop: 0.5, cursor: 'pointer' }} onClick={handleClick} />
                                        <Menu
                                            id='simple-menu'
                                            anchorEl={anchorEl}
                                            keepMounted
                                            open={Boolean(anchorEl)}
                                            onClose={handleClose}
                                            sx={{
                                                marginTop: -1
                                            }}
                                        >
                                            <MenuItem>
                                                Unenroll
                                            </MenuItem>
                                        </Menu>
                                    </Box>
                                    <Box sx={{ marginTop: 5 }}>
                                        <Typography variant="h6" sx={{ marginTop: 1 }}>{classdata.section}</Typography>
                                        <Typography variant="h6" sx={{ marginTop: 1 }}>{classdata.subject}</Typography>
                                        <Typography variant="h6" sx={{ marginTop: 1 }}>{classdata.room}</Typography>
                                    </Box>
                                    <Box component={Grid} container justifyContent="center" sx={{ marginTop: 5 }}>
                                        <Typography variant="h6" sx={{ marginTop: 1 }}>{classdata.ownerEmail}</Typography>
                                    </Box>
                                </Box>
                            ))}
                        </Grid>
                    </Box>
                </Box>
            </Clipdrawer>
            <CreateClass
                isClassOpen={classOpen}
                toggleClass={handleOpenClass}
            />
            <JoinClass
                isJoinClassOpen={joinClassOpen}
                toggleJoinClass={handleOpenJoinClass}
            />
        </Box>
    )
}
