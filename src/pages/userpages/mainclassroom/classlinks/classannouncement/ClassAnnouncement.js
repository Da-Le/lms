import React, { useState } from 'react';

import {
    Typography,
    Box,
    Grid,
    Avatar,
    TextField,
    Button,
    IconButton
} from '@mui/material';

import Classdrawer from '../../classdrawer/ClassDrawer';

import AddToDriveIcon from '@mui/icons-material/AddToDrive';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import YouTubeIcon from '@mui/icons-material/YouTube';

const style = {
    gridcontainer: {
        display: "flex",
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
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

export default function ClassAnnouncement() {

    const [showInput, setShowInput] = useState(false);

    const [inputValue, setInputValue] = useState('');

    return (
        <Classdrawer>
            <Box component={Grid} container justifyContent="center" sx={{ paddingTop: 5 }}>
                <Grid container sx={style.gridcontainer}>
                    {showInput ? (
                        <Grid container>
                            <TextField
                                variant="filled"
                                multiline
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                fullWidth
                                minRows={5}
                            />
                            <Box sx={{ marginTop: 2 }} container component={Grid} justifyContent="space-between">
                                <Grid item>
                                    <IconButton sx={style.iconStyle}>
                                        <AddToDriveIcon />
                                    </IconButton>
                                    <IconButton sx={style.iconStyle}>
                                        <FileUploadIcon />
                                    </IconButton>
                                    <IconButton sx={style.iconStyle}>
                                        <InsertLinkIcon />
                                    </IconButton>
                                    <IconButton sx={style.iconStyle}>
                                        <YouTubeIcon />
                                    </IconButton>
                                </Grid>
                                <Grid item sx={{ marginTop: 0.5 }}>
                                    <Button style={style.btnStyle} onClick={ () => setShowInput(false)}> cancel</Button>
                                    <Button variant="contained" disabled={inputValue ? false : true} style={style.btnStyle}> Post</Button>
                                </Grid>
                            </Box>
                        </Grid>
                    ) : (
                        <Grid container sx={style.main}
                            onClick={() => setShowInput(true)}
                        >
                            <Avatar />
                            <Typography style={{ paddingLeft: 20 }}>Announce Something To Class</Typography>
                        </Grid>
                    )}
                </Grid>
            </Box>
        </Classdrawer >
    )
}
