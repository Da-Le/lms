import React, { useState , useEffect} from 'react';
import { onSnapshot, collection, query, where } from 'firebase/firestore';
import { db } from '../../../../../utils/firebase';
import {getUser, acceptStudent, removeStudent, getQuizStudent} from '../../../../../utils/firebaseUtil'

import { useHistory } from 'react-router';
import { useSelector} from 'react-redux';


import {
    Typography,
    Box,
    Grid,
    Button,
    Menu,
    MenuItem,
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableBody,
    Collapse
} from '@mui/material';

import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';


import { useParams} from 'react-router-dom';

import Teacherdrawer from '../../classdrawer/ClassDrawerTeacher';
import AssignmentIcon from '@mui/icons-material/Assignment';


import Fade from '@mui/material/Fade';
import Divider from '@mui/material/Divider';
import DateRangeIcon from '@mui/icons-material/DateRange';
import AddToDriveIcon from '@mui/icons-material/AddToDrive';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import bgImage from '../../../../../assets/img/jpg/animatedcomputer.jpg';

// import CreateClass from './CreateClass';
// import JoinClass from './JoinClass';

const style = {
    gridcontainer: {
        display: "flex",
        marginTop: 5,
        padding: 2,
        maxWidth: 1100,
        borderBottom: 0.5,
        borderColor: (theme) => theme.palette.primary.main
    },
    gridcontainerClass: {
      display: "flex",
      // boxShadow: '0 3px 5px 2px rgb(126 126 126 / 30%)',
      marginTop: 5,
      padding: 2,
      maxWidth: 1100
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
        marginRight: 2,
        marginBottom: 4,
        textTransform: 'none',
        color: (theme) => theme.colors.textColor,
        backgroundColor: (theme) => theme.palette.primary.main,
        '&:hover': {
            backgroundColor: "#3e857f",
            boxShadow: '0 3px 5px 2px rgba(163, 163, 163, .3)',
        },
    },
    textStyle: {
        paddingLeft: 2,
        fontSize: 20,
        fontWeight: 400
    },
    linkStyle: {
        paddingLeft: 0
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
    }
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    width: '100%'
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function StudentList() {

  const history = useHistory();
  const { user } = useSelector((state) => state);
  const params = useParams()

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isTeacher, setIsTeacher] = useState(false)
  const [classCode, setClassCode] = useState('')


  const [classroom, setClassroom] = useState([]);
  const [students, setStudents] = useState([])
  const [title, setTitle] = useState('')
  const [quizList, setQuizList] = useState([])


  //Load classrooms
  useEffect(() => {
     
    if(Object.keys(user.currentUser).length !== 0){
        getClassData()
        getUser().then(data => {
            data.map(item => {
                setIsTeacher(item.isTeacher)
            })
        })
        getStudentQuizData()
      }
    
    
  }, [user]);

  const getStudentQuizData = () => {
    const studentQuizCollection = collection(db, "studentRecord")
    onSnapshot(studentQuizCollection, (snapshot) => {
      setQuizList(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
    })
    // return (
    //   row.history.map((historyRow) => (
    //     <TableRow key={historyRow.date}>
    //       <TableCell component="th" scope="row">
    //         {historyRow.date}
    //       </TableCell>
    //       <TableCell>{historyRow.customerId}</TableCell>
    //       <TableCell align="right">{historyRow.amount}</TableCell>
    //       <TableCell align="right">
    //         {Math.round(historyRow.amount * row.price * 100) / 100}
    //       </TableCell>
    //     </TableRow>
    //   ))
    // )
  }

  const getClassData =  () => {
    const classCollection = collection(db, "createclass")
    const qTeacher = query(classCollection, where('ownerId', "==", user.currentUser.uid), where('classCode', "==", params.id));
    const unsubscribe = onSnapshot(qTeacher, (snapshot) => {
        setClassroom(
          snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
        );
        snapshot.docs.map(doc => {
          setClassCode(doc.data().classCode)
          setTitle(doc.data().className)
          setStudents(doc.data().students.filter(item => item.isJoin === true))
        })
        
        // setLoading(false);
    }
    )
    return unsubscribe;
  }

  const handleAccept= (classCode, userId, classData, studentData) => {
    acceptStudent('createclass', classCode , classData, studentData)
  }

  const handleRemove = (classCode, userId, studentData) => {
    removeStudent('createclass', classCode, userId , studentData)
  }
  console.log(students)
  console.log(quizList)

  const classroomBody = () => {
    return (
      <Box component={Grid} container justifyContent="center" >
      {classroom && classroom.map(item => 
        <Grid container sx={style.gridcontainerClass} >
          <Grid xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }} container>
            <Typography variant="h5" sx={style.linkStyle} onClick={() => null}>Classroom name : {item.className}</Typography>
          </Grid>
          <Grid container xs={12} direction='column'>
            <Typography variant="p" sx={{ marginTop: 1 }}>section: {item.section}</Typography>
            <Typography variant="p" sx={{ marginTop: 1 }}>subject: {item.subject}</Typography>
            <Typography variant="p" sx={{ marginTop: 1 }}>room: {item.room}</Typography>
          </Grid>
          {/* <Grid item xs={12}>
            <Typography variant="h6" sx={{ marginTop: 1 }}>{item.ownerEmail}</Typography>
          </Grid> */}
          <Grid item xs={12}>
          <Typography variant="h6" sx={{ marginTop: 1 }}>Student List ({students && students.length !== 0 ? students.length : 0})</Typography>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Name</StyledTableCell>
                  {/* <StyledTableCell align="left">Email</StyledTableCell> */}
                  {/* <StyledTableCell align="center">Action</StyledTableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {students && students.map((row) => (
                  <>
                  <StyledTableRow key={row.name}>
                    <StyledTableCell component="th" scope="row">
                      {row.displayName}
                    </StyledTableCell>
                    {/* <StyledTableCell align="left">{row.email}</StyledTableCell> */}
                    <StyledTableCell align="center">
                      {/* {!row.isJoin ?
                        <Button 
                            variant="contained" 
                            color="primary" 
                            sx={{ marginTop: 2, marginRight: 2 }}
                            onClick={() => handleAccept(item.classCode, user.currentUser.uid, item, row)}
                        >
                            Accept
                        </Button>
                        :
                        <Button 
                          variant="contained" 
                          color="error" 
                          sx={{ marginTop: 2, marginRight: 2 }}
                          onClick={() => handleRemove(item.classCode, user.currentUser.uid, row)}
                        >
                            Remove
                        </Button>
                      } */}
                      
                    </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow key={row.name}>
                    <Collapse in={true} timeout="auto" unmountOnExit>
                      <Box sx={{ margin: 1 }}>
                        <Typography variant="h6" gutterBottom component="div">
                          Quiz
                        </Typography>
                        <Table size="small" aria-label="purchases">
                          <TableHead>
                            <TableRow>
                              <TableCell>Quiz Title</TableCell>
                              <TableCell>Due Date</TableCell>
                              <TableCell align="right">Score</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {quizList && quizList.map(item => (
                              item.quiz && item.quiz.filter(item => item.studentId === row.ownerId).map(data => (
                                <TableRow>
                                  <TableCell component="th" scope="row">
                                    {data.title}
                                  </TableCell>
                                  <TableCell>
                                    {new Date(data.dueDate.seconds * 1000).toLocaleDateString()}
                                  </TableCell>
                                  <TableCell align="right">
                                    {data.result.correctPoints} / {data.result.totalPoints}
                                  </TableCell>
                                </TableRow>
                              ))
                            ))}
                          </TableBody>
                        </Table>
                      </Box>
                    </Collapse>
                  </StyledTableRow>
                  </>
                    
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          </Grid>
        </Grid>
      )}
      </Box>
    )
  }

    return (
        <Teacherdrawer classCode={params.id} headTitle={title}>
            {classroom ?
              <Box component={Grid} container justifyContent="" alignItems="" sx={{ paddingTop: 5, flexDirection: "column" }}>
                  {classroomBody()}
              </Box>
              :
              <Box component={Grid} container justifyContent="center" alignItems="center" sx={{ paddingTop: 5, flexDirection: "column" }}>
                <Box component={Grid} container justifyContent="center" sx={style.imgContainer}>
                    <Box component="img" src={bgImage} alt="Animated Computer" sx={style.imgStyle} />
                </Box>
                <Box component={Grid} container justifyContent="center" sx={style.txtContainer}>
                    <Typography sx={style.linkStyle}>
                        This is where you'll see classrooms.
                    </Typography>
                    <Typography sx={style.linkStyle}>
                        You can join class, see activities and check available quiz
                    </Typography>
                </Box>
              </Box>
            }
        </Teacherdrawer >
    )
}
