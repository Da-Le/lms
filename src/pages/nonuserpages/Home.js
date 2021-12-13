import React from 'react'
import {
    Box
} from '@mui/material';

import NavBar from '../../components/navbarcomponent/NavBar'
import HomeComponent from '../../components/linkcomponent/HomeComponent';
import GuideComponent from '../../components/linkcomponent/GuideComponent';
import AboutComponent from '../../components/linkcomponent/AboutComponent';
import ContactComponent from '../../components/linkcomponent/ContactComponent';
import Footer from '../../components/linkcomponent/Footer';

export default function Home() {
    return (
        <Box>
            <NavBar />
            <HomeComponent />
            <GuideComponent />
            <AboutComponent />
            <ContactComponent />
            <Footer />
        </Box>
    )
}
