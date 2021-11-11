import React, {useEffect, useState} from 'react'
import {useFormik} from "formik";
import TextField from "@material-ui/core/TextField";
import {validationSchema} from "../validation";
import {registrationLink, singInLink} from "../localhost";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Image from '../images/auth_bg.jpg'
import ReCAPTCHA from "react-google-recaptcha";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";

const useStyles = makeStyles( () => ({
    form:{
        display: 'flex',
        marginBottom: 20
    },
    formInput:{
        margin: '20px 0px',
        "& .MuiFormHelperText-root":{
            position: 'absolute',
            marginTop: '56px'
        }
    },
    mainContainer:{
        position: "absolute",
        width: '100%',
        height: '100%',
        top:0,
        left:0,
        background:`url(${Image})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100%'
    },
    registrationCard:{
        boxShadow: '1px 2px 36px 0px rgba(34, 60, 80, 0.2)',
        padding: 30,
        borderRadius: 7,
        background: 'white'
    },
    header:{
        fontSize: '26px',
        fontWeight: '700'
    },
    formBtn:{
        marginTop: 20
    }
}))


export const RegistrationPage = () => {
    const classes = useStyles()
    const [open, setOpen] = useState(false);
    const [token,setToken] = useState(localStorage.getItem('token') || undefined)
    const [captchaValue, setCaptchaValue] = useState(true)
    const [errorMessage, setErrorMessage] = useState(undefined)
    const formik = useFormik({
        initialValues: {
            userName: '',
            password: ''
        },
        validationSchema: validationSchema,
        onSubmit: () => {
            fetch(registrationLink, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    username: formik.values.userName,
                    password: formik.values.password
                }),
            })
                .then((response) => response.json())
                .then((data) => data.message === "Registration has been success" ? window.location.href = 'login' : handleOpen(data.message))
        }
    })


    const handleOpen = (message) => {
        setErrorMessage(message)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(()=>{
        if (token){
            window.location.href = 'main'
        }
    },[])

    return (
            <Grid container justifyContent='center' alignItems='center' className={classes.mainContainer}>
            <Grid item className={classes.registrationCard}>
            <Typography component='h3' variant='h3' className={classes.header}>
             Create new account
            </Typography>
                <FormControl className={classes.form}>
            <TextField autoComplete="off" className={classes.formInput} name='userName' label='User Name' type='text' onChange={formik.handleChange}
                       error={Boolean(formik.touched.userName && formik.errors.userName)} helperText={formik.touched.userName && formik.errors.userName}/>
            <TextField autoComplete="off" className={classes.formInput} name='password' label='Password' type='password'
                       onChange={formik.handleChange} error={Boolean(formik.touched.password && formik.errors.password)} helperText={formik.touched.password && formik.errors.password}/>
                </FormControl>
                <ReCAPTCHA
                    onChange={() => setCaptchaValue(false)}
                    sitekey="6LduSyodAAAAACPsE3NaT08RHAyAarJ_N6JYrtBc"
                    />
                <Button className={classes.formBtn} color='primary'  variant='contained' onClick={formik.handleSubmit} disabled={!formik.values.userName || !formik.values.password || captchaValue}>Sign up</Button>
            </Grid>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        Ooooops, something go wrong
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {errorMessage}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => window.location.href = 'login'}>Sign in</Button>
                        <Button onClick={handleClose}>Close</Button>
                    </DialogActions>
                </Dialog>
            </Grid>
    )
}