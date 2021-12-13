import React, { useState } from 'react';

import {
    IconButton,
    List,
    Drawer,
    ListItem,
    ListItemText,
    ListItemIcon,
    Box
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';

const style = {
    menuIconContainer: {
        marginLeft: 'auto',
    },
    icons: {
        fontSize: '1.5rem',
        marginTop: "5px",
        marginLeft: "15px",
        marginRight: "20px"
    },
    iconStyle: {
        color: "white",
        fontSize: 35
    }
};

export default function DrawerComponent() {

    const [openDrawer, setOpenDrawer] = useState(false);

    return (
        <Box>
            <Drawer
                anchor='right'
                onClose={() => setOpenDrawer(false)}
                open={openDrawer}
            >
                <List>
                    <ListItem
                        button
                    >
                        <ListItemIcon>
                            <MenuOpenIcon sx={style.icons} />
                            <ListItemText>Home</ListItemText>
                        </ListItemIcon>
                    </ListItem>
                </List>
            </Drawer>
            <IconButton
                sx={style.menuIconContainer}
                onClick={() => setOpenDrawer(!openDrawer)}
            >
                {!openDrawer ? <MenuIcon sx={style.iconStyle}/> : <MenuOpenIcon sx={style.iconStyle}/>}
            </IconButton>
        </Box>
    )
}
