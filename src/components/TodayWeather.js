import React, { useEffect, useState } from "react";
import {Grid, makeStyles, Table, TableCell, TableHead, TableRow} from "@material-ui/core";
import { Paper, TableBody, TableContainer, ListItem,List, Typography} from "@mui/material";
import moment from "moment";
import { API_KEY } from "../config";

const useStyles = makeStyles(() => ({
  list:{

  },
  listItem:{
  display:'flex !important',
    flexDirection:'column'
  },
  listItemHeader:{

  },
  listItemText:{
  }
}));

export const TodayWeather = ({ location, isToday }) => {
  const classes = useStyles()
  const [weekWeather, setWeekWeather] = useState();
  const [date, setDate] = useState(null);
  const [loading, setLoading] = useState(true);

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
        <Grid container>
          <Grid item xs={2}>
          <List>
            <ListItem className={classes.listItem}><Typography className={classes.listItemHeader} component='h5' variant='h5'>Now</Typography>
            <p className={classes.listItemText}>{getWeatherInfoByTime(3).time}</p>
            </ListItem>
            <ListItem className={classes.listItem}><Typography className={classes.listItemHeader} component='h5' variant='h5'>Later</Typography>
              <p className={classes.listItemText}>{getWeatherInfoByTime(6).time}</p>
            </ListItem>
            <ListItem className={classes.listItem}><Typography className={classes.listItemHeader} component='h5' variant='h5'>Later</Typography>
              <p className={classes.listItemText}>{getWeatherInfoByTime(9).time}</p>
            </ListItem>
          </List>
          </Grid>
          <Grid item xs={10}>
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
