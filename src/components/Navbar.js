import React, { useEffect, useState } from "react";
import { Button, Grid, TextField } from "@mui/material";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import HomeIcon from "@mui/icons-material/Home";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const useStyles = makeStyles((them) => ({
  container: {
    padding: "0 0 20px ",
    borderBottom: "1px solid grey",
  },
  navLinkItem: {
    color: "grey",
    cursor: "pointer",
    textDecoration: "none",
  },
  homeIcon: {
    marginTop: 5,
  },
}));
export const Navbar = ({ userName, setSelectedCity }) => {
  const [searchValue, setSearchValue] = useState("");
  const classes = useStyles();
  const [token, setToken] = useState(
    localStorage.getItem("token") || undefined
  );

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
      <Grid item xs={3}>
        <Grid container justifyContent="space-between" alignItems="center">
          <NavLink to="/main" className={classes.navLinkItem}>
            Home
          </NavLink>
          <NavLink to="/today" className={classes.navLinkItem}>
            Today
          </NavLink>
          <NavLink to="/tomorrow" className={classes.navLinkItem}>
            Tomorrow
          </NavLink>
          <NavLink to="/week" className={classes.navLinkItem}>
            Week
          </NavLink>
          <Grid item className={classes.navLinkItem} onClick={handleExit}>
            Go out
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={6}>
        <Grid container justifyContent="flex-end">
          <TextField
            onChange={(e) => {
              const value = e.currentTarget.value.replace(/[^a-zA-Z ]+/g, "");
              setSearchValue(value);
            }}
            label="Find the city"
            size="small"
            value={searchValue}
          />
          <Button
            color="primary"
            variant="outlined"
            onClick={() => setSelectedCity(searchValue)}
          >
            Search
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};
