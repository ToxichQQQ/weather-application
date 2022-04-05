import React, { useEffect, useState } from "react";
import { Grid, makeStyles } from "@material-ui/core";
import { ListItem, List, Typography } from "@mui/material";
import moment from "moment";
import { API_KEY } from "../config";
import pressImg from "../images/img_weather1.png";
import humImg from "../images/img_weather2.png";
import windImg from "../images/img_weather3.png";

const useStyles = makeStyles(() => ({
  list: {
    paddingTop: "100px !important",
  },
  listItem: {
    display: "flex !important",
    flexDirection: "column",
    cursor: "pointer",
  },
  listItemHeader: {
    fontFamily: "Quicksand !important",
    fontSize: "35px !important",
    margin: 0,
    fontWeight: "600 !important",
  },
  listItemText: {
    margin: 0,
    fontSize: 20,
    textTransform: "uppercase",
  },
  todayWeatherContainer: {
    backgroundColor: "#4F1E76",
    borderTopLeftRadius: 39,
    borderBottomLeftRadius: 39,
  },
  mainInfoContainer: {
    height: "100%",
    paddingLeft: 100,
  },
  header: {
    fontSize: "94px !important",
    margin: "0 !important",
    fontWeight: "600 !important",
    fontFamily: "Quicksand !important",
    color: "#DDD1E4",
  },
  container: {
    height: "100%",
  },
  nowTemp: {
    color: "#DDD1E4",
    fontSize: 120,
    margin: 0,
    display: "flex",
    alignItems: "flex-start",
  },
  degree: {
    fontSize: "55px",
    position: "relative",
    top: 10,
    color: "#DAD6DC73",
  },
  nowDescription: {
    color: "#E5E5E5",
    fontSize: 15,
    margin: 0,
    letterSpacing: "0.25em",
    textTransform: "uppercase",
  },
  addedInfoListItem: {
    display: "flex",
    alignItems: "center",
    fontSize: 15,
    color: "#E5E5E5",
    marginRight: 50,
    textTransform: "uppercase",
  },
  addedInfoImage: {
    marginRight: 10,
  },
}));

export const TodayWeather = ({ location, isToday, date, setDate }) => {
  const classes = useStyles();
  const [weekWeather, setWeekWeather] = useState();
  const [loading, setLoading] = useState(true);
  const [timeToken, setTimeToken] = useState(0);

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${location.lat}&lon=${location.lon}&exclude=current&appid=${API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (!data.message) {
          setDate(
            moment.unix(data.daily[isToday ? 0 : 1].dt).format("MMMM Do ")
          );
          setWeekWeather(data);
          setLoading(false);
        } else {
          alert(data.message);
        }
      });
  }, [location]);

  const changeTimeToken = (int) => {
    setTimeToken(int);
  };

  const getWeatherInfoByTime = (i) => {
    return {
      time: moment.unix(weekWeather.hourly[i].dt).format("HH:MM"),
      temp: (weekWeather.hourly[i].temp - 273.15).toFixed(0),
      desc: weekWeather.hourly[i].weather[0].main,
      wind: weekWeather.hourly[i].wind_speed,
      humidity: weekWeather.hourly[i].humidity,
      pressure: weekWeather.hourly[i].pressure,
    };
  };
  return (
    <Grid className={classes.container}>
      {!loading && (
        <Grid container className={classes.container}>
          <Grid item xs={2}>
            <List className={classes.list}>
              <ListItem
                className={classes.listItem}
                style={{
                  backgroundColor: timeToken === 0 && "#4F1E76",
                  borderRadius: timeToken === 0 ? 0 : 30,
                  color: timeToken === 0 ? "#DAD6DC" : "#160521AB",
                }}
                onClick={() => changeTimeToken(0)}
              >
                <Typography
                  className={classes.listItemHeader}
                  component="h5"
                  variant="h5"
                >
                  Now
                </Typography>
                <p className={classes.listItemText}>
                  {getWeatherInfoByTime(0).time}
                </p>
              </ListItem>
              <ListItem
                className={classes.listItem}
                style={{
                  backgroundColor: timeToken === 3 && "#4F1E76",
                  borderRadius: timeToken === 3 ? 0 : 30,
                  color: timeToken === 3 ? "#DAD6DC" : "#160521AB",
                }}
                onClick={() => changeTimeToken(3)}
              >
                <Typography
                  className={classes.listItemHeader}
                  component="h5"
                  variant="h5"
                >
                  Later
                </Typography>
                <p className={classes.listItemText}>
                  {getWeatherInfoByTime(3).time}
                </p>
              </ListItem>
              <ListItem
                className={classes.listItem}
                style={{
                  backgroundColor: timeToken === 6 && "#4F1E76",
                  borderRadius: timeToken === 6 ? 0 : 30,
                  color: timeToken === 6 ? "#DAD6DC" : "#160521AB",
                }}
                onClick={() => changeTimeToken(6)}
              >
                <Typography
                  className={classes.listItemHeader}
                  component="h5"
                  variant="h5"
                >
                  Later
                </Typography>
                <p className={classes.listItemText}>
                  {getWeatherInfoByTime(6).time}
                </p>
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={10} className={classes.todayWeatherContainer}>
            <Grid
              container
              direction="column"
              justify="space-evenly"
              className={classes.mainInfoContainer}
            >
              <Grid item>
                <Typography
                  component="h5"
                  variant="h5"
                  className={classes.header}
                >
                  Today
                </Typography>
              </Grid>
              <Grid item className={classes.mainInfo}>
                <p className={classes.nowTemp}>
                  {getWeatherInfoByTime(timeToken).temp}
                  <span className={classes.degree}>°C</span>
                </p>
                <p className={classes.nowDescription}>
                  {getWeatherInfoByTime(timeToken).time},{" "}
                  {getWeatherInfoByTime(timeToken).desc}
                </p>
              </Grid>
              <Grid item className={classes.addedInfo}>
                <Grid container>
                  <Grid item className={classes.addedInfoListItem}>
                    <img
                      className={classes.addedInfoImage}
                      src={pressImg}
                      alt="pressure"
                    />
                    {getWeatherInfoByTime(timeToken).pressure} pressure
                  </Grid>
                  <Grid item className={classes.addedInfoListItem}>
                    <img
                      className={classes.addedInfoImage}
                      src={humImg}
                      alt="humidity"
                    />
                    {getWeatherInfoByTime(timeToken).humidity}% humidity
                  </Grid>
                  <Grid item className={classes.addedInfoListItem}>
                    <img
                      className={classes.addedInfoImage}
                      src={windImg}
                      alt="wind"
                    />
                    {getWeatherInfoByTime(timeToken).wind} m/s wind
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};
