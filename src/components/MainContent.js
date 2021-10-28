import React from "react";
import { Button, Grid, makeStyles } from "@material-ui/core";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import moment from "moment";

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

export const MainContent = ({ cityInfo, saveNewCity }) => {
  const classes = useStyles();

  const getWeatherInfo = () => {
    return {
      temp: (cityInfo.main.temp - 273.15).toFixed(1),
      city: cityInfo.name + " " + cityInfo.sys.country,
      wind: "Wind - " + cityInfo.wind.speed.toFixed(1) + " meter per second",
    };
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      className={classes.container}
    >
      <Button className={classes.addCityButton} onClick={() => saveNewCity()}>
        <AddCircleOutlineIcon />
      </Button>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        className={classes.mainContent}
      >
        <Grid item>{getWeatherInfo().temp}&#8451;</Grid>
        <Grid item>{getWeatherInfo().city}</Grid>
        <Grid item>{getWeatherInfo().wind}</Grid>
      </Grid>
    </Grid>
  );
};
