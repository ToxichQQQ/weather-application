import React, { useEffect, useState } from "react";
import { Grid, Table, TableCell, TableHead, TableRow } from "@material-ui/core";
import { Paper, TableBody, TableContainer, Typography } from "@mui/material";
import moment from "moment";
import { API_KEY } from "../config";

export const TodayWeather = ({ location, setCityInfo, cityInfo }) => {
  const [weekWeather, setWeekWeather] = useState();
  const [date, setDate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${location.lat}&lon=${location.lon}&exclude=current&appid=${API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        setDate(moment.unix(data.daily[0].dt).format("MMMM Do "));
        setWeekWeather(data);
        setLoading(false);
      });
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
              Today
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
                    <TableCell>{getWeatherInfoByTime(3).time}</TableCell>
                    <TableCell>
                      {getWeatherInfoByTime(3).temp}&#8451;{" "}
                      {getWeatherInfoByTime(3).desc}{" "}
                      {getWeatherInfoByTime(3).wind}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>{getWeatherInfoByTime(6).time}</TableCell>
                    <TableCell>
                      {getWeatherInfoByTime(6).temp}&#8451;{" "}
                      {getWeatherInfoByTime(6).desc}{" "}
                      {getWeatherInfoByTime(6).wind}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>{getWeatherInfoByTime(9).time}</TableCell>
                    <TableCell>
                      {getWeatherInfoByTime(9).temp}&#8451;{" "}
                      {getWeatherInfoByTime(9).desc}{" "}
                      {getWeatherInfoByTime(9).wind}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      )}

      <Grid item></Grid>
    </Grid>
  );
};
