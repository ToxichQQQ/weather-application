import React from "react";
import { Grid, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((them) => ({
  container: {},
  header: {
    padding: "30px 0",
  },
  savedCities: {
    padding: "20px 100px 0",
  },
  listItem: {
    width: 150,
    height: 150,
    border: "1px solid black",
    marginRight: 50,
  },
}));

export const CitiesList = () => {
  const classes = useStyles();
  return (
    <Grid container justifyContent="center" alignItems="center">
      <Typography variant="h5" component="h5" className={classes.header}>
        Saved cities
      </Typography>
      <Grid item xs={12}>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          className={classes.savedCities}
        >
          <Grid item className={classes.listItem}></Grid>
          <Grid item className={classes.listItem}></Grid>
          <Grid item className={classes.listItem}></Grid>
          <Grid item className={classes.listItem}></Grid>
          <Grid item className={classes.listItem}></Grid>
        </Grid>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          className={classes.savedCities}
        >
          <Grid item className={classes.listItem}></Grid>
          <Grid item className={classes.listItem}></Grid>
          <Grid item className={classes.listItem}></Grid>
          <Grid item className={classes.listItem}></Grid>
          <Grid item className={classes.listItem}></Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
