import React, { useEffect } from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import theme from '../utils/theme';

import { createTheme, ThemeProvider } from '@mui/material';

import { useDispatch, useSelector } from "react-redux";

import { auth } from '../utils/firebase';

import { setUser } from '../redux/actions/userAction';

// nonuserhomepage
import Login from '../pages/nonuserpages/Login';
import Register from '../pages/nonuserpages/Register';
import Home from '../pages/nonuserpages/Home';
import Forgot from '../pages/nonuserpages/Forgot';

//userhomepage
import DashboardUser from '../pages/userpages/dashboarduser/DashboarduUser';
import DashboardProfile from '../pages/userpages/dashboardprofile/DashboardProfile';
import DashboardClass from '../pages/userpages/dashboardclassfolder/DashboardClass';
import DashboardCalendar from '../pages/userpages/dashboardcalendar/DashboardCalendar';
import DashboardFile from '../pages/userpages/dashboardfile/DashboardFile';
import DashboardAbout from '../pages/userpages/dashboardabout/DashboardAbout';

//main classroom
import ClassAnnouncement from '../pages/userpages/mainclassroom/classlinks/classannouncement/ClassAnnouncement';
import ClassJoinMeet from '../pages/userpages/mainclassroom/classlinks/classjoinmeet/ClassJoinMeet';
import ClassPeople from '../pages/userpages/mainclassroom/classlinks/classpeople/ClassPeople';
import ClassSetting from '../pages/userpages/mainclassroom/classlinks/classsetting/ClassSetting';
import { getClassroomData } from '../redux/actions/classAction';
import ClassWork from '../pages/userpages/mainclassroom/classlinks/classwork/ClassWork';

export default function RouterComponent() {

    const dispatch = useDispatch();

    const { user, classUser } = useSelector((state) => state);

    useEffect(() => {
        auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                dispatch(setUser(authUser));
                dispatch(getClassroomData());
            } else {
                dispatch(setUser(null));
            }
        })
    }, [dispatch])

    console.log(user);

    console.log(classUser.classData)

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
                    <Route component={DashboardCalendar} path="/dashboardcalendar" exact />
                    <Route component={DashboardFile} path="/dashboardfile" exact />
                    <Route component={DashboardAbout} path="/dashboardabout" exact />

                    {/* mainclassroom */}
                    <Route component={ClassAnnouncement} path="/classannouncement/:id" exact />
                    <Route component={ClassJoinMeet} path="/classjoinmeet/:id" exact />
                    <Route component={ClassPeople} path="/classpeople/:id" exact />
                    <Route component={ClassSetting} path="/classsetting/:id" exact />
                    <Route component={ClassWork} path="/classwork/:id" exact />
                </Switch>
            </Router>
        </ThemeProvider>

    )
}
