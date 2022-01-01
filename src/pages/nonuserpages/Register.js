import React, { useState } from 'react'

import {
    Box,
    Button,
    Typography,
    Grid,
    TextField,
    InputAdornment,
    FormControl,
    IconButton,
    Stack,
    Switch,
    FormControlLabel
} from '@mui/material';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import { Link, useHistory } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import { registerInitiate } from '../../redux/actions/userAction';
import GoogleIcon from '@mui/icons-material/Google';

import logoRendezvous from '../../assets/img/jpg/RendezvousNewLogo.jpg'
import EmailIcon from '@mui/icons-material/Email';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LockIcon from '@mui/icons-material/Lock';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonIcon from '@mui/icons-material/Person';

import {createUser, createDoc} from '../../utils/firebaseUtil'

import { setDoc, doc } from '@firebase/firestore';

import { db } from '../../utils/firebase';

import Container from '@mui/material/Container';
import Input from '../../components/Input'
// import {validPhone} from '../../utils/validations'

import NavBar from '../../components/navbarcomponent/NavBar'
import Footer from '../../components/linkcomponent/Footer';



const style = {
    marginTopButton: {
        marginTop: 3
    },
    marginStyle: {
        marginTop: 1
    },
    root: {
        padding: "80px 20px",
    },
    menuLink: {
        fontSize: "1.2rem",
        marginLeft: 2,
        "&:hover": {
            color: theme => theme.palette.secondary.main,
        }
    },
    section1: {
        backgroundColor: "#f3f3f3",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "40px 40px",
        borderRadius: 2
    },
    headingStyle1: {
        marginTop: "-10px",
        textAlign: "center",
        fontWeight: 700,
        fontSize: {
            xs: "1rem",
            sm: "1.2rem",
            md: "1.5rem",
        },
        fontFamily: "ComicSans"
    },
    labelStyle: {
        fontSize: 20
    },
    btnColor: {
        backgroundColor: (theme) => theme.colors.buttonColor,
        color: (theme) => theme.colors.textColor,
        "&:hover": {
            backgroundColor: (theme) => theme.colors.buttonColor,
            color: (theme) => theme.colors.navButtonHover,
        }
    }
}




export default function Register() {

    const dispatch = useDispatch();

    const [values, setValues] = useState({
        firstName:'',
        lastName:'',
        email: '',
        phone:'',
        password: '',
        confirmPassword: '',
        showPassword: false,
        isTeacher: false,
    });

    const [error, setError] = useState({
        firstName: '',
        lastName:'',
        email:'',
        phone:'',
        password:''
    })

    const history = useHistory();

    const handleChange = (e) => {
        if(e.target.name === 'isTeacher'){
            setValues({
                ...values,
                [e.target.name]: e.target.checked
            })
        }else {
            setValues({
                ...values,
                [e.target.name]: e.target.value
            })
        }
        
    }

    // const handleChange = (prop) => (event) => {
    //     setValues({ ...values, [prop]: event.target.value });
    // };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const validateForm = () => {
        let isValid = true
        let error = {
            firstName: '',
            lastName:'',
            email:'',
            phone:'',
            password:''
        }
        //validate first name
        if(!values.firstName){
            error.firstName = 'Please enter firstname'
            isValid = false
        }

        //validate last name
        if(!values.lastName){
            error.lastName = 'Please enter lastname'
            isValid = false
        }

        //validate email
        if(!values.email){
            error.email = 'Please enter email'
            isValid = false
        }

        //validate password
        if(!values.password){
            error.password = 'Please enter password'
            isValid = false
        }
        if(values.password !== values.confirmPassword){
            error.password = 'Password is not matched'
            isValid = false
        }

        //validate confirm password
        if(!values.confirmPassword){
            error.confirmPassword = 'Please enter password'
            isValid = false
        }

        setError(error)
        return isValid
    }

    const signup = () => {

        // if (!values.email || !values.password || !values.confirmPassword || !values.displayName) {
        //     setValues({ ...values, errors: "Please Complete all fields" })
        //     console.log("sdad");
        // } else if (values.password !== values.confirmPassword) {
        //     setValues({ ...values, errors: "Password do not match!" })
        //     console.log("sdsdadasdasdad");
        // }
        // else {
        //     console.log("di gumagana");
        //     createUser(values.email, values.password).then(() => {
        //         createDoc('users',values).then(() => {
        //             console.log('success')
        //         })
        //     })
        //     // setValues({ ...values, errors: "", isLoading: true });
        //     // dispatch(registerInitiate(values.email, values.password, values.displayName, history));
        // }
        if(validateForm()){
            const data = {
                displayName: values.firstName + values.lastName, 
                email: values.email, 
                isTeacher: values.isTeacher,
                phone: values.phone
            }
            createUser(values.email, values.password, data).then(() => {
                history.push('/classroom')
            })
        }
            
    }

    const btnSignInWithGoogle = () => {
        const provider = new GoogleAuthProvider()
        const auth = getAuth();
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                // The signed-in user info.
                const user = result.user;
                handleNew(user);
                history.push('/classroom')
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorMessage = error.message;
                alert(errorMessage);
                // The email of the user's account used.
                const email = error.email;
                alert(email);
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
                alert(credential);
            });
    }

    const handleNew = async(user) => {
        const docRef = doc(db, "users", user.uid);
        const payload = { 
            displayName: user.displayName, 
            email: user.email, 
            uid: user.uid, 
            photoURL: user.photoURL, 
            phone: values.phone,
            isTeacher: values.isTeacher
        };
        await setDoc(docRef, payload);
    }

    console.log(error)
    // console.log(validPhone(values.phone))

    return (
        <Container maxWidth disableGutters={true}>
            <NavBar />
            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={{ xs: 1, sm: 2, md: 4 }}
            >
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
                <img
                    src={"assets/img/signup_bg.png"}
                    alt="Rendezvous bg"
                    style={{ height: "100%", width: "100%", objectFit:'contain' }}
                />
                </Grid>

                <Box sx={{display:'flex', alignItems:'center', padding:'0 3rem'}}>
                <Grid container spacing={2}>
                    <Grid item xs={6} spacing={3}>
                        <Input
                            label = 'Firstname' 
                            type='text'
                            onChange={e => handleChange(e)}
                            value = {values.firstName}
                            name='firstName'
                            errorMessage={error.firstName}
                        />
                    </Grid>
                    <Grid item xs={6} spacing={3}>
                        <Input 
                            label = 'Lastname' 
                            type='text'
                            onChange={e => handleChange(e)}
                            value = {values.lastName}
                            name='lastName'
                            errorMessage = {error.lastName}
                        />
                    </Grid>
                    <Grid item xs={12} spacing={3}>
                        <Input 
                            label = 'Email' 
                            type='email'
                            onChange={e => handleChange(e)}
                            value = {values.email}
                            name='email'
                            errorMessage={error.email}
                        />
                    </Grid>
                    <Grid item xs={12} spacing={3}>
                        <Input 
                            label = 'Phone number' 
                            type='tel'
                            patern='^(09|\+639)\d{9}$'
                            onChange={e => handleChange(e)}
                            value = {values.phone}
                            name='phone'
                        />
                    </Grid>
                    <Grid item xs={12} spacing={3}>
                        <Input 
                            label = 'Password' 
                            type='password'
                            onChange={e => handleChange(e)}
                            value = {values.password}
                            name='password'
                            errorMessage={error.password}
                        />
                    </Grid>
                    <Grid item xs={12} spacing={3}>
                        <Input 
                            label = 'Confirm Password' 
                            type='password'
                            onChange={e => handleChange(e)}
                            value = {values.confirmPassword}
                            name='confirmPassword'
                            errorMessage={error.confirmPassword}
                        />
                    </Grid>
                    <Grid 
                        container
                        direction="column"
                        justifyContent="space-around"
                        alignItems="center"
                    >
                        <FormControlLabel 
                        sx={{padding:'10px 0'}}
                            control={
                                <Switch 
                                    defaultChecked 
                                    checked={values.isTeacher}
                                    onChange={e => handleChange(e)}
                                    name='isTeacher'
                                />
                            } 
                        label="Teacher" />
                        <Button 
                            variant="contained" 
                            onClick={signup}
                        >
                            Sign up
                        </Button>
                        <Typography noWrap component="div" sx={style.titleClass}>
                            -- or --
                        </Typography>
                        <Button
                            variant="outlined"
                            startIcon={<GoogleIcon />}
                            sx={{ ...style.marginStyle, ...style.btnColor }}
                            onClick={btnSignInWithGoogle}
                        >
                            Sign In With Google+
                        </Button>
                    </Grid>
                </Grid>
                </Box>
                
            </Stack>
            
                
            {/* <Box 
                style={{border:'1px solid red'}} 
                display="flex" 
                justifyContent="space-around" 
                flexDirection="row" 
                alignItems="stretch" 
                padding={1}
            >
                <Grid 
                    container 
                    direction="row" 
                    justifyContent="center" 
                    alignItems="center" 
                    spacing={2}
                    xs={6}
                    style={{border:'1px solid red',height:'100vh'}}
                >
                    <Grid item xs={6}>
                        asdas
                    </Grid>
               </Grid>
                <Grid 
                    container 
                    direction="row" 
                    // justifyContent="center" 
                    // alignItems="center" 
                    spacing={2}
                    xs={6}
                    style={{border:'1px solid red'}}
                >
                    
                    <Grid item xs={6}>
                        <Input 
                            label = 'Firstname'
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Input 
                            label = 'Firstname'
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Input 
                            label = 'Firstname'
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Input 
                            label = 'Firstname'
                        />
                    </Grid>
                </Grid>
            
            </Box> */}
        
        {/* <Box sx={style.root}>
            <Grid container justifyContent="center">
                <Box sx={style.section1} boxShadow={12}>
                    <Typography variant="subtitle1" color="textPrimary" sx={style.headingStyle1}>
                        Sign Up
                    </Typography>
                    <img
                        src={logoRendezvous}
                        alt="Rendezvous Logo"
                        style={{ height: "100px", width: "100px", marginBottom: 5 }}
                    />
                    <FormControl sx={{ m: 1, backgroundColor: 'white' }} fullWidth variant="outlined">
                        <TextField
                            placeholder="Full Name"
                            onChange={handleChange('displayName')}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PersonIcon />
                                    </InputAdornment>
                                ),
                            }}
                            size="medium"
                        />
                    </FormControl>
                    <FormControl sx={{ m: 1, backgroundColor: 'white' }} fullWidth variant="outlined">
                        <TextField
                            placeholder="Email Address"
                            onChange={handleChange('email')}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <EmailIcon />
                                    </InputAdornment>
                                ),
                            }}
                            size="medium"
                        />
                    </FormControl>
                    <FormControl sx={{ m: 1, backgroundColor: 'white' }} fullWidth variant="outlined">
                        <TextField
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.password}
                            placeholder="Password"
                            onChange={handleChange('password')}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockIcon />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </FormControl>
                    <FormControl sx={{ m: 1, backgroundColor: 'white' }} fullWidth variant="outlined">
                        <TextField
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.confirmPassword}
                            placeholder="Confirm Password"
                            onChange={handleChange('confirmPassword')}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockIcon />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </FormControl>
                    <Button
                        variant="outlined"
                        startIcon={<ExitToAppIcon />}
                        sx={{ ...style.btnColor, ...style.marginTopButton }}
                        onClick={signup}
                    >
                        Sign up
                    </Button>
                    <Typography
                        variant="subtitle1"
                        sx={style.marginTopButton}
                    >
                        Already Have an account
                    </Typography>
                    <Link to="/login" style={{ textDecoration: 'none' }}>
                        <Button
                            variant="outlined"
                            startIcon={<PersonAddIcon />}
                            sx={{ ...style.btnColor, ...style.marginTopButton }}
                        >
                            Back to Login
                        </Button>
                    </Link>
                </Box>
            </Grid>
        </Box> */}
        <Footer />
        </Container>
    )
}
