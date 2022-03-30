import React, { useEffect, useState } from "react";
import { Grid, makeStyles } from "@material-ui/core";
import { Typography } from "@mui/material";
import { API_KEY } from "../config";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  listItem: {
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
      temp: (weekWeather.daily[i].temp.day - 273.15).toFixed(1),
      desc: weekWeather.daily[i].weather[0].main,
      wind: "Wind - " + weekWeather.daily[i].wind_speed.toFixed(1) + " m/s",
    };
  };

  return (
    <>
      {!loading && (
        <Grid container justify='center'>
          <Grid item xs={12} style={{textAlign:'center',marginBottom:'20px'}}>
            <Typography variant="h5" component="h5">
              Week
            </Typography>
            <p>{date}</p>
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
                    <img src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`} alt='weatherImg'/>
                    <p>{getWeatherInfoByDay(index).time}</p>
                    <p>{getWeatherInfoByDay(index).temp}&#8451;</p>
                    <p>{getWeatherInfoByDay(index).desc}</p>
                    <p>{getWeatherInfoByDay(index).wind}</p>
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
