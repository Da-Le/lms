import React, { useState, useEffect } from 'react';
import { onSnapshot, collection, query, where } from 'firebase/firestore';
import { db } from '../../../../../utils/firebase';
import { getUser, acceptStudent, removeStudent, getDocsByCollection } from '../../../../../utils/firebaseUtil'
import Input from '../../../../../components/Input';

import { useSelector } from 'react-redux';

import {
    Typography,
    Box,
    Grid,
    TextField,
    Button
} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Classdrawer from '../../classdrawer/ClassDrawer';
import Image from '../../../../../assets/img/png/bginside.png'
import OutlinedInput from '@mui/material/OutlinedInput';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';

import { useParams } from 'react-router-dom';
import StudentDrawer from '../../classdrawer/ClassDrawerStudent';
const style = {
    gridcontainer: {
        maxWidth: 1200,
    },
    btnStyle: {
        marginTop: 2,
        fontSize: 16,
        width: 100,
        height: 35,
        color: "black",
        backgroundColor: "#A5CF92",
        '&:hover': {
            backgroundColor: "#3e857f",
            boxShadow: '0 3px 5px 2px rgba(163, 163, 163, .3)',
        },
    },
    imgStyle: {
        height: {
            xs: 300,
            sm: 400,
            md: 500
        },
        width: {
            xs: 300,
            sm: 400,
            md: 600
        },

    },
    gmeetContainer: {
        boxShadow: '0 3px 5px 2px rgb(126 126 126 / 30%)',
        marginTop: 5,
        padding: 2,
        maxWidth: 350
    },
    imageContainer: {
        marginTop: {
            xs: 10,
            sm: 0,
            md: 5
        },
    },
    settingsContainer: {
        display: "flex",
        padding: 2,
        border: "1px solid grey",
        marginTop: 5,
        maxWidth: 400,
        borderRadius: 2
    }
}

export default function ClassSetting() {

    const params = useParams()

    const { user } = useSelector((state) => state);

    const [classCode, setClassCode] = useState('')

    const [classroom, setClassroom] = useState([]);

    const [isTeacher, setIsTeacher] = useState(false)

    //Load classrooms
    useEffect(() => {

        if (Object.keys(user.currentUser).length !== 0) {
            getClassData()
            getUser().then(data => {
                data.map(item => {
                    setIsTeacher(item.isTeacher)
                })
            })
        }


    }, [user]);

    const getClassData = () => {
        const classCollection = collection(db, "createclass")
        const qTeacher = query(classCollection, where('ownerId', "==", user.currentUser.uid), where('classCode', "==", params.id));
        const unsubscribe = onSnapshot(qTeacher, (snapshot) => {
            setClassroom(
                snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
            );
            snapshot.docs.map(doc => {
                setClassCode(doc.data().classCode)
            })
            // setLoading(false);
        }
        )
        return unsubscribe;
    }

    return (
        <StudentDrawer classCode={params.id}>
            <Box component={Grid} container justifyContent="center" sx={{ paddingTop: 10 }}>
                <Grid container justifyContent="center" sx={style.gridcontainer}>
                    <Grid item sm>
                        <Grid container sx={style.settingsContainer} justifyContent="flex-start">
                            <Grid container justifyContent="center">
                                <Typography>Class Code</Typography>
                            </Grid>
                            <Grid container justifyContent="center" sx={{ marginTop: 1, paddingLeft: 5, paddingRight: 5 }}>
                                <Input value="Addcb4" />
                            </Grid>
                        </Grid>
                        <Grid container justifyContent="flex-start" sx={{
                            marginTop: 4
                        }}>
                            <Button variant="contained" color="error"
                                sx={{
                                    width: {
                                        xs: 120,
                                        md: 160
                                    },
                                    fontSize: 12,
                                    marginLeft: 5
                                }}
                            >DELETE CLASSROOM</Button>
                            <Button variant="contained" color="warning"
                                sx={{
                                    marginLeft: 1,
                                    width: {
                                        xs: 120,
                                        md: 160
                                    },
                                    fontSize: 12
                                }}
                            >ARCHIVE CLASSROOM</Button>
                        </Grid>

                    </Grid>
                    <Grid item sm>
                        <Grid container sx={style.imageContainer}>
                            <Box
                                component="img"
                                src={Image}
                                alt="Class Setting Images"
                                sx={style.imgStyle}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </StudentDrawer >
    )
}