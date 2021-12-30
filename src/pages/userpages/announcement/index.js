import React, {useEffect, useState} from 'react';
import { Timestamp } from 'firebase/firestore';
import {
    Box,
    Button,
    AppBar,
    Toolbar,
    Typography,
    Grid,
    TextField
} from '@mui/material';
import { useHistory , useParams} from 'react-router-dom';


import Clipdrawer from '../dashboardcomponent/ClipDrawer';

import {getDocsByCollection, getUser, createDoc} from '../../../utils/firebaseUtil';

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
    announcement: {
      width: '100%',
      background: '#F5F8FF',
      padding: 20,
      marginTop: 20,
    },
    announementBtn: {
      display:'flex',
      justifyContent:'end'
    }
}

export default function Announcment() {
  const [classData, setClassData] = useState();
  const [userId, setUserId] = useState('');
  const [className, setClassName] = useState('')
  const [ownerName, setOwnerName] = useState('')
  const [announcementContent, setAnnoucncementContent] = useState('')

  const history = useHistory();
  const params = useParams()


  useEffect(() => {
      getUser().then(user => {
          if(user){
              setUserId(user.uid)
              setOwnerName(user.displayName)
              getClassData()
              getDataAnnouncement()
          } return
      })
    }, []);

    const getClassData = () => {
      getDocsByCollection('createclass')
      .then(item => {
          const data = item.filter(item => item.classCode === params.id)
          data.map(item => {
            setClassName(item.className)
          })
      })
    }

    const getDataAnnouncement = () => {
      getDocsByCollection('announcement')
      .then(item => {
        const data = item.filter(item => item.classCode === params.id)
        setClassData(data)
      })
    }

    const handleAnnoucement = (e) => {
      setAnnoucncementContent(e.target.value)
    }
    
    const saveAnnoucement = () => {
      const data = {
        body: announcementContent,
        classCode: params.id,
        created: Timestamp.now(),
        ownerId: userId,
        ownerName: ownerName
      }
      createDoc('announcement',data).then(() => {
        setAnnoucncementContent('')
      })
    }



    const createAnnouncement = () => {
         return <div style={style.announcement}>
            <TextField
              id="filled-multiline-static"
              label="Announce something to your class"
              multiline
              rows={6}
              variant="filled"
              fullWidth={true}
              value={announcementContent}
              onChange={handleAnnoucement}
            />
            <div style={style.announementBtn}>
            <Button 
                variant="contained" 
                color="primary" 
                sx={{ marginTop: 2, marginRight: 2 }}
                onClick={null}
              >
                Cancel
              </Button>
              <Button 
                variant="contained" 
                color="primary" 
                sx={{ marginTop: 2 }}
                onClick={saveAnnoucement}
              >
                Post
              </Button>
            </div>
          </div>          
    }
    const announcementData = () => {
      return classData && classData.map(item => 
         <Grid container sx={style.gridcontainer} justifyContent='space-between'>
             <Grid xs={12} item>
                 <Typography>{new Date(item.created.seconds * 1000).toLocaleDateString()} {new Date(item.created.seconds * 1000).toLocaleTimeString()}</Typography>
             </Grid>
             <Grid xs={12} item>
                 <Typography>{item.ownerName}</Typography>
             </Grid>
             <Grid item xs={12}>
                 <Typography sx={{ marginTop: 2 }}>{item.body}</Typography>
             </Grid>
            
             <Grid xs={12} justifyContent='flex-end' container>
                 <Button 
                     variant="contained" 
                     color="primary" 
                     sx={{ marginTop: 2 }}
                     onClick={() => null}
                 >
                     Delete
                 </Button>
             </Grid>
         </Grid>
     )
 }
    console.log(announcementContent)
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
                                {className}
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <Box component={Grid} container justifyContent="flex-start" sx={{ paddingTop: 5 }}>
                        {createAnnouncement()}
                        {classData && announcementData()}
                    </Box>
                </Box>
            </Clipdrawer>
        </Box>
    )
}
