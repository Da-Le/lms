import React, { useState, useEffect } from 'react';

import {
    Typography,
    Box,
    Grid,
    Button,
    Menu,
    MenuItem,
    TextField
} from '@mui/material';

import {createDoc, getDocsByCollection, updateDocsByCollection} from '../../../../../utils/firebaseUtil'
import { Timestamp } from 'firebase/firestore';

import { useParams } from 'react-router';
import { useSelector} from 'react-redux';

import Classdrawer from '../../classdrawer/ClassDrawer';
import AssignmentIcon from '@mui/icons-material/Assignment';


import Fade from '@mui/material/Fade';
import Divider from '@mui/material/Divider';
import DateRangeIcon from '@mui/icons-material/DateRange';
import AddToDriveIcon from '@mui/icons-material/AddToDrive';
import bgImage from '../../../../../assets/img/jpg/animatedcomputer.jpg';

import Editor from './Editor'





const style = {
    gridcontainer: {
        display: "flex",
        marginTop: 5,
        padding: 2,
        maxWidth: 900,
        borderBottom: 0.5,
        borderColor: (theme) => theme.palette.primary.main
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
        borderRadius: 20,
        fontSize: 20,
        width: 150,
        marginTop: -2,
        marginBottom: 4,
        textTransform: 'none',
        color: (theme) => theme.colors.textColor,
        backgroundColor: (theme) => theme.palette.primary.main,
        '&:hover': {
            backgroundColor: "#346ef7",
            boxShadow: '0 3px 5px 2px rgba(163, 163, 163, .3)',
        },
    },
    textStyle: {
        paddingLeft: 2,
        fontSize: 20,
        fontWeight: 400
    },
    linkStyle: {
        paddingLeft: 2
    },
    imgStyle: {
        height: 300,
        width: 300
    },
    imgContainer: {
        width: 200
    },
    txtContainer: {
        width: 500
    },
    topPane: {
      backgroundColor: 'hsl(225, 6%, 25%)',
      display: 'flex',
      flexGrow : 1,
    },
    pane :{
      height: '50vh',
      display: 'flex',
      width:'100%'
    }
}

export default function Laboratory() {

  const [html, setHtml] = useState('html', '')
  const [css, setCss] = useState('css', '')
  const [js, setJs] = useState('js', '')
  const [srcDoc, setSrcDoc] = useState('')
  const [labTitle, setLabTitle] = useState('')
  const [isNew, setIsNew] = useState(false)

  const { user } = useSelector((state) => state);
  const params = useParams()


  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <body>${html}</body>
          <style>${css}</style>
          <script>${js}</script>
        </html>
      `)
    }, 250)

    return () => clearTimeout(timeout)
  }, [html, css, js])

  useEffect(() => {
     
    if(Object.keys(user.currentUser).length !== 0){
      getAnnounement()
      }
    
    
  }, [user]);

  const getAnnounement = () => {
    getDocsByCollection('laboratory').then(item => {
      const data = item.filter(item => item.ownerId === user.currentUser.uid && item.classCode === params.id)
      console.log(data)
      if(data.length !== 0){
        data.map(item => {
          setHtml(item.html)
          setCss(item.css)
          setJs(item.js)
          setSrcDoc(item.body)
          setLabTitle(item.title)
        })
      }else {
        setIsNew(true)
      }
      
    })
  }

  const saveLab = () => {
    const data = {
      html: html,
      css : css,
      js: js,
      ownerId: user.currentUser.uid,
      classCode: params.id,
      created: Timestamp.now(),
      title: labTitle
    }
    if(isNew){
      createDoc('laboratory', data).then(() => {
        console.log('success')
      })
    }else {
      updateDocsByCollection('laboratory', data).then(() => {
        console.log('success update')
      })
    }
    
  }

  const handleTitle = (e) => {
    setLabTitle(e.target.value)
  }

  console.log(isNew)
  return (
    <Classdrawer>
      <Box component={Grid} container justifyContent="center" sx={{ paddingTop: 10 }}>
        <>
          <Grid xs={12} justifyContent='flex-start' container>
            <TextField 
              label={labTitle === '' ? 'Title' : labTitle} 
              variant="outlined" 
              sx={{marginRight: 2}}
              value={labTitle}
              onChange={handleTitle}
            />
            <Button 
              variant="contained" 
              color="primary" 
              sx={{ marginTop: 2, marginBottom: 2 }}
              onClick={() => saveLab()}
            >
              {isNew ? 'Save' : 'Update'}
            </Button>
          </Grid>
          <Box sx={style.pane, style.topPane}>
            <Editor
              language="xml"
              displayName="HTML"
              value={html}
              onChange={setHtml}
            />
            <Editor
              language="css"
              displayName="CSS"
              value={css}
              onChange={setCss}
            />
            <Editor
              language="javascript"
              displayName="JS"
              value={js}
              onChange={setJs}
            />
          </Box>
          <Box sx={style.pane}>
            <iframe
              srcDoc={srcDoc}
              title="output"
              sandbox="allow-scripts"
              frameBorder="0"
              width="100%"
              height="100%"
            />
          </Box>
        </> 
      </Box>
    </Classdrawer>
  )
}