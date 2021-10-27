import React, { useState } from "react";
import { Button, Grid, TextField } from "@mui/material";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((them) => ({
  container: {
    padding: "0 0 20px ",
    borderBottom: "1px solid grey",
  },
  navLinkItem: {
    color: "grey",
    textDecoration: "none",
  },
}));
export const Navbar = ({ setSelectedCity }) => {
  const [searchValue, setSearchValue] = useState("");
  const classes = useStyles();
  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="flex-end"
      className={classes.container}
    >
      <Grid item xs={3}>
        <Grid container justifyContent="space-between" alignItems="center">
          <NavLink to="/today" className={classes.navLinkItem}>
            Today
          </NavLink>
          <NavLink to="/" className={classes.navLinkItem}>
            Tomorrow
          </NavLink>
          <NavLink to="/" className={classes.navLinkItem}>
            Week
          </NavLink>
        </Grid>
      </Grid>
      <Grid item xs={6}>
        <Grid container justifyContent="flex-end">
          <TextField
            onChange={(e) =>{
              const value = e.currentTarget.value.replace(/[^a-zA-Z ]+/g, '')
              setSearchValue(value)
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
