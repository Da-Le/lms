import React, { useEffect } from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import theme from '../utils/theme';

import { createTheme, ThemeProvider } from '@mui/material';

import { useDispatch, useSelector } from "react-redux";

import { auth } from '../utils/firebase';

import { setUser , getUserId} from '../redux/actions/userAction';

// nonuserhomepage
import Login from '../pages/nonuserpages/Login';
import Register from '../pages/nonuserpages/Register';
import Home from '../pages/nonuserpages/Home';
import Forgot from '../pages/nonuserpages/Forgot';

//userhomepage
import DashboardUser from '../pages/userpages/dashboarduser/DashboarduUser';
import DashboardProfile from '../pages/userpages/dashboardprofile/DashboardProfile';
import DashboardClass from '../pages/userpages/dashboardclassfolder/DashboardClass';
import Announcement from '../pages/userpages/announcement'
import DashboardCalendar from '../pages/userpages/dashboardcalendar/DashboardCalendar';
import DashboardFile from '../pages/userpages/dashboardfile/DashboardFile';
import DashboardAbout from '../pages/userpages/dashboardabout/DashboardAbout';

//main classroom
import ClassAnnouncement from '../pages/userpages/mainclassroom/classlinks/classannouncement/ClassAnnouncement';
import ClassAnnouncementList from '../pages/userpages/mainclassroom/classlinks/classannouncement';
import ClassJoinMeet from '../pages/userpages/mainclassroom/classlinks/classjoinmeet/ClassJoinMeet';
import ClassPeople from '../pages/userpages/mainclassroom/classlinks/classpeople/ClassPeople';
import ClassSetting from '../pages/userpages/mainclassroom/classlinks/classsetting/ClassSetting';
import { getClassroomData } from '../redux/actions/classAction';
import ClassWork from '../pages/userpages/mainclassroom/classlinks/classwork/ClassWork';
import ClassList from '../pages/userpages/mainclassroom/classlinks/classList';
import Laboratory from '../pages/userpages/mainclassroom/classlinks/classLaboratory/Lab'
import LabList from '../pages/userpages/mainclassroom/classlinks/classLaboratory'

export default function RouterComponent() {

    const dispatch = useDispatch();

    const { user, classUser } = useSelector((state) => state);

    useEffect(() => {
        auth.onAuthStateChanged((authUser) => {
            dispatch(getUserId())
            if (authUser) {
                dispatch(setUser(authUser));
                dispatch(getClassroomData());
            } else {
                dispatch(setUser(null));
            }
        })
    }, [dispatch])

    // console.log(user);

    console.log(classUser.classData)
    console.log('asdasd',user.currentUser)

    const THEME = createTheme(theme);

    return (
        <ThemeProvider theme={THEME}>
            <Router>
                <Switch>
                    {/* noneuser */}
                    <Route component={Home} path="/" exact />
                    <Route component={Login} path="/login" exact />
                    <Route component={Register} path="/register" exact />
                    <Route component={Forgot} path="/forgot" exact />

                    {/* userhomepage */}
                    <Route component={DashboardUser} path="/dashboarduser" exact />
                    <Route component={DashboardProfile} path="/dashboardprofile" exact />
                    <Route component={DashboardClass} path="/dashboardclass" exact />
                    <Route component={Announcement} path="/announcement/:id" exact />
                    <Route component={DashboardCalendar} path="/dashboardcalendar" exact />
                    <Route component={DashboardFile} path="/dashboardfile" exact />
                    <Route component={DashboardAbout} path="/dashboardabout" exact />

                    {/* mainclassroom */}
                    <Route component={ClassAnnouncementList} path="/classannouncement/" exact />
                    <Route component={ClassAnnouncement} path="/classannouncement/:id" exact />
                    <Route component={ClassJoinMeet} path="/classjoinmeet/:id" exact />
                    <Route component={ClassPeople} path="/classpeople/:id" exact />
                    <Route component={ClassSetting} path="/classsetting/:id" exact />
                    <Route component={ClassWork} path="/classwork/" exact />
                    <Route component={ClassList} path="/classroom" exact />
                    <Route component={Laboratory} path="/laboratory/:id" exact />
                    <Route component={LabList} path="/laboratory" exact />
                    
                </Switch>
            </Router>
        </ThemeProvider>

    )
}
