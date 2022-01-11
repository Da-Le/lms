import React from 'react'
import NewClipDrawer from '../newdashboardcomponent/NewClipDrawer'
import { Box, Typography } from '@mui/material'
const style = {

}
export default function StudentDashboard() {
    return (
        <Box>
            <NewClipDrawer>
                <Typography sx={{ paddingLeft: 50, paddingTop: 50 }}>This is the new studentdashboard</Typography>
            </NewClipDrawer>

        </Box>
    )
}
