import React from "react";
import { Grid, Typography, makeStyles } from "@material-ui/core";
import { deleteCity } from "../localhost";
import cityImg from "../images/cityImage.png";

const useStyles = makeStyles(() => ({
  container: {
    flex: "1 1",
    borderTopLeftRadius: "36px",
    borderTopRightRadius: "36px",
    backgroundColor: "#4F1E76",
  },
  header: {
    textAlign: "center",
    color: "#DAD6DC",
    fontSize: 48,
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.25em !important",
    textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    fontFamily: "Quicksand",
  },
  savedCities: {
    padding: "0px 100px 0",
    flexWrap: "wrap",
  },
  item: {
    minWidth: "175px",
    flex: "0 1 20%",
    marginRight: 50,
  },
  listItem: {
    cursor: "pointer",
    width: "100%",
    padding: "20px 0 20px 10px",
    display: "flex",
    alignItems: "center",
    border: "2px solid #DDD1E4",
    borderRadius: 20,
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
    paddingLeft: "10px",
    fontSize: 18,
    letterSpacing: "0.25em !important",
    color: "#DAD6DC",
  },
  cardDelete: {
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: "0.25em !important",
    cursor: "pointer",
    color: "#FFFFFF",
    textDecoration: "underline",
    fontSize: 12,
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
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      className={classes.container}
    >
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
            <Grid item key={card._id} className={classes.item}>
              <div
                className={classes.listItem}
                onClick={() => setSelectedCity(card.cityName)}
              >
                <img src={cityImg} alt="City image" />
                <span className={classes.cardText}>{card.cityName}</span>
              </div>
              <p
                className={classes.cardDelete}
                onClick={() => updateCitiesList(card._id)}
              >
                {" "}
                Delete
              </p>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};
