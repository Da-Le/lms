import React from 'react';

import {
    Box,
    Drawer,
    useMediaQuery,
} from '@mui/material';

import { useTheme } from '@mui/material/styles';

import DrawerList from './DrawerList';

const drawerWidth = 100;

const mobileDrawerWidth = 80;

export default function Clipdrawer({ children }) {

    const theme = useTheme();

    const matchMD = useMediaQuery(theme.breakpoints.up('md'));

    return (
        <Box sx={{ display: 'flex' }}>
            <Drawer
                sx={{
                    width: matchMD ? drawerWidth : mobileDrawerWidth,
                    overflow: 'hidden',
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: matchMD ? drawerWidth : mobileDrawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <DrawerList />
            </Drawer>
            <Box
                component="main"
                sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
            >
                {children}
            </Box>
        </Box>
    );
}
