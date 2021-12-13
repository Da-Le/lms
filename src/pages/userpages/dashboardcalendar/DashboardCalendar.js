import React from 'react';

import {
    Box,
    AppBar,
    Toolbar,
    Typography,
    Grid,
} from '@mui/material';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

import Clipdrawer from '../dashboardcomponent/ClipDrawer';

//redux

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
        fontSize: {
            xs: 18,
            sm: 25,
            md: 25
        },
        fontWeight: 480,
        marginLeft: 2
    },

}


export default function DashboardCalendar() {

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
                                Calendar
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <Box component={Grid} container justifyContent="flex-start" sx={{ paddingTop: 10 }}>
                        <FullCalendar
                            plugins={[dayGridPlugin]}
                            initialView="dayGridMonth"
                            weekends={false}
                            events={[
                                { title: 'event 1', date: '2019-04-01' },
                                { title: 'event 2', date: '2019-04-02' }
                            ]}
                        />
                    </Box>
                </Box>
            </Clipdrawer>
        </Box>
    )
}
