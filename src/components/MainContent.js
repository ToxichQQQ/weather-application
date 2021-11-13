import React from "react";
import { Button, Grid, makeStyles } from "@material-ui/core";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import moment from "moment";
import { addNewCity } from "../localhost";

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

export const MainContent = ({ cityInfo, city, setSavedCities }) => {
  const classes = useStyles();

  const getWeatherInfo = () => {
    return {
      temp: (cityInfo.main.temp - 273.15).toFixed(1),
      city: cityInfo.name + " " + cityInfo.sys.country,
      wind: "Wind - " + cityInfo.wind.speed.toFixed(1) + " meter per second",
    };
  };

  const addNewCityAPI = () => {
    fetch(addNewCity, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: localStorage.getItem("userName"),
        cityName: city,
      }),
    })
      .then((response) => response.json())
      .then((data) => data.message || setSavedCities(data));
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      className={classes.container}
    >
      <Button className={classes.addCityButton} onClick={() => addNewCityAPI()}>
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
