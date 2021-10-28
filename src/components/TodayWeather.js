import React, { useEffect, useState } from "react";
import { Grid, Table, TableCell, TableHead, TableRow } from "@material-ui/core";
import { Paper, TableBody, TableContainer, Typography } from "@mui/material";
import moment from "moment";
import Iframe from "react-iframe";
import { API_KEY } from "../config";

export const TodayWeather = ({ location, isToday }) => {
  const [weekWeather, setWeekWeather] = useState();
  const [date, setDate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${location.lat}&lon=${location.lon}&exclude=current&appid=${API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        setDate(moment.unix(data.daily[isToday ? 0 : 1].dt).format("MMMM Do "));
        setWeekWeather(data);
        setLoading(false);
      })
      .catch((err) => alert("Error"));
  }, [location]);

  const getWeatherInfoByTime = (i) => {
    return {
      time: moment.unix(weekWeather.hourly[i].dt).format("HH:MM"),
      temp: (weekWeather.hourly[i].temp - 273.15).toFixed(2),
      desc: weekWeather.hourly[i].weather[0].main,
      wind: "Wind - " + weekWeather.hourly[i].wind_speed + " meter per second",
    };
  };
  return (
    <Grid>
      {!loading && (
        <Grid item>
          <Grid item>
            <Typography variant="h4" component="h4">
              {isToday ? "Today" : "Tomorrow"}
            </Typography>
            <p>{date}</p>
          </Grid>
          <Grid item xs={4}>
            <TableContainer component={Paper}>
              <Table
                sx={{ maxWidth: 650 }}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Time</TableCell>
                    <TableCell>Weather</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      {isToday ? getWeatherInfoByTime(3).time : "10:00"}
                    </TableCell>
                    <TableCell>
                      {getWeatherInfoByTime(isToday ? 3 : 24).temp}&#8451;{" "}
                      {getWeatherInfoByTime(isToday ? 3 : 24).desc}{" "}
                      {getWeatherInfoByTime(isToday ? 3 : 24).wind}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      {isToday ? getWeatherInfoByTime(6).time : "15:00"}
                    </TableCell>
                    <TableCell>
                      {getWeatherInfoByTime(isToday ? 6 : 27).temp}&#8451;{" "}
                      {getWeatherInfoByTime(isToday ? 3 : 27).desc}{" "}
                      {getWeatherInfoByTime(isToday ? 3 : 27).wind}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      {isToday ? getWeatherInfoByTime(9).time : "19:00"}
                    </TableCell>
                    <TableCell>
                      {getWeatherInfoByTime(isToday ? 9 : 36).temp}&#8451;{" "}
                      {getWeatherInfoByTime(isToday ? 9 : 36).desc}{" "}
                      {getWeatherInfoByTime(isToday ? 9 : 36).wind}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};
