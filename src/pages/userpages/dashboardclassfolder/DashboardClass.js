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

import { onSnapshot, collection, query, where } from 'firebase/firestore';
import { db } from '../../../utils/firebase';

import { useHistory } from 'react-router';
import { useDispatch ,useSelector} from 'react-redux';


import {  toggleClassroomData } from '../../../redux/actions/classAction'

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
    linkBtn: {
      color: '#ffffff'
    }
}

export default function DashboardClass() {
  const history = useHistory();

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state);

  const [loading, setLoading] = useState(true)

  //BreakPoint
  const theme = useTheme();
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

  useEffect(() => {
      const classCollection = collection(db, "createclass")
      if(user){
        const q = query(classCollection, where('students', "array-contains", user.currentUser.uid));
        onSnapshot(q, (snapshot) => {
            setClassroom(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
            setLoading(false);
        }
        )
      }
      
    }, []);

  // useEffect(
  //     () =>
  //         onSnapshot(collection(db, "createclass"), (snapshot) => {
  //             setClassroom(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
  //             setLoading(false);
  //         }
  //         ),
  //     []
  // );

  const classBtn = (classdata) => {
      dispatch(toggleClassroomData(classdata, history));
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
                  {/* <Typography noWrap component="div" sx={style.titleClass}> */}
                  <Typography component="div" sx={{ flexGrow: 1, ...style.titleClass }}>
                    RENEZVOUS CLASSROOM
                  </Typography>
                      <Button
                        variant="text"
                        color="inherit"
                        // sx={{ ...style.linkBtn, ...style.hoverColor }}
                        style={style.linkBtn}
                        onClick={handleOpenJoinClass}
                      >
                        JOIN ClASS
                      </Button>
                      <Button
                        variant="text"
                        color="inherit"
                        style={style.linkBtn}
                        // sx={{ ...style.linkBtn, ...style.hoverColor }}
                        onClick={handleOpenClass}
                      >
                        CREATE CLASS
                      </Button>
              </Toolbar>
          </AppBar>
          <Box component={Grid} container justifyContent="center" sx={{ paddingTop: 5 }}>
            {/* <Grid container sx={style.gridcontainer}>
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
            </Grid> */}
          </Box>
          <Box component={Grid} container justifyContent="flex-start" sx={{ paddingTop: 5 }}>
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
                      <MenuItem
                        onClick={() => history.push(`/announcement/${classdata.classCode}`)}
                      >
                        Announcment
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
