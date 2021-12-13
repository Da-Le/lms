import React from 'react';

import {
    Typography,
    Box,
    Grid,
    Button
} from '@mui/material';

import Classdrawer from '../../classdrawer/ClassDrawer';

const style = {
    gridcontainer: {
        display: "flex",
        padding: 2,
        border: "1px solid grey",
        width: 400,
    },
    btnStyle: {
        width: 60,
        height: 40,
        margin: 1
    }
}

export default function ClassSetting() {
    return (
        <Classdrawer>
            <Box component={Grid} container justifyContent="flex-start" sx={{ padding: 10 }}>
                <Grid container justifyContent="center" alignItems="center" >
                    <Grid container justifyContent="flex-start" alignItems="center">
                        <Grid item sx={{ borderRadius: 30 }}>
                            <Button variant="contained" color="secondary">DELETE CLASSROOM</Button>
                        </Grid>
                        <Grid item sx={{ borderRadius: 30, margin: 5 }}>
                            <Button variant="contained" color="secondary">ARCHIVE CLASSROOM</Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container sx={style.gridcontainer} justifyContent="flex-start">
                    <Grid sx={{ borderRadius: 30 }}>
                        <Typography>Class Code: </Typography>
                        <Typography>ClassCode Here</Typography>
                    </Grid>
                </Grid>
            </Box>
        </Classdrawer>
    )
}
