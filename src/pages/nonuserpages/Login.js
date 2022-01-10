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
    Container,
    FormControlLabel,
} from '@mui/material';

import { useDispatch } from 'react-redux';

import { Link, useHistory } from 'react-router-dom';

import Input from '../../components/Input'
import NavBar from '../../components/navbarcomponent/NavBar'
import Footer from '../../components/linkcomponent/Footer';


import logoRendezvous from '../../assets/img/jpg/RendezvousNewLogo.jpg'
import GoogleIcon from '@mui/icons-material/Google';
import EmailIcon from '@mui/icons-material/Email';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LockIcon from '@mui/icons-material/Lock';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

import { loginInitiate } from '../../redux/actions/userAction';

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import { setDoc, doc } from '@firebase/firestore';

import { db } from '../../utils/firebase';

const style = {
    marginTopButton: {
        marginTop: 2
    },
    marginStyle: {
        marginTop: 1
    },
    root: {
        padding: "80px 20px",
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
    btnColor: {
        backgroundColor: (theme) => theme.colors.buttonColor,
        color: (theme) => theme.colors.textColor,
        "&:hover": {
            backgroundColor: (theme) => theme.colors.buttonColor,
            color: (theme) => theme.colors.navButtonHover,
        }
    },
    forgotStyle: {
        color: (theme) => theme.palette.primary.main,
        fontWeight: 500,
        fontSize: 15,
        marginBottom: 2,
        cursor: 'pointer'
    }
}

export default function Login() {

    const dispatch = useDispatch();

    const history = useHistory();

    const [values, setValues] = useState({
        email: '',
        password: '',
        showPassword: false,
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const btnSignIn = (e) => {
        // e.preventDefault();
        if (values.email === '' || values.password === '') {
            setValues({ ...values, errors: "Please Complete all fields", isLoading: false, password: "" })
            alert(values.errors);
        }
        else {
            setValues({ ...values, errors: "", isLoading: true });
            dispatch(loginInitiate(values.email, values.password, history));
        }
    };

    const handleNew = async(user) => {
        const docRef = doc(db, "users", user.uid);
        const payload = { displayName: user.displayName, email: user.email, uid: user.uid, photoURL: user.photoURL};
        await setDoc(docRef, payload);
    }

    const btnSignInWithGoogle = () => {
        const provider = new GoogleAuthProvider()
        const auth = getAuth();
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                // The signed-in user info.
                const user = result.user;
                // handleNew(user);
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
    console.log(values)

    return (
      <Container maxWidth >
        <NavBar />
        <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
        >
            <Grid contanier xs={6} alignItems='center'>
            <Grid container justifyContent='center' spacing={4}>
                <Grid item xs={12} spacing={3}>
                    <Input
                        label = 'Email' 
                        type='text'
                        value={values.email}
                        onChange={handleChange('email')}
                        name='firstName'
                        // errorMessage={error.firstName}
                    />
                </Grid>
                <Grid item xs={12} spacing={3}>
                    <Input 
                        label = 'Password' 
                        type='password'
                        onChange={handleChange('password')}
                        value = {values.password}
                        name='lastName'
                        // errorMessage = {error.lastName}
                    />
                </Grid>
                <Grid 
                    container
                    direction="column"
                    justifyContent="space-around"
                    alignItems="center"
                >
                    <Typography noWrap component="div" sx={style.titleClass}>
                        Don't have an account. 
                      <Button 
                        variant="text" 
                        onClick={() => history.push('/register')}
                      >Sign up
                    </Button>
                    </Typography>
                    <Button 
                        variant="contained" 
                        // onClick={signup}
                        onClick={(e) => btnSignIn(e)}
                    >
                        Sign in
                    </Button>
                    <Typography noWrap component="div" sx={style.titleClass}>
                        -- or continue with --
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
            </Grid>
            <Grid container xs={6} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
            <img
                src={"assets/img/login_bg.png"}
                alt="Rendezvous bg"
                style={{ height: "100%", width: "100%", objectFit:'contain' }}
            />
            </Grid>
        </Stack>
        <Footer />
      </Container>
        // <Box sx={style.root}>
        //     <Grid container justifyContent="center">    
        //         <Box sx={style.section1} boxShadow={12}>
        //             <Typography variant="subtitle1" color="textPrimary" sx={style.headingStyle1}>
        //                 Sign in to your Rendezvous Account
        //             </Typography>
        //             <img
        //                 src={logoRendezvous}
        //                 alt="Rendezvous Logo"
        //                 style={{ height: "100px", width: "100px" }}
        //             />
        //             {/* <Button
        //                 variant="outlined"
        //                 startIcon={<GoogleIcon />}
        //                 sx={{ ...style.marginStyle, ...style.btnColor }}
        //                 onClick={btnSignInWithGoogle}
        //             >
        //                 Sign In With Google+
        //             </Button> */}
        //             <Typography
        //                 variant="subtitle1"
        //                 sx={style.marginStyle}
        //             >
        //                 OR
        //             </Typography>
        //             <FormControl sx={{ m: 1, backgroundColor: 'white' }} fullWidth variant="outlined">
        //                 <TextField
        //                     id="input-with-icon-textfield"
        //                     variant="outlined"
        //                     placeholder="Email Address"
        //                     onChange={handleChange('email')}
        //                     InputProps={{
        //                         startAdornment: (
        //                             <InputAdornment position="start">
        //                                 <EmailIcon />
        //                             </InputAdornment>
        //                         ),
        //                     }}
        //                     size="medium"
        //                 />
        //             </FormControl>
        //             <FormControl sx={{ m: 1, backgroundColor: 'white' }} fullWidth variant="outlined">
        //                 <TextField
        //                     id="outlined-adornment-password"
        //                     type={values.showPassword ? 'text' : 'password'}
        //                     value={values.password}
        //                     placeholder="Password"
        //                     onChange={handleChange('password')}
        //                     InputProps={{
        //                         startAdornment: (
        //                             <InputAdornment position="start">
        //                                 <LockIcon />
        //                             </InputAdornment>
        //                         ),
        //                         endAdornment: (
        //                             <InputAdornment position="end">
        //                                 <IconButton
        //                                     aria-label="toggle password visibility"
        //                                     onClick={handleClickShowPassword}
        //                                     onMouseDown={handleMouseDownPassword}
        //                                     edge="end"
        //                                 >
        //                                     {values.showPassword ? <VisibilityOff /> : <Visibility />}
        //                                 </IconButton>
        //                             </InputAdornment>
        //                         )
        //                     }}
        //                     InputLabelProps={{
        //                         sx: style.labelStyle
        //                     }}
        //                 />
        //             </FormControl>
        //             <Grid container justifyContent='flex-end'>
        //                 <Link to="/forgot" style={{ textDecoration: 'none' }}>
        //                     <Typography
        //                         sx={style.forgotStyle}
        //                     >

        //                         Forgot Password?
        //                     </Typography>
        //                 </Link>
        //             </Grid>
        //             <Button
        //                 variant="outlined"
        //                 startIcon={<ExitToAppIcon />}
        //                 sx={{ ...style.marginStyle, ...style.btnColor }}
        //                 onClick={btnSignIn}
        //             >
        //                 Sign In
        //             </Button>
        //             <Typography
        //                 variant="subtitle1"
        //                 sx={style.marginTopButton}
        //             >

        //                 Don't have an Accoount
        //             </Typography>
        //             <Link to="/register" style={{ textDecoration: 'none' }}>
        //                 <Button
        //                     variant="outlined"
        //                     startIcon={<PersonAddIcon />}
        //                     sx={{ ...style.btnColor, ...style.marginTopButton }}
        //                 >
        //                     Register New Account
        //                 </Button>
        //             </Link>
        //         </Box>
        //     </Grid>
        // </Box>

    )
}
