import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import { validationSchema } from "../validation";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { singInLink } from "../localhost";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Image from "../images/auth_bg.jpg";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";

const useStyles = makeStyles(() => ({
  form: {
    display: "flex",
    marginBottom: 20,
  },
  formInput: {
    margin: "20px 0px",
    "& .MuiFormHelperText-root": {
      position: "absolute",
      marginTop: "56px",
    },
  },
  mainContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    background: `url(${Image})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "100%",
  },
  registrationCard: {
    boxShadow: "1px 2px 36px 0px rgba(34, 60, 80, 0.2)",
    padding: 30,
    borderRadius: 7,
    background: "white",
  },
  header: {
    fontSize: "26px",
    fontWeight: "700",
    textAlign: "center",
  },
  formBtn: {
    marginTop: 20,
  },
}));

export const LoginPage = () => {
  const classes = useStyles();
  const [errorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = useState(false);

  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: () => {
      fetch(singInLink, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formik.values.userName,
          password: formik.values.password,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.token) {
            localStorage.setItem("userName", formik.values.userName);
            localStorage.setItem("token", data.token);
            window.location.href = "main";
          } else {
            handleOpen(data.message);
          }
        });
    },
  });

  useEffect(() => {
    if (localStorage.getItem("token")) {
      window.location.href = "main";
    }
  }, []);

  const handleOpen = (message) => {
    setErrorMessage(message);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      className={classes.mainContainer}
    >
      <Grid item className={classes.registrationCard}>
        <Typography component="h3" variant="h3" className={classes.header}>
          Welcome
        </Typography>
        <FormControl className={classes.form}>
          <TextField
            className={classes.formInput}
            name="userName"
            variant="outlined"
            label="User Name"
            type="text"
            onChange={formik.handleChange}
            error={Boolean(formik.touched.userName && formik.errors.userName)}
            helperText={formik.touched.userName && formik.errors.userName}
          />
          <TextField
            className={classes.formInput}
            name="password"
            variant="outlined"
            label="Password"
            type="password"
            onChange={formik.handleChange}
            error={Boolean(formik.touched.password && formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button
            className={classes.formBtn}
            color="primary"
            variant="contained"
            onClick={formik.handleSubmit}
          >
            Sign in
          </Button>
        </FormControl>
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
          <Button onClick={() => (window.location.href = "registration")}>
            Sign up
          </Button>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};
