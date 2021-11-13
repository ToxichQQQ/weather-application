import React, { useEffect, useState } from "react";
import { Grid, Typography, makeStyles } from "@material-ui/core";
import CloseIcon from "@mui/icons-material/Close";
import { deleteCity } from "../localhost";

const useStyles = makeStyles((them) => ({
  container: {},
  header: {
    padding: "30px 0",
    textAlign: "center",
  },
  savedCities: {
    padding: "0px 100px 0",
    flexWrap: "wrap",
  },
  listItem: {
    height: 150,
    border: "1px solid grey",
    marginRight: 50,
    flex: "0 1 15%",
    marginTop: 30,
    "&:hover": {
      boxShadow: "0px 5px 10px 2px rgba(34, 60, 80, 0.2)",
    },
  },
  deleteButton: {
    "&:hover": {
      boxShadow: "0px 5px 10px 2px rgba(34, 60, 80, 0.2)",
    },
  },
  cardText: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "40px",
  },
}));

export const CitiesList = ({
  setSelectedCity,
  savedCities,
  setSavedCities,
}) => {
  const classes = useStyles();

  const updateCitiesList = (cityId) => {
    fetch(deleteCity, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: localStorage.getItem("userName"),
        cityId: cityId,
      }),
    })
      .then((res) => res.json())
      .then((data) => data.message || setSavedCities(data));
  };

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item xs={10}>
        <Typography variant="h5" component="h5" className={classes.header}>
          Saved cities
        </Typography>
      </Grid>
      <Grid item xs={10}>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          className={classes.savedCities}
        >
          {savedCities.map((card) => (
            <Grid
              item
              key={card._id}
              className={classes.listItem}
              onClick={() => setSelectedCity(card.cityName)}
            >
              <Grid container justifyContent="flex-end">
                <CloseIcon
                  fontSize="small"
                  sx={{ color: "black" }}
                  className={classes.deleteButton}
                  onClick={() => updateCitiesList(card._id)}
                />
              </Grid>
              <Grid container justifyContent="center" alignItems="center">
                <Grid item xs={12} className={classes.cardText}>
                  <span>{card.cityName}</span>
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};
