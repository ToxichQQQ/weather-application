import React, {useEffect, useState} from 'react'
import {useFormik} from "formik";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import {validationSchema} from "../validation";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {singInLink} from "../localhost";

const useStyles = makeStyles( () => ({
    form:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '30vh'
    },
    formInput:{
        margin: '10px 0px',
        "& .MuiFormHelperText-root":{
            position: 'absolute',
            marginTop: '56px'
        }
    },
    formBtn:{
        marginTop: '20px',
    }
}))


export const LoginPage = () => {
    const classes = useStyles()
    const [token,setToken] = useState(localStorage.getItem('token') || undefined)
    const formik = useFormik({
        initialValues: {
            userName: '',
            password: ''
        },
        validationSchema: validationSchema,
        onSubmit: () => {
             fetch(singInLink, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: formik.values.userName,
                    password: formik.values.password
                }),
            })
                 .then((response) => response.json())
                 .then((data) => {
                     if(data.token){
                         localStorage.setItem('token', data.token)
                         window.location.href = 'main'
                     }
                 })
        }
    })

    useEffect(()=>{
        if (token){
            window.location.href = 'main'
        }
    },[])


    return (
        <FormControl className={classes.form}>
            <TextField className={classes.formInput} name='userName' variant='outlined' label='User Name' type='text' onChange={formik.handleChange}
                       error={Boolean(formik.touched.userName && formik.errors.userName)} helperText={formik.touched.userName && formik.errors.userName}/>
            <TextField className={classes.formInput} name='password' variant='outlined' label='Password' type='password'
                       onChange={formik.handleChange} error={Boolean(formik.touched.password && formik.errors.password)} helperText={formik.touched.password && formik.errors.password}/>
            <Button className={classes.formBtn} color='primary'  variant='contained' onClick={formik.handleSubmit}>Sign in</Button>
        </FormControl>
    )
}