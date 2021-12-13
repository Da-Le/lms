import React, { useState, useEffect } from 'react';

import {
    Box,
    AppBar,
    Toolbar,
    Typography,
    Grid,
    LinearProgress
} from '@mui/material';

import Clipdrawer from '../dashboardcomponent/ClipDrawer';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { db } from '../../../utils/firebase'
import { onSnapshot, collection } from 'firebase/firestore';

const drawerWidth = 80;

const style = {
    dashboariconStyle: {
        color: 'black',
        fontSize: '1.9rem',
        marginRight: "15px",
    },
    gridcontainer: {

    },
    titleClass: {
        fontSize: {
            xs: 18,
            sm: 25,
            md: 25
        },
        fontWeight: 480,
        marginLeft: 2
    },
    datagridContainer: {
        height: 250, width: '100%',
        marginTop: 2,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        padding: 3,
        flexDirection: "column"
    }
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
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

export default function DashboardFiles() {


    const [users, setUsers] = useState([]);

    const [loading, setLoading] = useState(true)

    useEffect(
        () =>
            onSnapshot(collection(db, "users"), (snapshot) => {
                setUsers(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
                setLoading(false)
            }
            ),
        []
    );

    console.log(users);

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
                                Recent Files
                            </Typography>
                        </Toolbar>
                        {loading ?
                            (
                                <LinearProgress  />
                            ) :
                            (
                                ""
                            )}
                    </AppBar>
                    <Box component={Grid} container justifyContent="flex-start" sx={{ paddingTop: 10 }}>
                        <Box component={Grid} container justifyContent="center" sx={{ marginBottom: 2 }}>
                            <Typography variant="h4"> Files </Typography>
                        </Box>
                        <TableContainer component={Paper} justifyContent="center">
                            {loading ?
                                (
                                    ""
                                ) :
                                (
                                    <Table sx={{ minWidth: 300 }} aria-label="customized table">
                                        <TableHead>
                                            <TableRow>
                                                <StyledTableCell>ID</StyledTableCell>
                                                <StyledTableCell align="right">File Name</StyledTableCell>
                                                <StyledTableCell align="right">Date</StyledTableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {users.map((user) => (
                                                <StyledTableRow key={user.id}>
                                                    <StyledTableCell component="th" scope="row">
                                                        {user.id}
                                                    </StyledTableCell>
                                                    <StyledTableCell align="right">{user.displayName}</StyledTableCell>
                                                    <StyledTableCell align="right">{user.email}</StyledTableCell>
                                                </StyledTableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                )
                            }
                        </TableContainer>
                    </Box>

                </Box>
            </Clipdrawer>
        </Box>
    )
}
