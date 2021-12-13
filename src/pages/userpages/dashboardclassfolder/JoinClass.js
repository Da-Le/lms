import * as React from 'react';
import {
    Box,
    Button,
    Grid,
    TextField,
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

const style = {
    formContainer: {
        flexDirection: "column",
    },
    textfieldStyle: {
        border: 'none',
        marginTop: 2,
        width: 300
    },
}

export default function JoinClass({ isJoinClassOpen, toggleJoinClass }) {

    return (
        <div>
            <Dialog
                open={isJoinClassOpen}
                onClose={toggleJoinClass}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {"Join Class"}
                </DialogTitle>
                <DialogContent>
                    <Box component={Grid} container justifyContent="center" sx={style.formContainer}>
                        <TextField variant="outlined" placeholder="Class Code" sx={style.textfieldStyle} />
                        <TextField variant="outlined" placeholder="Owner's Email" sx={style.textfieldStyle} />

                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={toggleJoinClass}>
                        Back
                    </Button>
                    <Button onClick={toggleJoinClass} autoFocus>
                        Join Class
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
