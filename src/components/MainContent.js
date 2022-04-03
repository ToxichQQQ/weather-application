import React from "react";
import { Button, Grid, makeStyles } from "@material-ui/core";
import { addNewCity } from "../localhost";

const useStyles = makeStyles(() => ({
  container: {},
  mainContent: {
    padding: "30px 0",
  },
  addCityButton: {
    border: "2px solid #4F1E76",
    borderRadius: 20,
    padding: "9px 31px",
    fontSize: 18,
    letterSpacing: "0.25em !important",
    color: "#4F1E76",
  },
  cityName: {
    color: "#160521",
    fontSize: 35,
    fontWeight: 600,
  },
  cityTemp: {
    color: "#959297",
    fontSize: 24,
  },
  contentItem: {
    marginBottom: 9,
  },
}));

export const MainContent = ({
  savedCities,
  cityInfo,
  city,
  setSavedCities,
}) => {
  const classes = useStyles();

  const getWeatherInfo = () => {
    return {
      temp: (cityInfo.main.temp - 273.15).toFixed(1),
      city: cityInfo.name + " " + cityInfo.sys.country,
      wind: "Wind - " + cityInfo.wind.speed.toFixed(1) + " meter per second",
    };
  };

  const addNewCityAPI = () => {
    if (savedCities.length >= 8) return false;
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
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        className={classes.mainContent}
      >
        <Grid item className={`${classes.contentItem} ${classes.cityName}`}>
          {getWeatherInfo().city}
        </Grid>
        <Grid item className={`${classes.contentItem} ${classes.cityTemp}`}>
          {getWeatherInfo().temp}°C
        </Grid>
        <Button
          className={`${classes.contentItem} ${classes.addCityButton}`}
          onClick={() => addNewCityAPI()}
        >
          Add
        </Button>
      </Grid>
    </Grid>
  );
};
