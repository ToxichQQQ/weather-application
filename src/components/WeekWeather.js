import React, { useEffect, useState } from "react";
import { Grid, makeStyles } from "@material-ui/core";
import { Typography } from "@mui/material";
import { API_KEY } from "../config";
import moment from "moment";

const useStyles = makeStyles(() => ({
  container: {
    flex: "1 1",
    borderTopLeftRadius: "36px",
    borderTopRightRadius: "36px",
    backgroundColor: "#4F1E76",
  },
  header: {
    paddingTop: 20,
    textAlign: "center",
    color: "#DAD6DC",
    fontSize: "48px !important",
    fontWeight: "600 !important",
    textTransform: "uppercase",
    letterSpacing: "0.25em !important",
    textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    fontFamily: "Quicksand !important",
  },
  dateText: {
    color: "#DAD6DC",
    fontSize: 18,
    marginTop: "7px",
    marginBottom: 0,
    textTransform: "uppercase",
    fontFamily: "Quicksand",
  },
  listItem: {
    fontFamily: "Quicksand",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    flex: "1 1 10%",
    minHeight: "150px",
    minWidth: "150px",
    border: "1px solid grey",
    marginRight: "20px",
    padding: "10px",
    "& p": {
      margin: "0 0 10px",
    },
  },
  cardDate: {
    color: "#160521AB",
    fontSize: 30,
    fontWeight: 600,
  },
  cardTemp: {
    fontSize: 36,
    color: "#160521AB",
  },
  cardDesc: {
    fontSize: 15,
    textTransform: "uppercase",
    color: "#1605218A",
  },
  weekWeatherText: {
    textAlign: "center",
  },
}));

export const WeekWeather = ({ location }) => {
  const classes = useStyles();
  const [weekWeather, setWeekWeather] = useState();
  const [date, setDate] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${location.lat}&lon=${location.lon}&appid=${API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        setDate(
          `${moment.unix(data.daily[0].dt).format("MMMM Do")} - ${moment
            .unix(data.daily[7].dt)
            .format("MMMM Do")}`
        );
        setWeekWeather(data);
        setLoading(false);
      })
      .catch((err) => alert("Error"));
  }, [location]);

  const getWeatherInfoByDay = (i) => {
    return {
      time: moment.unix(weekWeather.daily[i].dt).format("MMMM Do"),
      temp: (weekWeather.daily[i].temp.day - 273.15).toFixed(0),
      desc: weekWeather.daily[i].weather[0].main,
    };
  };

  return (
    <>
      {!loading && (
        <Grid container justify="center" className={classes.container}>
          <Grid item xs={12} className={classes.weekWeatherText}>
            <Typography variant="h5" component="h5" className={classes.header}>
              Week
            </Typography>
            <p className={classes.dateText}>{date}</p>
          </Grid>
          <Grid>
            <Grid container justifyContent="space-between" alignItems="center">
              {weekWeather.daily.map((day, index) => (
                <Grid key={day.dt} item className={classes.listItem}>
                  <Grid
                    container
                    alignItems="center"
                    justifyContent="space-between"
                    direction="column"
                  >
                    <p className={classes.cardDate}>
                      {getWeatherInfoByDay(index).time}
                    </p>
                    <p className={classes.cardDesc}>
                      {getWeatherInfoByDay(index).desc}
                    </p>
                    <p className={classes.cardTemp}>
                      {getWeatherInfoByDay(index).temp}
                    </p>
                    <img
                      src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                      alt="weatherImg"
                    />
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
};
