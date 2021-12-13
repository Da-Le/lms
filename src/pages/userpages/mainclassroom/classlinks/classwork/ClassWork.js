import React, { useState } from 'react';

import {
    Typography,
    Box,
    Grid,
    Button,
    Menu,
    MenuItem
} from '@mui/material';

import Classdrawer from '../../classdrawer/ClassDrawer';
import AssignmentIcon from '@mui/icons-material/Assignment';


import Fade from '@mui/material/Fade';
import Divider from '@mui/material/Divider';
import DateRangeIcon from '@mui/icons-material/DateRange';
import AddToDriveIcon from '@mui/icons-material/AddToDrive';
import bgImage from '../../../../../assets/img/jpg/animatedcomputer.jpg';

import CreateActivityDialog from './CreateActivityDialog';
import CreateQuizDialog from './CreateQuizDialog';
import CreateExamDialog from './CreateExamDialog';
import CreateLabDialog from './CreateLabDialog';

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
    }
}

export default function ClassWork() {

    const [anchorEl, setAnchorEl] = React.useState(null);

    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    //Create Activity Dialog
    const [createActivityOpen, setCreateActivityOpen] = useState(false);

    const handleCreateActivityOpen = () => {
        handleClose();
        setCreateActivityOpen(!createActivityOpen);
    }

    //Create Lab Dialog
    const [createLabOpen, setCreateLabOpen] = useState(false);

    const handleCreateLabOpen = () => {
        handleClose();
        setCreateLabOpen(!createLabOpen);
    }

    //Create Quiz Dialog
    const [createQuizOpen, setCreateQuizOpen] = useState(false);

    const handleCreateQuizOpen = () => {
        handleClose();
        setCreateQuizOpen(!createQuizOpen);
    }

    //Create Exam Dialog
    const [createExamOpen, setCreateExamOpen] = useState(false);

    const handleCreateExamOpen = () => {
        handleClose();
        setCreateExamOpen(!createExamOpen);
    }

    return (
        <Classdrawer>
            <Box component={Grid} container justifyContent="center" sx={{ paddingTop: 5 }}>
                <Grid container sx={style.gridcontainer} justifyContent="space-between">
                    <Grid item>
                        <Button variant="outlined"
                            sx={style.btnStyle}
                            id="fade-button"
                            aria-controls="fade-menu"
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                        > + Create</Button>
                        <Menu
                            id="fade-menu"
                            MenuListProps={{
                                'aria-labelledby': 'fade-button',
                            }}
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            TransitionComponent={Fade}
                            sx={{ marginTop: 1 }}
                        >
                            <MenuItem onClick={handleCreateActivityOpen} >
                                <AssignmentIcon />
                                <Typography sx={style.textStyle}>
                                    Activity
                                </Typography>
                            </MenuItem>
                            <MenuItem onClick={handleCreateLabOpen} >
                                <AssignmentIcon />
                                <Typography sx={style.textStyle}>
                                    Laboratory
                                </Typography>
                            </MenuItem>
                            <MenuItem onClick={handleCreateQuizOpen}>
                                <AssignmentIcon />
                                <Typography sx={style.textStyle}>
                                    Quiz
                                </Typography>
                            </MenuItem>
                            <Divider />
                            <MenuItem onClick={handleCreateExamOpen}>
                                <AssignmentIcon />
                                <Typography sx={style.textStyle}>
                                    Exam
                                </Typography>
                            </MenuItem>
                        </Menu>
                    </Grid>
                    <Grid item>
                        <Grid Container sx={{ marginTop: -1.5 }}>
                            <Button>
                                <DateRangeIcon />
                                <Typography sx={style.linkStyle}>
                                    Laboratory
                                </Typography>
                            </Button>
                            <Button>
                                <AddToDriveIcon />
                                <Typography sx={style.linkStyle}>
                                    Class Drive Folder
                                </Typography>
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
            <Box component={Grid} container justifyContent="center" alignItems="center" sx={{ paddingTop: 5, flexDirection: "column" }}>
                <Box component={Grid} container justifyContent="center" sx={style.imgContainer}>
                    <Box component="img" src={bgImage} alt="Animated Computer" sx={style.imgStyle} />
                </Box>
                <Box component={Grid} container justifyContent="center" sx={style.txtContainer}>
                    <Typography sx={style.linkStyle}>
                        This is where you'll assign work
                    </Typography>
                    <Typography sx={style.linkStyle}>
                        You can add assignments and other work
                    </Typography>
                    <Typography sx={style.linkStyle}>
                        for the class, then organise it into topics
                    </Typography>
                </Box>
            </Box>
            <CreateActivityDialog
                isCreateActivityOpen={createActivityOpen}
                toggleCreateActivity={handleCreateActivityOpen}
            />
            <CreateLabDialog
                isCreateLabOpen={createLabOpen}
                toggleCreateLab={handleCreateLabOpen}
            />
            <CreateQuizDialog
                isCreateQuizOpen={createQuizOpen}
                toggleCreateQuiz={handleCreateQuizOpen}
            />
            <CreateExamDialog
                isCreateExamOpen={createExamOpen}
                toggleCreateExam={handleCreateExamOpen}
            />
        </Classdrawer >
    )
}
