import React from "react";
import { Button, Grid, makeStyles } from "@material-ui/core";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const useStyles = makeStyles((them) => ({
  container: {
    borderBottom: "1px solid grey",
  },
  mainContent: {
    padding: "70px 0",
  },
  addCityButton: {
    position: "absolute",
    right: 0,
    marginBottom: 50,
  },
}));

export const MainContent = ({ cityInfo }) => {
  const classes = useStyles();

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      className={classes.container}
    >
      <Button className={classes.addCityButton}>
        <AddCircleOutlineIcon />
      </Button>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        className={classes.mainContent}
      >
        <Grid item>{(cityInfo.main.temp - 273.15).toFixed(1)}&#8451;</Grid>
        <Grid item>
          {cityInfo.name},{cityInfo.sys.country}
        </Grid>
        <Grid item>
          {cityInfo.weather[0].main},Wind - {cityInfo.wind.speed.toFixed(1)}{" "}
          meter per second
        </Grid>
      </Grid>
    </Grid>
  );
};
