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

import { Link, useHistory } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import { registerInitiate } from '../../redux/actions/userAction';

import logoRendezvous from '../../assets/img/jpg/RendezvousNewLogo.jpg'
import EmailIcon from '@mui/icons-material/Email';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LockIcon from '@mui/icons-material/Lock';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonIcon from '@mui/icons-material/Person';

import {createUser, createDoc} from '../../utils/firebaseUtil'

import Container from '@mui/material/Container';
import Input from '../../components/Input'
// import {validPhone} from '../../utils/validations'

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
        errors: "",
    });

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
            createUser(values.email, values.password).then(() => {
                createDoc('users',values).then(() => {
                    console.log('success')
                })
            })
    }

    console.log(values)
    // console.log(validPhone(values.phone))

    return (
        <Container maxWidth disableGutters={true}>
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

                <Grid container spacing={1}>
                    <Grid item xs={6} spacing={3}>
                        <Input
                            label = 'Firstname' 
                            type='text'
                            onChange={e => handleChange(e)}
                            value = {values.firstName}
                            name='firstName'
                        />
                    </Grid>
                    <Grid item xs={6} spacing={3}>
                        <Input 
                            label = 'Lastname' 
                            type='text'
                            onChange={e => handleChange(e)}
                            value = {values.lastName}
                            name='lastName'
                        />
                    </Grid>
                    <Grid item xs={12} spacing={3}>
                        <Input 
                            label = 'Email' 
                            type='email'
                            onChange={e => handleChange(e)}
                            value = {values.email}
                            name='email'
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
                        />
                    </Grid>
                    <Grid item xs={12} spacing={3}>
                        <Input 
                            label = 'Confirm Password' 
                            type='password'
                            onChange={e => handleChange(e)}
                            value = {values.confirmPassword}
                            name='confirmPassword'
                        />
                    </Grid>
                    <Grid item display="flex" justifyContent="center" xs={12}>
                        <Button 
                            variant="contained" 
                            size="large"
                            onClick={signup}
                        >
                            Sign up
                        </Button>
                        <FormControlLabel control={
                            <Switch 
                                defaultChecked 
                                checked={values.isTeacher}
                                onChange={e => handleChange(e)}
                                name='isTeacher'
                            />
                        } label="Label" />
                    </Grid>
                </Grid>
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
        </Container>
    )
}
