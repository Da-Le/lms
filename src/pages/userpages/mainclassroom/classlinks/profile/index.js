import React, { useState, useEffect } from 'react';

import {
    Typography,
    Box,
    Grid,
    Avatar,
    TextField,
    Button,
    IconButton
} from '@mui/material';

import ClassDrawer from '../../classdrawer/ClassDrawer';
import { Timestamp } from 'firebase/firestore';

import {getAnnouncement, getDocsByCollection, getUser, createDoc} from '../../../../../utils/firebaseUtil';
import { useParams} from 'react-router-dom';
import { useSelector } from "react-redux";



import AddToDriveIcon from '@mui/icons-material/AddToDrive';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import YouTubeIcon from '@mui/icons-material/YouTube';

const style = {
    gridcontainer: {
        display: "flex",
        boxShadow: '0 3px 5px 2px rgb(126 126 126 / 30%)',
        marginTop: 5,
        padding: 2,
        maxWidth: 1000
    },
    main: {
        display: "flex",
        cursor: "pointer",
        alignItems: "center",
    },
    iconStyle: {
        color: (theme) => theme.palette.primary.main,
        margin: 0.5
    },
    btnStyle: {
        width: 80,
        marginLeft: 5
    }
}

export default function ClassAnnouncementList() {

  const [userDetail, setUserDetail] = useState([])

  const params = useParams()
  const { user } = useSelector((state) => state);
  

  useEffect(() => {
    
    if(Object.keys(user.currentUser).length !== 0){
      getUser().then(item => {
        setUserDetail(item)
          
      })
      
  }
  }, [user]);


  

  const userDetailBody = () => {
    return userDetail && userDetail.map( item => 
      <Grid container sx={style.gridcontainer} justifyContent='space-between'>
        <Grid xs={12} item>
        <Typography variant="h6" sx={{ margin: 3, textAlign: "center" }}>Name: {item.displayName} </Typography>
        <Typography variant="h6" sx={{ margin: 3, textAlign: "center" }}>Email:  {item.email} </Typography>
        <Typography variant="h6" sx={{ margin: 3, textAlign: "center" }}>User Type:  {item.isTeacher ? 'Teacher' : 'Student'} </Typography>
        <Typography variant="h6" sx={{ margin: 3, textAlign: "center" }}>Uid:  {item.ownerId} </Typography>
        </Grid>
      </Grid>
    )
  }

  return (
    <ClassDrawer headTitle='User Profile'>
      <Box component={Grid} container justifyContent="center" sx={{ paddingTop: 5 }}>
        {userDetail && userDetailBody() }
      </Box>
    </ClassDrawer>
  )
}
