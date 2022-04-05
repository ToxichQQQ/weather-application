import React, { useEffect, useState } from "react";
import { Button, Grid, TextField } from "@mui/material";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import homeIcon from "../images/home_icon.png";
import moment from "moment";

const useStyles = makeStyles((them) => ({
  container: {
    padding: "20px 25px",
  },
  navLinkItem: {
    fontFamily: "Quicksand",
    fontWeight: 600,
    fontSize: 30,
    color: "#160521AB",
    cursor: "pointer",
    textDecoration: "none",
  },
  searchInput: {
    marginRight: "10px !important",
    "& .MuiOutlinedInput-root": {
      borderRadius: "15px",
      width: 270,
      borderColor: "#7F6290F2 !important",
      height: 55,
      "& .MuiOutlinedInput-input": {
        textTransform: "uppercase",
        textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        color: "#1605218A",
        fontFamily: "Quicksand",
        letterSpacing: "0.25em",
      },
    },
  },
  homeIconContainer: {
    border: "2px solid rgba(79, 30, 118, 0.6)",
    marginLeft: "60px !important",
    borderRadius: "50%",
    fontSize: 16,
  },
  homeIcon: {
    padding: 5,
  },
  searchButton: {
    backgroundColor: "#4F1E76 !important",
    borderColor: "#7F6290F2  !important",
    borderRadius: "15px !important",
    color: "#DAD6DC !important",
    fontWeight: "400 !important",
    fontSize: "15px !important",
    padding: "15px 21px !important",
    letterSpacing: "0.25em !important",
  },
  weekDay: {
    color: "#959297",
    fontSize: 24,
    margin: 0,
  },
  cityName: {
    color: "#160521",
    fontSize: "35px !important",
    fontWeight: 600,
    fontFamily: "Quicksand",
    margin: 0,
  },
}));
export const Navbar = ({
  setSelectedCity,
  isToday,
  city,
  token,
  setToken,
  date,
}) => {
  const [searchValue, setSearchValue] = useState("");
  const classes = useStyles();

  useEffect(() => {
    if (!token) {
      window.location.href = "login";
    }
  }, [token]);

  const handleExit = () => {
    localStorage.removeItem("token");
    setToken(undefined);
  };

  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      className={classes.container}
    >
      <Grid item xs={isToday ? 3 : 6}>
        {isToday ? (
          <Grid container justifyContent="space-between" alignItems="center">
            <NavLink to="/main" className={classes.navLinkItem}>
              <Grid item className={classes.homeIconContainer}>
                <img src={homeIcon} alt="Home" className={classes.homeIcon} />
              </Grid>
            </NavLink>
            <Grid item>
              <h2 className={classes.cityName}>{city}</h2>
              <p className={classes.weekDay}>{date}</p>
            </Grid>
          </Grid>
        ) : (
          <Grid container justifyContent="space-between" alignItems="center">
            <NavLink to="/main" className={classes.navLinkItem}>
              Home
            </NavLink>
            <NavLink to="/today" className={classes.navLinkItem}>
              Today
            </NavLink>
            <NavLink to="/week" className={classes.navLinkItem}>
              Week
            </NavLink>
            <Grid item className={classes.navLinkItem} onClick={handleExit}>
              Go out
            </Grid>
          </Grid>
        )}
      </Grid>
      <Grid item xs={isToday ? 8 : 6}>
        <Grid container justifyContent="flex-end" alignItems="center">
          <TextField
            onChange={(e) => {
              const value = e.currentTarget.value.replace(/[^a-zA-Z ]+/g, "");
              setSearchValue(value);
            }}
            placeholder="Find the city"
            size="small"
            className={classes.searchInput}
            value={searchValue}
          />
          <Button
            onClick={() => setSelectedCity(searchValue)}
            className={classes.searchButton}
          >
            Search
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};
